import React from 'react';

import style from './SearchBar.module.scss';

type SearchBarProps = Record<string, never>;

type SearchBarState = Record<string, string>;

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      searchValue: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ searchValue: event.target.value });
  }

  componentDidMount() {
    const localStorageValue = localStorage.getItem('searchValue');
    if (localStorageValue) {
      this.setState({ searchValue: localStorageValue });
    }
  }

  componentWillUnmount() {
    localStorage.setItem('searchValue', this.state.searchValue);
  }

  render() {
    return (
      <form className={style.searchbar}>
        <input
          type="text"
          className={style.searchbarInput}
          value={this.state.searchValue}
          onChange={this.handleChange}
          placeholder="Search"
        ></input>
        <button type="submit" className={style.searchbarBtn}>
          Search
        </button>
      </form>
    );
  }
}

export default SearchBar;
