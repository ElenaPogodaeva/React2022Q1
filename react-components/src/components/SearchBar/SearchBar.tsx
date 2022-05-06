import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AppContext } from '../../context/context';
import { ActionType } from '../../context/reducers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSearchValue, setCurrentPage, resetPage, fetchImages } from '../../features/searchSlice';

import style from './SearchBar.module.scss';

export const SearchBar = () => {
  const { searchValue, sortBy, resultsPerPage, currentPage } = useAppSelector(
    (state) => state.search
  );
  //const { state, dispatch, fetchImages } = useContext(AppContext);
  //const { searchValue, sortBy, resultsPerPage, currentPage } = state;
  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    //dispatch({ type: ActionType.SetSearchValue, payload: value });
    dispatch(setSearchValue(value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (searchValue) {
      //fetchImages(searchValue, sortBy, resultsPerPage, currentPage);
      dispatch(fetchImages({ searchValue, sortBy, resultsPerPage, currentPage }));
      //dispatch({ type: ActionType.SetCurrentPage, payload: 1 });
      //dispatch({ type: ActionType.ResetPage });
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
