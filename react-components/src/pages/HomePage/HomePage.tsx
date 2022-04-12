import React from 'react';
import Cards from '../../components/Cards/Cards';
import ImageDetail from '../../components/ImageDetail/ImageDetail';
import SearchBar from '../../components/SearchBar/SearchBar';
import { Image } from '../../types/types';

const API_KEY = '76f2ad1b1c2bc03737c9a268bb694c82';

type HomePageProps = Record<string, never>;
type HomePageState = {
  searchValue: string;
  images: Image[];
};

type SearchParams = {
  method: string;
  api_key: string;
  tags: string;
  extras: string;
  page: string;
  format: string;
  nojsoncallback: string;
  sort: string;
  per_page: string;
  [key: string]: string;
};

class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      searchValue: '',
      images: [],
    };
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handleSearchBarSubmit = this.handleSearchBarSubmit.bind(this);
  }

  handleSearchBarChange(value: string) {
    this.setState({ searchValue: value });
  }

  handleSearchBarSubmit() {
    this.fetchImages();
  }

  async fetchImages() {
    const searchValue = this.state.searchValue;

    const url = new URL('https://www.flickr.com/services/rest');

    const params: SearchParams = {
      method: 'flickr.photos.search',
      api_key: API_KEY,
      tags: searchValue,
      extras: 'url_n,owner_name,date_taken,views',
      page: '1',
      format: 'json',
      nojsoncallback: '1',
      sort: 'interestingness-desc',
      per_page: '100',
    };

    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
    // const response = await fetch(
    //   `https://www.flickr.com/services/rest?method=flickr.photos.search&api_key=${API_KEY}&tags=${searchValue}&sort=interestingness-desc&extras=url_h,owner_name,date_taken,views&format=json&nojsoncallback=1&per_page=50&page=1`
    // );
    const response = await fetch(url.href);
    let fetchedImages = await response.json();
    fetchedImages = fetchedImages.photos.photo.filter((item: Image) => item.url_n);

    this.setState({
      images: fetchedImages,
    });
  }

  async componentDidMount() {
    const localStorageValue = localStorage.getItem('searchValue');
    if (localStorageValue) {
      await this.setState({ searchValue: localStorageValue });
    }
    this.fetchImages();
  }

  componentWillUnmount() {
    localStorage.setItem('searchValue', this.state.searchValue);
  }

  render() {
    return (
      <div data-testid="home-page">
        <SearchBar
          searchValue={this.state.searchValue}
          onSearchBarChange={this.handleSearchBarChange}
          onSearchBarSubmit={this.handleSearchBarSubmit}
        />
        <Cards cards={this.state.images} />
        {/* <ImageDetail /> */}
      </div>
    );
  }
}

export default HomePage;
