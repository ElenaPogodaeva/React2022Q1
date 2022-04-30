import { Image } from '../types/types';
import { InitialStateType, SortType } from './context';

// type InitialStateType = {
//   searchValue: string;
//   sortBy: SortType;
//   resultsPerPage: number;
//   currentPage: number;
//   totalPages: number;
//   minPageLimit: number;
//   maxPageLimit: number;
//   isLoading: boolean;
//   error: string;
//   images: Image[];
// };

export enum ActionType {
  FetchSuccess = 'Fetch_success',
  FetchError = 'Fetch_error',
  SetSearchValue = 'Set_search_value',
  SetSearchOptions = 'Set_search_options',
  SetNextPage = 'Set_next_page',
  SetPrevPage = 'Set_prev_page',
  SetCurrentPage = 'Set_current_page',
}

export type FetchSuccess = {
  type: ActionType.FetchSuccess;
  payload: {
    images: Image[];
    totalPages: number;
  };
};
export type FetchError = {
  type: ActionType.FetchError;
};
export type SetSearchValue = {
  type: ActionType.SetSearchValue;
  payload: string;
};
export type SetSearchOptions = {
  type: ActionType.SetSearchOptions;
  payload: {
    name: string;
    value: string;
  };
};
export type SetNextPage = {
  type: ActionType.SetNextPage;
};
export type SetPrevPage = {
  type: ActionType.SetPrevPage;
};
export type SetCurrentPage = {
  type: ActionType.SetCurrentPage;
  payload: number;
};

export type SearchActions =
  | FetchSuccess
  | FetchError
  | SetSearchValue
  | SetSearchOptions
  | SetNextPage
  | SetPrevPage
  | SetCurrentPage

export const searchReducer = (state: InitialStateType, action: SearchActions) => {
  switch (action.type) {
    case ActionType.FetchSuccess:
      return {
        ...state,
        isLoading: false,
        error: '',
        images: action.payload.images,
        totalPages: action.payload.totalPages,
      };
    case ActionType.FetchError:
      return {
        ...state,
        isLoading: false,
        error: 'Error occured',
        images: [],
      };
    case ActionType.SetSearchValue:
      return {
        ...state,
        searchValue: action.payload,
      };
    case ActionType.SetSearchOptions:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ActionType.SetNextPage: {
      //const nextPage = state.currentPage + 1;
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    }
    case ActionType.SetPrevPage: {
      //const nextPage = state.currentPage + 1;
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    }
    case ActionType.SetCurrentPage: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    default:
      return state;
  }
};