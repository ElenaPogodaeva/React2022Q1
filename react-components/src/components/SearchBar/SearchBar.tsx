import React from 'react';

import style from './SearchBar.module.scss';

type SearchBarProps = {
  searchValue: string;
  onSearchBarChange: (value: string) => void;
  onSearchBarSubmit: () => void;
};

export const SearchBar = ({
  searchValue,
  onSearchBarChange,
  onSearchBarSubmit,
}: SearchBarProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    onSearchBarChange(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (searchValue) {
      onSearchBarSubmit();
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
