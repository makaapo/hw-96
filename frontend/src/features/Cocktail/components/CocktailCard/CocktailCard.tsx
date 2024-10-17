import { Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectUser } from '../../../User/userSlice';
import { API_URL } from '../../../../constants';
import { selectCocktailDeleteLoading, selectCocktailPublishLoading } from '../../cocktailSlice';
import { Cocktail } from '../../../../types';
import React from 'react';
import { deleteCocktails, getCocktails, publicCocktails } from '../../cocktailsThunks';

interface Props {
  cocktail: Cocktail;
}

const CocktailCard: React.FC<Props> = ({ cocktail }) => {
  const user = useAppSelector(selectUser);
  const publish = useAppSelector(selectCocktailPublishLoading);
  const deleting = useAppSelector(selectCocktailDeleteLoading);
  const dispatch = useAppDispatch();

  const ImgUrl = cocktail.image ? `${API_URL}/${cocktail.image}` : undefined;
  const navigate = useNavigate();

  const onPublish = async () => {
    await dispatch(publicCocktails(cocktail._id));
    await dispatch(getCocktails());
  };

  const onDelete = async () => {
    await dispatch(deleteCocktails(cocktail._id));
    await dispatch(getCocktails());
  };

  const onClickNavigate = () => {
    navigate('/cocktails/' + cocktail._id);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '20px auto', boxShadow: 3, borderRadius: 2 }}>
      <CardActionArea sx={{ paddingX: 4 }}>
        <CardMedia
          component="img"
          height="250"
          image={ImgUrl}
          alt="cocktail"
          onClick={onClickNavigate}
          sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" textAlign="center">
            {cocktail.name}
          </Typography>
          {!cocktail.isPublished && (
            <Typography variant="body2" color="error">
              Unpublished
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardContent>
        {user?.role === 'admin' && !cocktail.isPublished && (
          <Button onClick={onPublish} fullWidth variant="contained" color="primary" sx={{ mt: 2 }} disabled={publish}>
            {publish ? <CircularProgress size={24} /> : 'Publish'}
          </Button>
        )}
        {user?.role === 'admin' && (
          <Button onClick={onDelete} fullWidth variant="contained" color="secondary" sx={{ mt: 1 }} disabled={deleting}>
            {deleting ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CocktailCard;
