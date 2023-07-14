import { BeersState } from './slice';

export const selectBeers = (state: BeersState) => state.beers;

export const selectIsLoading = (state: BeersState) => state.isLoading;

export const selectError = (state: BeersState) => state.error;

export const selectDetails = (state: BeersState) => state.details;

export const selectSelectedBeers = (state: BeersState) => state.selectedBeers;

export const selectPage = (state: BeersState) => state.page;

export const selectLastBeerId = (state: BeersState) => state.lastBeerId;

export const selectVisibleBeers = (state: BeersState) => state.visibleBeers;

export const selectHasHydrated = (state: BeersState) => state._hasHydrated;

export const selectToggleBeer = (state: BeersState) => state.toggleBeer;

export const selectDeleteSelectedBeers = (state: BeersState) => state.deleteSelectedBeers;

export const selectSetPage = (state: BeersState) => state.setPage;

export const selectSetLastBeerId = (state: BeersState) => state.setLastBeerId;

export const selectSetVisibleBeers = (state: BeersState) => state.setVisibleBeers;

export const selectGetBeers = (state: BeersState) => state.getBeers;

export const selectGetBeerById = (state: BeersState) => state.getBeerById;
