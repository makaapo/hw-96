import express from 'express';
import Cocktail from '../models/Cocktail';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import * as fs from 'fs';
import mongoose, { HydratedDocument } from 'mongoose';
import permit from '../middleware/permit';
import roleForUser from '../middleware/roleForUser';
import { CocktailMutation } from '../types';

const cocktailRouter = express.Router();

cocktailRouter.get('/', roleForUser, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const queryUser = req.query.user as string;

    if (queryUser) {
      const cocktails = await Cocktail.find({ author: queryUser });
      return res.send(cocktails);
    }
    if (user && user.role === 'admin') {
      const cocktails = await Cocktail.find();
      return res.send(cocktails);
    }
    if (user) {
      const cocktails = await Cocktail.find({
        $or: [{ isPublished: true }, { author: user._id }],
      });
      return res.send(cocktails);
    }
    const cocktails = await Cocktail.find({ isPublished: true });
    return res.send(cocktails);
  } catch (e) {
    return next(e);
  }
});

cocktailRouter.get('/:id', roleForUser, async (req, res, next) => {
  try {
    const response = await Cocktail.findById(req.params.id);
    if (!response) {
      return res.status(404).send({ message: 'Cocktail not found' });
    }
    return res.send(response);
  } catch (e) {
    return next(e);
  }
});

cocktailRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  try {
    const cocktail = await Cocktail.create({
      name: req.body.name,
      receipt: req.body.receipt,
      image: req.file ? req.file.filename : null,
      author: user?._id,
      ingredients: JSON.parse(req.body.ingredients),
    });
    return res.send(cocktail);
  } catch (e) {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    }
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});

cocktailRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({ error: 'Wrong cocktail ID' });
    }
    const cocktail: HydratedDocument<CocktailMutation> | null = await Cocktail.findById(req.params.id);
    if (!cocktail) {
      return res.status(404).send({ error: 'Cocktail not found' });
    }

    cocktail.isPublished = !cocktail.isPublished;
    await cocktail.save();

    return res.send(cocktail);
  } catch (e) {
    next(e);
  }
});

cocktailRouter.delete('/:id', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  try {
    let deleted;
    if (user?.role === 'admin') {
      deleted = await Cocktail.deleteOne({ _id: req.params.id });
    } else {
      deleted = await Cocktail.deleteOne({
        _id: req.params.id,
        author: user?._id,
        isPublished: false,
      });
    }
    if (deleted.deletedCount === 1) {
      return res.status(200).send({ message: 'Deleted' });
    } else {
      return res.status(404).send({ message: 'Cant delete' });
    }
  } catch (error) {
    return next(error);
  }
});

export default cocktailRouter;
