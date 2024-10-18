import { useEffect } from 'react';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../User/userSlice';
import { selectCocktailFetching, selectUserCocktails } from '../cocktailSlice';
import { getCocktailsByAuthor } from '../cocktailsThunks';
import CocktailCard from '../components/CocktailCard/CocktailCard';

const CocktailsPageUser = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectUserCocktails);
  const loading = useAppSelector(selectCocktailFetching);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user) {
      dispatch(getCocktailsByAuthor(user._id));
    }
  }, [dispatch, user]);

  return (
    <Container fixed>
      {cocktails.length ? (
        <>
          <Typography textAlign="center" variant="h2">
            My Cocktails:
          </Typography>
          <Grid container gap={2}>
            {loading ? (
              <CircularProgress />
            ) : (
              cocktails.map((cocktail) => <CocktailCard key={cocktail._id} cocktail={cocktail} />)
            )}
          </Grid>
        </>
      ) : (
        <Typography textAlign="center" variant="h2">
          There is no cocktails yet
        </Typography>
      )}
    </Container>
  );
};

export default CocktailsPageUser;
