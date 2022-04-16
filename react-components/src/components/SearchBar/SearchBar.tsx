import React from 'react';

import style from './SearchBar.module.scss';

type SearchBarProps = {
  searchValue: string;
  onSearchBarChange: (value: string) => void;
  onSearchBarSubmit: () => void;
};

type SearchBarState = Record<string, never>;

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.props.onSearchBarChange(event.target.value);
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (this.props.searchValue) {
      this.props.onSearchBarSubmit();
    }
  }

  render() {
    return (
      <form className={style.searchbar} onSubmit={this.handleSubmit}>
        <input
          type="text"
          className={style.searchbarInput}
          value={this.props.searchValue}
          onChange={this.handleChange}
          placeholder="Search"
        ></input>
        <button type="submit" className={style.searchbarBtn} data-testid="search-btn">
          Search
        </button>
      </form>
    );
  }
}

export default SearchBar;
