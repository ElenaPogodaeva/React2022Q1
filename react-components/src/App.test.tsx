import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

test('Router test', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const homeLink = screen.getByTestId('home-link');
  const aboutLink = screen.getByTestId('about-link');
  userEvent.click(aboutLink);
  expect(screen.getByTestId('about-page')).toBeInTheDocument();
  userEvent.click(homeLink);
  expect(screen.getByTestId('home-page')).toBeInTheDocument();
});

test('Error page test', () => {
  render(
    <MemoryRouter initialEntries={['/asdfgfhf']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
});
