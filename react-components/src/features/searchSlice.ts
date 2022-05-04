import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Image, UserCardModel } from '../types/types';
// export interface SearchState {
//   value: number
// }

// const initialState: SearchState = {
//   value: 0,
// }

export enum SortType {
  DatePostedDesc = 'date-posted-desc',
  DatePostedAsc = 'date-posted-asc',
  InterestingDesc = 'interestingness-desc',
  InterestingAsc = 'interestingness-asc',
  Relevance = 'relevance',
}

export type SearchState = {
  searchValue: string;
  sortBy: SortType;
  resultsPerPage: number;
  currentPage: number;
  totalPages: number;
  minPageLimit: number;
  maxPageLimit: number;
  isLoading: boolean;
  error: string;
  images: Image[];
  formValues: UserCardModel[];
  [key: string]: string | SortType | number | boolean | Image[] | UserCardModel[];
};

const initialState: SearchState = {
  searchValue: '',
  sortBy: SortType.InterestingDesc,
  resultsPerPage: 30,
  currentPage: 1,
  totalPages: 0,
  minPageLimit: 0,
  maxPageLimit: 5,
  isLoading: true,
  error: '',
  images: [],
  formValues: [],
};

const pageNumberLimit = 5;

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSearchOptions: (
      state,
      action: PayloadAction<{
        name: string;
        value: string;
      }>
    ) => {
      state[action.payload.name] = action.payload.value;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPrevPage: (state) => {
      if ((state.currentPage - 1) % pageNumberLimit === 0) {
        state.maxPageLimit = state.maxPageLimit - pageNumberLimit;
        state.minPageLimit = state.minPageLimit - pageNumberLimit;
      }
      state.currentPage = state.currentPage - 1;
    },
    setNextPage: (state) => {
      if (state.currentPage + 1 > state.maxPageLimit) {
        state.maxPageLimit = state.maxPageLimit + pageNumberLimit;
        state.minPageLimit = state.minPageLimit + pageNumberLimit;
      }
      state.currentPage = state.currentPage + 1;
    },
    resetPage: (state) => {
      state.maxPageLimit = 5;
      state.minPageLimit = 0;
      state.currentPage = 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSearchValue,
  setSearchOptions,
  setCurrentPage,
  setPrevPage,
  setNextPage,
  resetPage,
} = searchSlice.actions;

export default searchSlice.reducer;
