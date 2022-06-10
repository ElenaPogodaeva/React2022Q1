import React from 'react';
import { setSearchOptions } from '../../features/searchSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

import style from './SearchOptions.module.scss';

export const SearchOptions = () => {
  const { sortBy, resultsPerPage, totalPages } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;
    dispatch(setSearchOptions({ name, value }));
  };

  return (
    <div className={style.searchOptions}>
      <label className={style.searchLabel}>
        Sort Order
        <select className={style.searchSelect} value={sortBy} name="sortBy" onChange={handleChange}>
          <option value="interestingness-desc">interestingness-desc</option>
          <option value="interestingness-asc">interestingness-asc</option>
          <option value="date-posted-desc">date-posted-desc</option>
          <option value="date-posted-asc">date-posted-asc</option>
          <option value="relevance">relevance</option>
        </select>
      </label>
      <label className={style.searchLabel}>
        Results per page
        <input
          type="text"
          className={style.searchInput}
          value={resultsPerPage}
          name="resultsPerPage"
          onChange={handleChange}
        />
      </label>
      <div>
        <p className={style.searchLabel}>Total pages</p>
        <p className={style.totalPages}>{totalPages}</p>
      </div>
    </div>
  );
};

export default SearchOptions;
