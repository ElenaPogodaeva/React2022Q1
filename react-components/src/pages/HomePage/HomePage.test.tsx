import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    render(<HomePage />);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });
  it('Should call localStorage setItem on unmount', () => {
    const { unmount } = render(<HomePage />);

    const input = screen.getByPlaceholderText(/Search/i);
    userEvent.type(input, 'fake-value');

    unmount();

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('searchValue', 'fake-value');
  });
});
