import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AboutPage from './pages/AboutPage/AboutPage';
import Layout from './components/Layout/Layout';
import FormPage from './pages/FormPage/FormPage';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchImages, setSearchValue } from './features/searchSlice';

export const App = () => {
  const { searchValue, sortBy, resultsPerPage, currentPage } = useAppSelector(
    (state) => state.search
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localStorageValue = localStorage.getItem('searchValue');
    if (localStorageValue) {
      //dispatch({ type: ActionType.SetSearchValue, payload: localStorageValue });
      //fetchImages(localStorageValue, sortBy, resultsPerPage, currentPage);
      dispatch(setSearchValue(localStorageValue));
      dispatch(
        fetchImages({ searchValue: localStorageValue, sortBy, resultsPerPage, currentPage })
      );
    } else {
      //fetchImages('nature,flowers', sortBy, resultsPerPage, currentPage);
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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
