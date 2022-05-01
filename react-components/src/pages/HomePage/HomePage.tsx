import React, { useContext, useEffect, useRef } from 'react';
import Cards from '../../components/Cards/Cards';
import SearchBar from '../../components/SearchBar/SearchBar';
import Spinner from '../../components/Spinner/Spinner';
import Pagination from '../../components/Pagination/Pagination';
import { AppContext } from '../../context/context';
import SearchOptions from '../../components/SearchOptions/SearchOptions';

export const HomePage = () => {
  const { state } = useContext(AppContext);
  const { searchValue, images, error, isLoading } = state;

  const searchValueRef = useRef('');
  searchValueRef.current = searchValue;

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
