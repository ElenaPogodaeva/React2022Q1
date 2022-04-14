import React from 'react';
import Cards from '../../components/Cards/Cards';
import SearchBar from '../../components/SearchBar/SearchBar';
import Spinner from '../../components/Spinner/Spinner';
import { Image, SearchImagesParams } from '../../types/types';
import { flickr } from '../../common/flickr';

type HomePageProps = Record<string, never>;
type HomePageState = {
  searchValue: string;
  images: Image[];
  isLoading: boolean;
};

class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      searchValue: '',
      images: [],
      isLoading: true,
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

  // async flickr(method: string, params: SearchImageParams) {

  //   const url = new URL('https://www.flickr.com/services/rest');
  //   const flickrParams: SearchParams = {
  //     method: `flickr.${method}`,
  //     api_key: API_KEY,
  //     format: 'json',
  //     nojsoncallback: '1',
  //     ...params,
  //   };
  //   //Object.keys(flickrParams).forEach((key) => url.searchParams.append(key, flickrParams[key]));
  //   url.search = new URLSearchParams(flickrParams).toString();
  //   const response = await fetch(url.href);
  //   const fetchedData = await response.json();
  //   return fetchedData;
  // }

  async fetchImages() {
    this.setState({
      isLoading: true,
    });
    const searchValue = this.state.searchValue;

    //const url = new URL('https://www.flickr.com/services/rest');

    const params: SearchImagesParams = {
      //method: 'flickr.photos.search',
      //api_key: API_KEY,
      tags: searchValue,
      extras: 'url_n,owner_name,date_taken,views',
      page: '1',
      //format: 'json',
      //nojsoncallback: '1',
      sort: 'interestingness-desc',
      per_page: '100',
    };

    //Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
    //url.search = new URLSearchParams(params).toString();
    // const response = await fetch(
    //   `https://www.flickr.com/services/rest?method=flickr.photos.search&api_key=${API_KEY}&tags=${searchValue}&sort=interestingness-desc&extras=url_h,owner_name,date_taken,views&format=json&nojsoncallback=1&per_page=50&page=1`
    // );
    try {
      const fetchedImages = await flickr('photos.search', params);
      //fetchedImages = fetchedImages.photos.photo.filter((item: Image) => item.url_n);

      this.setState({
        images: fetchedImages.photos.photo.filter((item: Image) => item.url_n),
      });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
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
    const isLoading = this.state.isLoading;

    return (
      <div data-testid="home-page">
        <SearchBar
          searchValue={this.state.searchValue}
          onSearchBarChange={this.handleSearchBarChange}
          onSearchBarSubmit={this.handleSearchBarSubmit}
        />

        {isLoading ? <Spinner /> : <Cards cards={this.state.images} />}
      </div>
    );
  }
}

export default HomePage;
