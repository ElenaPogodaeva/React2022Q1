import React, { useContext } from 'react';
import { AppContext } from '../../context/context';
import { ActionType } from '../../context/reducers';

import style from './Pagination.module.scss';

export const Pagination = () => {
  const { state, dispatch } = useContext(AppContext);

  const { currentPage, maxPageLimit, minPageLimit, totalPages } = state;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrevClick = () => {
    dispatch({ type: ActionType.SetPrevPage });
  };

  const handleNextClick = () => {
    dispatch({ type: ActionType.SetNextPage });
  };

  const handlePageClick = (e: React.MouseEvent) => {
    const pageNumber = Number((e.target as HTMLElement).id);
    dispatch({ type: ActionType.SetCurrentPage, payload: pageNumber });
  };

  const pageNumbers = pages.map((page) => {
    if (page <= maxPageLimit && page > minPageLimit) {
      return (
        <li
          key={page}
          id={page.toString()}
          onClick={handlePageClick}
          className={currentPage === page ? `${style.pageActive}` : ''}
        >
          {page}
        </li>
      );
    } else {
      return null;
    }
  });

  let pageIncrementDots = null;
  if (pages.length > maxPageLimit) {
    pageIncrementDots = <li onClick={handleNextClick}>&hellip;</li>;
  }
  let pageDecremenDots = null;
  if (minPageLimit >= 1) {
    pageDecremenDots = <li onClick={handlePrevClick}>&hellip;</li>;
  }

  return totalPages ? (
    <ul className={style.pageNumbers}>
      <li>
        <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>
          Prev
        </button>
      </li>
      {pageDecremenDots}
      {pageNumbers}
      {pageIncrementDots}
      <li>
        <button onClick={handleNextClick} disabled={currentPage === pages[pages.length - 1]}>
          Next
        </button>
      </li>
    </ul>
  ) : null;
};

export default Pagination;
