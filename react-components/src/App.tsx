import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AboutPage from './pages/AboutPage/AboutPage';
import Layout from './components/Layout/Layout';
import FormPage from './pages/FormPage/FormPage';
import { useAppDispatch, useAppSelector } from './hooks';
import { setSearchValue } from './features/searchSlice';
import ImageDetail from './components/ImageDetail/ImageDetail';
import { fetchImages } from './features/thunks';

export const App = () => {
  const { searchValue, sortBy, resultsPerPage, currentPage } = useAppSelector(
    (state) => state.search
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localStorageValue = localStorage.getItem('searchValue');
    if (localStorageValue) {
      dispatch(setSearchValue(localStorageValue));
      dispatch(
        fetchImages({ searchValue: localStorageValue, sortBy, resultsPerPage, currentPage })
      );
    } else {
      dispatch(setSearchValue('nature,flowers'));
      dispatch(fetchImages({ searchValue: 'nature,flowers', sortBy, resultsPerPage, currentPage }));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchImages({ searchValue, sortBy, resultsPerPage, currentPage }));
  }, [sortBy, resultsPerPage, currentPage]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="form" element={<FormPage />} />
          <Route path="images/:currentImageId" element={<ImageDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
