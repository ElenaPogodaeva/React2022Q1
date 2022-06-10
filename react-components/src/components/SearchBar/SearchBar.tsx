import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSearchValue, setCurrentPage, resetPage } from '../../features/searchSlice';
import { fetchImages } from '../../features/thunks';
import style from './SearchBar.module.scss';

export const SearchBar = () => {
  const { searchValue, sortBy, resultsPerPage, currentPage } = useAppSelector(
    (state) => state.search
  );

  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    dispatch(setSearchValue(value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (searchValue) {
      dispatch(fetchImages({ searchValue, sortBy, resultsPerPage, currentPage }));
      dispatch(setCurrentPage(1));
      dispatch(resetPage());
    }
  };

  return (
    <form className={style.searchbar} onSubmit={handleSubmit}>
      <input
        type="text"
        className={style.searchbarInput}
        value={searchValue}
        onChange={handleChange}
        placeholder="Search"
      ></input>
      <button type="submit" className={style.searchbarBtn} data-testid="search-btn">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
