import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cocktail, CocktailMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const getCocktails = createAsyncThunk<Cocktail[]>('Cocktails/getAll', async () => {
  const { data: cocktails } = await axiosApi.get<Cocktail[]>('/cocktails');
  return cocktails;
});

export const getCocktailsByAuthor = createAsyncThunk<Cocktail[], string>('Cocktails/getByAuthor', async (author) => {
  const { data: cocktails } = await axiosApi.get<Cocktail[]>('/cocktails?user=' + author);
  return cocktails;
});

export const getOneCocktail = createAsyncThunk<Cocktail, string>('Cocktails/getOne', async (oneCocktail) => {
  const { data: cocktail } = await axiosApi.get<Cocktail>('/cocktails/' + oneCocktail);
  return cocktail;
});

export const createCocktails = createAsyncThunk<void, CocktailMutation>('Cocktails/new', async (cocktailMutation) => {
  const formData = new FormData();
  const keys = Object.keys(cocktailMutation) as (keyof CocktailMutation)[];
  keys.forEach((key) => {
    const value = cocktailMutation[key];
    if (value !== null) {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }
  });
  await axiosApi.post<Cocktail>('/cocktails', formData);
});

export const publicCocktails = createAsyncThunk<void, string>('Cocktails/public', async (id) => {
  await axiosApi.patch('/cocktails/' + id + '/togglePublished');
});

export const deleteCocktails = createAsyncThunk<void, string>('Cocktails/delete', async (id) => {
  await axiosApi.delete('/cocktails/' + id);
});
