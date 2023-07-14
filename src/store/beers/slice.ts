import axios from 'axios';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Beer } from '@types';

axios.defaults.baseURL = 'https://api.punkapi.com/v2/';

export interface BeersState {
  beers: Beer[];
  isLoading: boolean;
  error: string | null;
  details: Beer | null;
  selectedBeers: number[];
  lastBeerId: number;
  visibleBeers: Beer[];
  page: number;
  toggleBeer: (id: number) => void;
  deleteSelectedBeers: () => void;
  setPage: (page: number) => void;
  setLastBeerId: (id: number) => void;
  setVisibleBeers: () => void;
  getBeers: () => void;
  getBeerById: (id: string) => void;
}

export const useBeersStore = create<BeersState>()(
  persist(
    devtools(set => ({
      beers: [],
      isLoading: false,
      error: null,
      details: null,
      selectedBeers: [],
      lastBeerId: 0,
      visibleBeers: [],
      page: 1,
      toggleBeer: id => {
        set(state => ({
          selectedBeers: state.selectedBeers.includes(id)
            ? state.selectedBeers.filter(beer => beer !== id)
            : [id, ...state.selectedBeers],
        }));
      },
      deleteSelectedBeers: () => {
        set(state => ({
          beers: state.beers.filter(({ id }) => !state.selectedBeers.includes(id)),
          selectedBeers: [],
        }));
      },
      setPage: page => {
        set({ page });
      },
      setLastBeerId: id => {
        set({ lastBeerId: id });
      },
      setVisibleBeers: () => {
        set(state => {
          const lastBeerIndex = state.beers.findIndex(beer => beer.id === state.lastBeerId);
          const startIndex = lastBeerIndex === -1 ? 0 : lastBeerIndex + 1;
          const endIndex = startIndex + 5;
          const newVisibleBeers = state.beers.slice(startIndex, endIndex);
          return {
            visibleBeers:
              state.visibleBeers.length === 15
                ? [...state.visibleBeers.slice(5), ...newVisibleBeers]
                : [...state.visibleBeers, ...newVisibleBeers],
          };
        });
      },
      getBeers: async () => {
        set({ isLoading: true });
        try {
          const response = await axios.get(`beers?page=${useBeersStore.getState().page}`);
          const nextBeers = await response.data;
          set(state => ({ ...state, beers: [...state.beers, ...nextBeers], isLoading: false }));
        } catch (e: unknown) {
          if (e instanceof Error) {
            set({ error: e.message, isLoading: false });
          } else {
            set({ error: 'An unknown error occurred.', isLoading: false });
          }
        }
      },
      getBeerById: async id => {
        set(() => ({ isLoading: true }));
        try {
          const response = await axios.get(`beers/${id}`);
          set({ details: await response.data[0], isLoading: false });
        } catch (e: unknown) {
          if (e instanceof Error) {
            set({ error: e.message, isLoading: false });
          }
          set({ error: 'An unknown error occurred.', isLoading: false });
        }
      },
    })),
    {
      name: 'beers',
    }
  )
);
