import axios from 'axios';
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

import { Beer } from '@types';

axios.defaults.baseURL = 'https://api.punkapi.com/v2/';

const START_INDEX = 0;
const NEXT_INDEX = 1;
const INITIAL_PAGE = 1;
const START_ID = 0;
const NEXT_ID = 1;
const LIMIT_PER_PAGE = 15;
const INTERCHANGEABLE_NUMBER = 5;

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
      lastBeerId: START_ID,
      visibleBeers: [],
      page: INITIAL_PAGE,
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
          visibleBeers: state.visibleBeers.filter(({ id }) => !state.selectedBeers.includes(id)),
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
          const isSequentialIds = state.beers.every((beer, index) => beer.id === index + NEXT_ID);
          const lastBeerIndex = state.beers.findIndex(beer => beer.id === state.lastBeerId);
          const startIndex = lastBeerIndex === -1 ? START_INDEX : lastBeerIndex + NEXT_INDEX;
          const endIndex = startIndex + INTERCHANGEABLE_NUMBER;
          const newVisibleBeers =
            state.visibleBeers.length < LIMIT_PER_PAGE && !isSequentialIds
              ? state.beers.slice(
                  startIndex,
                  startIndex + LIMIT_PER_PAGE - state.visibleBeers.length
                )
              : state.beers.slice(startIndex, endIndex);
          const updatedBeers =
            state.visibleBeers.length === LIMIT_PER_PAGE
              ? [...state.visibleBeers.slice(INTERCHANGEABLE_NUMBER), ...newVisibleBeers]
              : [...state.visibleBeers, ...newVisibleBeers];
          return {
            visibleBeers: updatedBeers,
            selectedBeers: [
              ...state.selectedBeers.filter(beerId => updatedBeers.some(({ id }) => beerId === id)),
            ],
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
      name: 'beers-storage',
      skipHydration: true,
    }
  )
);
