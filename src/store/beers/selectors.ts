import { BeersState } from './slice';

export const selectBeers = (state: BeersState) => state.beers;

export const selectIsLoading = (state: BeersState) => state.isLoading;

export const selectError = (state: BeersState) => state.error;

export const selectDetails = (state: BeersState) => state.details;

export const selectToggleBeer = (state: BeersState) => state.toggleBeer;

export const selectGetBeers = (state: BeersState) => state.getBeers;

export const selectGetBeerById = (state: BeersState) => state.getBeerById;
