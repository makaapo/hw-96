import express from 'express';
import User from '../models/User';
import config from '../config';
import { OAuth2Client } from 'google-auth-library';
import { imagesUpload } from '../multer';
import { promises as fs } from 'fs';
import axios from 'axios';
import path from 'path';
import { Error } from 'mongoose';
import { randomUUID } from 'crypto';

const usersRouter = express.Router();

const googleClient = new OAuth2Client(config.google.clientId);

usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ error: 'Username and password are required!' });
    }
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      avatar: req.file ? req.file.filename : null,
    });
    user.generateToken();
    await user.save();
    return res.send({ message: 'Registration complete!', user });
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path);
    }
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ error: 'Username and password are required!' });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ error: 'Username or Password not found!' });
    }
    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Username or Password not found!' });
    }
    user.generateToken();
    await user.save();
    return res.send({ message: 'Email and password correct!', user });
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      audience: config.google.clientId,
      idToken: req.body.credential,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).send({ error: 'Google login error!' });
    }
    const email = payload['email'];
    const googleId = payload['sub'];
    const displayName = payload['name'];
    const avatar = payload['picture'];
    if (!email) {
      return res.status(400).send({ error: 'Not enough user data to continue' });
    }
    let user = await User.findOne({ googleID: googleId });
    if (!user && avatar) {
      const response = await axios.get(avatar, { responseType: 'arraybuffer' });
      const fileName = 'images/' + randomUUID() + '.jpg';
      const Path = path.join(config.publicPath, fileName);
      await fs.writeFile(Path, response.data);
      user = new User({
        email: email,
        password: randomUUID(),
        googleID: googleId,
        displayName,
        avatar: fileName,
      });
      user.generateToken();
      await user.save();
      return res.send({ message: 'Login with Google successful!', user });
    }
  } catch (e) {
    return next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');

    if (!headerValue) return res.status(204).send();

    const [_bearer, token] = headerValue.split(' ');

    if (!token) return res.status(204).send();

    const user = await User.findOne({ token });

    if (!user) return res.status(204).send();

    user.generateToken();
    await user.save();

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});
export default usersRouter;
