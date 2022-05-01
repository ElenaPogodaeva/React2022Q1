import React, { useContext, useEffect, useRef } from 'react';
import Cards from '../../components/Cards/Cards';
import SearchBar from '../../components/SearchBar/SearchBar';
import Spinner from '../../components/Spinner/Spinner';
import { Image, SearchImagesParams } from '../../types/types';
import { flickr } from '../../common/flickr';
import Pagination from '../../components/Pagination/Pagination';
import { AppContext } from '../../context/context';
import SearchOptions from '../../components/SearchOptions/SearchOptions';

export const HomePage = () => {
  // const [searchValue, setSearchValue] = useState('');
  // const [isLoading, setIsLoading] = useState(true);
  // const [images, setImages] = useState<Image[]>([]);
  // const [error, setError] = useState<Error | null>(null);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const [maxPageLimit, setMaxPageLimit] = useState(5);
  // const [minPageLimit, setMinPageLimit] = useState(0);
  // const pageNumberLimit = 5;

  const { state } = useContext(AppContext);
  const { searchValue, images, error, isLoading } = state;

  const searchValueRef = useRef('');
  searchValueRef.current = searchValue;

  // const fetchImages = async (searchValue: string) => {
  //   setIsLoading(true);
  //   const params: SearchImagesParams = {
  //     tags: searchValue,
  //     extras: 'url_n,owner_name,date_taken,views',
  //     page: currentPage.toString(), //'1',
  //     sort: 'interestingness-desc',
  //     per_page: '30',
  //   };

  //   try {
  //     const fetchedImages = await flickr('photos.search', params);
  //     setImages(fetchedImages.photos.photo.filter((item: Image) => item.url_n));
  //     setTotalPages(fetchedImages.photos.pages);
  //     setError(null);
  //   } catch (err) {
  //     setImages([]);
  //     setError(err as Error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    return () => {
      localStorage.setItem('searchValue', searchValueRef.current as string);
    };
  }, []);

  // const handleSearchBarChange = (value: string) => {
  //   setSearchValue(value);
  // };

  // const handleSearchBarSubmit = () => {
  //   fetchImages(searchValue);
  //   setCurrentPage(1);
  //   setMaxPageLimit(5);
  //   setMinPageLimit(0);
  // };

  // const onPageChange = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  // };

  // const onPrevClick = () => {
  //   if ((currentPage - 1) % pageNumberLimit === 0) {
  //     setMaxPageLimit(maxPageLimit - pageNumberLimit);
  //     setMinPageLimit(minPageLimit - pageNumberLimit);
  //   }
  //   setCurrentPage((prev) => prev - 1);
  // };

  // const onNextClick = () => {
  //   if (currentPage + 1 > maxPageLimit) {
  //     setMaxPageLimit(maxPageLimit + pageNumberLimit);
  //     setMinPageLimit(minPageLimit + pageNumberLimit);
  //   }
  //   setCurrentPage((prev) => prev + 1);
  // };

  // const paginationAttributes = {
  //   currentPage,
  //   maxPageLimit,
  //   minPageLimit,
  //   totalPages,
  // };

  const notFound = !error && !isLoading && images.length === 0 ? 'Nothing found' : null;

  return (
    <div data-testid="home-page">
      <SearchBar />
      <SearchOptions />
      {error && <div>{error}</div>}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Cards cards={images} />
          <Pagination />
        </>
      )}
      {notFound}
    </div>
  );
};

export default HomePage;
