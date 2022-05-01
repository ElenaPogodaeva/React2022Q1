import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GlobalState from '../../context/GlobalState';

import HomePage from './HomePage';

const fakeLocalStorage = (function () {
  let store: { [key: string]: string };

  return {
    getItem: jest.fn(function (key: string) {
      return store[key] || null;
    }),
    setItem: jest.fn(function (key: string, value: string) {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(function (key: string) {
      delete store[key];
    }),
    clear: jest.fn(function () {
      store = {};
    }),
  };
})();

describe('HomePage', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    });
  });

  it('Should call localStorage getItem on render', () => {
    render(<GlobalState />);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(5);
  });
  it('Should call localStorage setItem on unmount', () => {
    const { unmount } = render(<HomePage />);

    const input = screen.getByPlaceholderText(/Search/i);
    userEvent.type(input, 'fake-value');

    unmount();

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('searchValue', 'fake-value');
  });

  it('Should fetch and display images', async () => {
    const { findByText } = render(<HomePage />);

    expect(await findByText('Image1')).toBeInTheDocument();
  });

  it('Should fetch and display images after search button clicked', async () => {
    const { findByText } = render(<HomePage />);

    const input = screen.getByPlaceholderText(/Search/i);
    userEvent.type(input, 'value');
    const btn = screen.getByTestId('search-btn');
    userEvent.click(btn);

    expect(await findByText('Image1')).toBeInTheDocument();
  });
});
