import React from 'react';

import style from './SearchBar.module.scss';

type SearchBarProps = {
  searchValue: string;
  onSearchBarChange: (value: string) => void;
};

type SearchBarState = Record<string, never>;

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    // this.state = {
    //   searchValue: '',
    // };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    //this.setState({ searchValue: event.target.value });
    this.props.onSearchBarChange(event.target.value);
  }

  // componentDidMount() {
  //   this.setState({ searchValue: localStorage.getItem('searchValue') || '' });
  // }
  // componentWillUnmount() {
  //   localStorage.setItem('searchValue', this.state.searchValue);
  // }

  render() {
    return (
      <form className={style.searchbar}>
        <input
          type="text"
          className={style.searchbarInput}
          value={this.props.searchValue}
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
