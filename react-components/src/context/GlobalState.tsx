import React, { useReducer, useEffect, useCallback } from 'react';

import { AppContext, initialState, SortType } from './context';
import { ActionType, searchReducer } from './reducers';
import { Image, SearchImagesParams } from '../types/types';
import { flickr } from '../common/flickr';

// const initialState = {
//   searchValue: '',
//   sortBy: SortType.InterestingnessDesc,
//   resultsPerPage: 30,
//   currentPage: 1,
//   totalPages: 1,
//   minPageLimit: 0,
//   maxPageLimit: 5,
//   isLoading: true,
//   error: '',
//   images: [],
// };
const GlobalState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const { searchValue, sortBy, resultsPerPage, currentPage } = state;
  //const [searchValue, setSearchValue] = useState('');
  //const [isLoading, setIsLoading] = useState(true);
  //const [images, setImages] = useState<Image[]>([]);
  //const [error, setError] = useState<Error | null>(null);

  const fetchImages = useCallback(
    async (searchValue: string, sortBy: SortType, perPage: number, currentPage: number) => {
      //setIsLoading(true);
      const params: SearchImagesParams = {
        tags: searchValue,
        extras: 'url_n,owner_name,date_taken,views',
        page: currentPage.toString(), //'1',
        sort: sortBy, //'interestingness-desc',
        per_page: perPage.toString(), //'30',
      };

      try {
        const response = await flickr('photos.search', params);
        const totalPages = response.photos.total;
        const images = response.photos.photo.filter((item: Image) => item.url_n);
        //setImages(fetchedImages.photos.photo.filter((item: Image) => item.url_n));
        //setTotalPages(fetchedImages.photos.pages);
        //setError(null);
        dispatch({
          type: ActionType.FetchSuccess,
          payload: { images, totalPages },
        });
      } catch (err) {
        //setImages([]);
        //setError(err as Error);
        dispatch({ type: ActionType.FetchError });
      } finally {
        //setIsLoading(false);
      }
    },
    [sortBy, resultsPerPage, currentPage]
  );

  // const fetchImages = async (
  //   searchValue: string,
  //   sortBy: SortType,
  //   perPage: number,
  //   currentPage: number
  // ) => {
  //   //setIsLoading(true);
  //   const params: SearchImagesParams = {
  //     tags: searchValue,
  //     extras: 'url_n,owner_name,date_taken,views',
  //     page: currentPage.toString(), //'1',
  //     sort: sortBy, //'interestingness-desc',
  //     per_page: perPage.toString(), //'30',
  //   };

  //   try {
  //     const response = await flickr('photos.search', params);
  //     const totalPages = response.photos.total.toString();
  //     const images = response.photos.photo.filter((item: Image) => item.url_n);
  //     //setImages(fetchedImages.photos.photo.filter((item: Image) => item.url_n));
  //     //setTotalPages(fetchedImages.photos.pages);
  //     //setError(null);
  //     dispatch({
  //       type: ActionType.FetchSuccess,
  //       payload: { images, totalPages},
  //     });
  //   } catch (err) {
  //     //setImages([]);
  //     //setError(err as Error);
  //     dispatch({ type: ActionType.FetchError });
  //   } finally {
  //     //setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    const localStorageValue = localStorage.getItem('searchValue');
    if (localStorageValue) {
      //setSearchValue(localStorageValue);
      dispatch({ type: ActionType.SetSearchValue, payload: localStorageValue });
      fetchImages(localStorageValue, sortBy, resultsPerPage, currentPage);
    } else {
      fetchImages('nature,flowers', sortBy, resultsPerPage, currentPage);
    }
  }, []);

  useEffect(() => {
    fetchImages(searchValue, sortBy, resultsPerPage, currentPage);
  }, [fetchImages]);

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
