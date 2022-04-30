import React, { useContext } from 'react';
import { AppContext } from '../../context/context';
import { ActionType } from '../../context/reducers';

import style from './SearchBar.module.scss';

type SearchBarProps = {
  searchValue: string;
  onSearchBarChange: (value: string) => void;
  onSearchBarSubmit: () => void;
};

export const SearchBar = () => {
  const { state, dispatch, fetchImages } = useContext(AppContext);
  const { searchValue, sortBy, resultsPerPage, currentPage } = state;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    //onSearchBarChange(value);
    dispatch({ type: ActionType.SetSearchValue, payload: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (searchValue) {
      //onSearchBarSubmit();
      fetchImages(searchValue, sortBy, resultsPerPage, currentPage);
      dispatch({ type: ActionType.SetCurrentPage, payload: 1 });
      dispatch({ type: ActionType.ResetPage });
    }
  };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
  //   const { value } = event.target;
  //   onSearchBarChange(value);
  // };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
  //   event.preventDefault();
  //   if (searchValue) {
  //     onSearchBarSubmit();
  //   }
  // };

  return (
    <form className={style.searchbar} onSubmit={handleSubmit}>
      <input
        type="text"
        className={style.searchbarInput}
        name="searchValue"
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
