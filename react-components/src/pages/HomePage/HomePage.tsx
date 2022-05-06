import React, { useEffect, useRef } from 'react';
import Cards from '../../components/Cards/Cards';
import SearchBar from '../../components/SearchBar/SearchBar';
import Spinner from '../../components/Spinner/Spinner';
import Pagination from '../../components/Pagination/Pagination';
import SearchOptions from '../../components/SearchOptions/SearchOptions';
import { useAppSelector } from '../../hooks';

type SearchOptions = {
  searchValue: string;
  sortBy: string;
  perPage: number;
  currentPage: number;
};

export const HomePage = () => {
  const { searchValue, images, error, isLoading } = useAppSelector((state) => state.search);

  const searchValueRef = useRef('');
  searchValueRef.current = searchValue;

  // useEffect(() => {
  //   const localStorageValue = localStorage.getItem('searchValue');
  //   if (localStorageValue) {
  //     //dispatch({ type: ActionType.SetSearchValue, payload: localStorageValue });
  //     //fetchImages(localStorageValue, sortBy, resultsPerPage, currentPage);
  //     dispatch(
  //       fetchImages({ searchValue: localStorageValue, sortBy, resultsPerPage, currentPage })
  //     );
  //   } else {
  //     //fetchImages('nature,flowers', sortBy, resultsPerPage, currentPage);
  //     dispatch(fetchImages({ searchValue: 'nature,flowers', sortBy, resultsPerPage, currentPage }));
  //   }
  // }, [dispatch]);

  useEffect(() => {
    return () => {
      localStorage.setItem('searchValue', searchValueRef.current as string);
    };
  }, []);

  const notFound = !error && !isLoading && images.length === 0 ? 'Nothing found' : null;

  return (
    <div data-testid="home-page">
      <SearchBar />
      <SearchOptions />
      {error && <div>{error}</div>}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Cards cards={images} />
          <Pagination />
        </>
      )}
      {notFound}
    </div>
  );
};

export default HomePage;
