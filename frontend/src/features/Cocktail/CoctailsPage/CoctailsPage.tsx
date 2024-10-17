import { useEffect } from 'react';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCocktailFetching, selectCocktails } from '../cocktailSlice';
import { getCocktails } from '../cocktailsThunks';
import CocktailCard from '../components/CocktailCard/CocktailCard';

const CocktailsPage = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const loading = useAppSelector(selectCocktailFetching);

  useEffect(() => {
    dispatch(getCocktails());
  }, [dispatch]);

  return (
    <Container fixed>
      {cocktails.length ? (
        <>
          <Typography textAlign="center" variant="h2">
            Cocktails:
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

export default CocktailsPage;
