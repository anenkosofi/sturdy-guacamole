import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

import { Beer, Details } from '@types';

axios.defaults.baseURL = 'https://api.punkapi.com/v2/';

export interface BeersState {
  beers: Beer[];
  isLoading: boolean;
  error: string | null;
  details: Details | null;
  selectedBeers: string[];
  toggleBeer: (id: string) => void;
  getBeers: () => void;
  getBeerById: (id: string) => void;
}

export const useBeersStore = create<BeersState>()(
  devtools(set => ({
    beers: [],
    isLoading: false,
    error: null,
    details: null,
    selectedBeers: [],
    toggleBeer: id => {
      set(state => ({
        selectedBeers: state.selectedBeers.includes(id)
          ? state.selectedBeers.filter(beer => beer !== id)
          : [id, ...state.selectedBeers],
      }));
    },
    getBeers: async () => {
      set(() => ({ isLoading: true }));
      try {
        const response = await axios.get('beers?page=1');
        set({ beers: await response.data, isLoading: false });
      } catch (e: unknown) {
        if (e instanceof Error) {
          set({ error: e.message, isLoading: false });
        }
        set({ error: 'An unknown error occurred.', isLoading: false });
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
  }))
);
