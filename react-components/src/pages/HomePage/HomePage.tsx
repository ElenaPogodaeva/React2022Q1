import React, { useEffect, useRef, useState } from 'react';
import Cards from '../../components/Cards/Cards';
import SearchBar from '../../components/SearchBar/SearchBar';
import Spinner from '../../components/Spinner/Spinner';
import { Image, SearchImagesParams } from '../../types/types';
import { flickr } from '../../common/flickr';

export const HomePage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const searchValueRef = useRef('');
  searchValueRef.current = searchValue;

  const fetchImages = async (searchValue: string) => {
    setIsLoading(true);
    const params: SearchImagesParams = {
      tags: searchValue,
      extras: 'url_n,owner_name,date_taken,views',
      page: '1',
      sort: 'interestingness-desc',
      per_page: '100',
    };

    try {
      const fetchedImages = await flickr('photos.search', params);
      setImages(fetchedImages.photos.photo.filter((item: Image) => item.url_n));
      setError(null);
    } catch (err) {
      setImages([]);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const localStorageValue = localStorage.getItem('searchValue');
    if (localStorageValue) {
      setSearchValue(localStorageValue);
      fetchImages(localStorageValue);
    } else {
      fetchImages('nature,flowers');
    }

    // return () => {
    //   console.log('unmount');
    //   localStorage.setItem('searchValue', searchValueRef.current as string);
    // };
  }, []);

  useEffect(() => {
    return () => {
      console.log('unmount');
      localStorage.setItem('searchValue', searchValue);
    };
  }, [searchValue]);

  const handleSearchBarChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchBarSubmit = () => {
    fetchImages(searchValue);
  };

  const notFound = !error && !isLoading && images.length === 0 ? 'Nothing found' : null;

  return (
    <div data-testid="home-page">
      <SearchBar
        searchValue={searchValue}
        onSearchBarChange={handleSearchBarChange}
        onSearchBarSubmit={handleSearchBarSubmit}
      />
      {error && <div>Error occured</div>}
      {isLoading ? <Spinner /> : <Cards cards={images} />}
      {notFound}
    </div>
  );
};

// class HomePage extends React.Component<HomePageProps, HomePageState> {
//   constructor(props: HomePageProps) {
//     super(props);
//     this.state = {
//       searchValue: '',
//       images: [],
//       isLoading: true,
//       error: null,
//     };
//     this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
//     this.handleSearchBarSubmit = this.handleSearchBarSubmit.bind(this);
//   }

//   async fetchImages(searchValue: string) {
//     this.setState({
//       isLoading: true,
//     });

//     const params: SearchImagesParams = {
//       tags: searchValue,
//       extras: 'url_n,owner_name,date_taken,views',
//       page: '1',
//       sort: 'interestingness-desc',
//       per_page: '100',
//     };

//     try {
//       const fetchedImages = await flickr('photos.search', params);

//       this.setState({
//         images: fetchedImages.photos.photo.filter((item: Image) => item.url_n),
//       });
//       this.setState({
//         error: null,
//       });
//     } catch (err) {
//       this.setState({
//         images: [],
//       });
//       this.setState({
//         error: err as Error,
//       });
//     } finally {
//       this.setState({
//         isLoading: false,
//       });
//     }
//   }

//   handleSearchBarChange(value: string) {
//     this.setState({ searchValue: value });
//   }

//   handleSearchBarSubmit() {
//     this.fetchImages(this.state.searchValue);
//   }

//   async componentDidMount() {
//     const localStorageValue = localStorage.getItem('searchValue');
//     if (localStorageValue) {
//       await this.setState({ searchValue: localStorageValue });
//       await this.fetchImages(this.state.searchValue);
//     } else {
//       await this.fetchImages('nature,flowers');
//     }
//   }

//   componentWillUnmount() {
//     localStorage.setItem('searchValue', this.state.searchValue);
//   }

//   render() {
//     const images = this.state.images;
//     const isLoading = this.state.isLoading;
//     const error = this.state.error;
//     const notFound = !error && !isLoading && images.length === 0 ? 'Nothing found' : null;

//     return (
//       <div data-testid="home-page">
//         <SearchBar
//           searchValue={this.state.searchValue}
//           onSearchBarChange={this.handleSearchBarChange}
//           onSearchBarSubmit={this.handleSearchBarSubmit}
//         />
//         {error && <div>Error occured</div>}
//         {isLoading ? <Spinner /> : <Cards cards={this.state.images} />}
//         {notFound}
//       </div>
//     );
//   }
// }

export default HomePage;
