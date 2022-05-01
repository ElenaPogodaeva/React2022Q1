import React, { useContext } from 'react';
import { AppContext } from '../../context/context';
import { ActionType } from '../../context/reducers';

import style from './SearchOptions.module.scss';

export const SearchOptions = () => {
  const { state, dispatch } = useContext(AppContext);
  const { sortBy, resultsPerPage, totalPages } = state;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;
    dispatch({ type: ActionType.SetSearchOptions, payload: { name, value } });
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