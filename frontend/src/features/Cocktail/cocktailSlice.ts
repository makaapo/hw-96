import { createSlice } from '@reduxjs/toolkit';
import { Cocktail } from '../../types';
import {
  createCocktails,
  deleteCocktails,
  getCocktails,
  getCocktailsByAuthor,
  getOneCocktail,
  publicCocktails,
} from './cocktailsThunks';

interface InitialState {
  cocktails: Cocktail[];
  cocktail: Cocktail | null;
  isLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  publishLoading: boolean;
  oneFetching: boolean;
}

const initialState: InitialState = {
  cocktails: [],
  cocktail: null,
  isLoading: false,
  createLoading: false,
  deleteLoading: false,
  publishLoading: false,
  oneFetching: false,
};

export const CocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCocktails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCocktails.fulfilled, (state, { payload: cocktails }) => {
      state.cocktails = cocktails;
      state.isLoading = false;
    });
    builder.addCase(getCocktails.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getOneCocktail.pending, (state) => {
      state.oneFetching = true;
    });
    builder.addCase(getOneCocktail.fulfilled, (state, { payload: cocktail }) => {
      state.cocktail = cocktail;
      state.oneFetching = false;
    });
    builder.addCase(getOneCocktail.rejected, (state) => {
      state.oneFetching = false;
    });

    builder.addCase(getCocktailsByAuthor.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCocktailsByAuthor.fulfilled, (state, { payload: cocktails }) => {
      state.cocktails = cocktails;
      state.isLoading = false;
    });
    builder.addCase(getCocktailsByAuthor.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(createCocktails.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createCocktails.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createCocktails.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(publicCocktails.pending, (state) => {
      state.publishLoading = true;
    });
    builder.addCase(publicCocktails.fulfilled, (state) => {
      state.publishLoading = false;
    });
    builder.addCase(publicCocktails.rejected, (state) => {
      state.publishLoading = false;
    });

    builder.addCase(deleteCocktails.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteCocktails.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteCocktails.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
  selectors: {
    selectCocktails: (state) => state.cocktails,
    selectOneCocktail: (state) => state.cocktail,
    selectOneCocktailFetching: (state) => state.oneFetching,
    selectCocktailFetching: (state) => state.isLoading,
    selectCocktailPublishLoading: (state) => state.publishLoading,
    selectCocktailDeleteLoading: (state) => state.deleteLoading,
    selectCocktailCreateLoading: (state) => state.createLoading,
  },
});

export const CocktailsReducer = CocktailsSlice.reducer;

export const {
  selectCocktails,
  selectOneCocktail,
  selectOneCocktailFetching,
  selectCocktailPublishLoading,
  selectCocktailDeleteLoading,
  selectCocktailFetching,
  selectCocktailCreateLoading,
} = CocktailsSlice.selectors;
