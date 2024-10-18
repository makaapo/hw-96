import React, { useState } from 'react';
import { Box, Button, CircularProgress, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { createCocktails } from '../../cocktailsThunks';
import { CocktailMutation } from '../../../../types';
import FileInput from '../../../../UI/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectCocktailCreateLoading } from '../../cocktailSlice';

const CocktailForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectCocktailCreateLoading);

  const onSubmit = async (CocktailMutation: CocktailMutation) => {
    try {
      await dispatch(createCocktails(CocktailMutation)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const [state, setState] = useState<CocktailMutation>({
    name: '',
    receipt: '',
    image: null,
    ingredients: [
      {
        name: '',
        amount: '',
      },
    ],
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    void onSubmit(state);
  };

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addNewField = () => {
    setState((prevState) => ({
      ...prevState,
      ingredients: [...prevState.ingredients, { name: '', amount: '' }],
    }));
  };

  const inputIngredientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;
    setState((prevState) => {
      const ingredientsCopy = [...prevState.ingredients];
      ingredientsCopy[index] = { ...ingredientsCopy[index], [name]: value };
      return { ...prevState, ingredients: ingredientsCopy };
    });
  };

  const deleteInput = (index: number) => {
    setState((prevState) => {
      return { ...prevState, ingredients: prevState.ingredients.filter((_, i) => i !== index) };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ padding: 4, width: '80%', maxWidth: 600 }}>
        <Typography variant="h5" gutterBottom align="center">
          Create a New Cocktail
        </Typography>
        <form autoComplete="off" onSubmit={submitFormHandler}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField
                fullWidth
                label="Cocktail Name"
                name="name"
                value={state.name}
                onChange={onFieldChange}
                required
              />
            </Grid>

            <Grid item>
              {state.ingredients.map((_, index) => (
                <Box key={index} display="flex" alignItems="center" gap={1} mb={1}>
                  <TextField
                    fullWidth
                    label="Ingredient"
                    name="name"
                    value={state.ingredients[index].name}
                    onChange={(e) => inputIngredientChange(e, index)}
                    required
                  />
                  <TextField
                    label="Amount"
                    name="amount"
                    value={state.ingredients[index].amount}
                    onChange={(e) => inputIngredientChange(e, index)}
                    required
                    sx={{ width: '30%' }}
                  />
                  {index !== 0 && (
                    <IconButton aria-label="delete" color="secondary" onClick={() => deleteInput(index)}>
                      <CloseIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Grid>

            <Grid item>
              <Button variant="outlined" fullWidth onClick={addNewField}>
                Add New Ingredient
              </Button>
            </Grid>

            <Grid item>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Information about Cocktail"
                name="receipt"
                value={state.receipt}
                onChange={onFieldChange}
              />
            </Grid>

            <Grid item>
              <FileInput label="Image" onChange={fileInputChangeHandler} name="image" />
            </Grid>

            <Grid item>
              <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading || !state.image}>
                {loading ? <CircularProgress size={24} /> : 'Create'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CocktailForm;
