import React from 'react';
import { setCurrentPage, setNextPage, setPrevPage } from '../../features/searchSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

import style from './Pagination.module.scss';

export const Pagination = () => {
  const { currentPage, maxPageLimit, minPageLimit, totalPages } = useAppSelector(
    (state) => state.search
  );
  const dispatch = useAppDispatch();

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrevClick = () => {
    dispatch(setPrevPage());
  };

  const handleNextClick = () => {
    dispatch(setNextPage());
  };

  const handlePageClick = (e: React.MouseEvent) => {
    const pageNumber = Number((e.target as HTMLElement).id);
    dispatch(setCurrentPage(pageNumber));
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
