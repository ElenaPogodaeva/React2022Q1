import React, { useReducer, useEffect } from 'react';

import { AppContext, initialState, SortType } from './context';
import { ActionType, mainReducer } from './reducers';
import { Image, SearchImagesParams } from '../types/types';
import { flickr } from '../common/flickr';

const GlobalState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const { searchValue, sortBy, resultsPerPage, currentPage } = state;

  const fetchImages = async (
    searchValue: string,
    sortBy: SortType,
    perPage: number,
    currentPage: number
  ) => {
    const params: SearchImagesParams = {
      tags: searchValue,
      extras: 'url_n,owner_name,date_taken,views',
      page: currentPage.toString(),
      sort: sortBy,
      per_page: perPage.toString(),
    };

    try {
      const response = await flickr('photos.search', params);
      const totalPages = response.photos.total;
      const images = response.photos.photo.filter((item: Image) => item.url_n);
      dispatch({
        type: ActionType.FetchSuccess,
        payload: { images, totalPages },
      });
    } catch (err) {
      dispatch({ type: ActionType.FetchError });
    }
  };

  useEffect(() => {
    const localStorageValue = localStorage.getItem('searchValue');
    if (localStorageValue) {
      dispatch({ type: ActionType.SetSearchValue, payload: localStorageValue });
      fetchImages(localStorageValue, sortBy, resultsPerPage, currentPage);
    } else {
      fetchImages('nature,flowers', sortBy, resultsPerPage, currentPage);
    }
  }, []);

  useEffect(() => {
    fetchImages(searchValue, sortBy, resultsPerPage, currentPage);
  }, [sortBy, resultsPerPage, currentPage]);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        fetchImages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default GlobalState;
