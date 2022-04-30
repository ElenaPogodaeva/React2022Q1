import React from 'react';

import { Image } from '../../types/types';
import style from './Pagination.module.scss';

type Pagination = {
  currentPage: number;
  maxPageLimit: number;
  minPageLimit: number;
  totalPages: number;
  onPrevClick: () => void;
  onNextClick: () => void;
  onPageChange: (value: number) => void;
};

export const Pagination = (props: Pagination) => {
  const { currentPage, maxPageLimit, minPageLimit } = props;
  const totalPages = props.totalPages;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrevClick = () => {
    props.onPrevClick();
  };

  const handleNextClick = () => {
    props.onNextClick();
  };

  const handlePageClick = (e: React.MouseEvent) => {
    props.onPageChange(Number((e.target as HTMLElement).id));
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

  return (
    Boolean(totalPages) && <ul className={style.pageNumbers}>
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
  );
};

export default Pagination;
