import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Container, Grid, List, ListItem, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectOneCocktail, selectOneCocktailFetching } from '../cocktailSlice';
import { API_URL } from '../../../constants';
import { getOneCocktail } from '../cocktailsThunks';

const OneCocktail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const cocktail = useAppSelector(selectOneCocktail);
  const loading = useAppSelector(selectOneCocktailFetching);

  const ImgUrl = cocktail?.image ? `${API_URL}/${cocktail.image}` : undefined;

  useEffect(() => {
    if (id) {
      dispatch(getOneCocktail(id));
    }
  }, [dispatch, id]);

  return (
    <Container fixed>
      {loading ? (
        <CircularProgress />
      ) : (
        cocktail && (
          <Grid container>
            <Grid item xs={4}>
              <Box component="img" maxHeight={200} src={ImgUrl} alt="cocktail" />
            </Grid>
            <Grid item xs={8}>
              <Typography gutterBottom variant="h3">
                {cocktail.name}
              </Typography>
              <Typography variant="h4">Ingredients:</Typography>
              <List>
                {cocktail.ingredients.map((ingredient, index) => (
                  <ListItem key={`${ingredient.name}-${index}`}>
                    <Typography>
                      - {ingredient.name} ... {ingredient.amount}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h4">
                Recipe:
              </Typography>
              <Typography>{cocktail.receipt}</Typography>
            </Grid>
          </Grid>
        )
      )}
    </Container>
  );
};

export default OneCocktail;
