import React from 'react';
import { Image, UserCardModel } from '../types/types';
import { Actions } from './reducers';

export enum SortType {
  DatePostedDesc = 'date-posted-desc',
  DatePostedAsc = 'date-posted-asc',
  InterestingDesc = 'interestingness-desc',
  InterestingAsc = 'interestingness-asc',
  Relevance = 'relevance',
}

export type InitialStateType = {
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
};

export const initialState = {
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

export const AppContext = React.createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<Actions>;
  fetchImages: (
    searchValue: string,
    sortBy: SortType,
    perPage: number,
    currentPage: number
  ) => void;
}>({
  state: initialState,
  dispatch: () => null,
  fetchImages: () => null,
});
