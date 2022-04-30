import React from 'react';
import { Image } from '../types/types';
import { SearchActions } from './reducers';

export enum SortType {
  DatePostedDesc = 'date-posted-desc',
  DatePostedAsc = 'date-posted-asc',
  InterestingDesc = 'interestingness-desc',
  InterestingAsc = 'interestingness-asc',
  Relevance = 'relevance',
}

type SearchOptions = {
  sortBy: SortType;
  resultsPerPage: number;
  currentPage: number;
};

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
};

export const initialState = {
  searchValue: '',
  sortBy: SortType.InterestingDesc,
  resultsPerPage: 30,
  currentPage: 1,
  totalPages: 1,
  minPageLimit: 0,
  maxPageLimit: 5,
  isLoading: true,
  error: '',
  images: [],
};
//export default React.createContext<InitialStateType>( initialState);

//addProductToCart: product => {},
//removeProductFromCart: productId =);

export const AppContext = React.createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<SearchActions>;
  fetchImages: (searchValue: string, sortBy: SortType, perPage: number, currentPage: number) => void;
}>({
  state: initialState,
  dispatch: () => null,
  fetchImages: () => null,
});
