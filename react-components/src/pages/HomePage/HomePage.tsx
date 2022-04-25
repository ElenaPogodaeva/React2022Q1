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
      per_page: '30',
    };

    try {
      const fetchedImages = await flickr('photos.search', params);
      setImages(fetchedImages.photos.photo.filter((item: Image) => item.url_n));
      setError(null);
    } catch (err) {
      setImages([]);
      setError(err as Error);
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

    return () => {
      localStorage.setItem('searchValue', searchValueRef.current as string);
    };
  }, []);

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

export default HomePage;
