import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

const onChange = jest.fn();

describe('Search component', () => {
  it('Search renders', () => {
    render(<SearchBar searchValue="" onSearchBarChange={onChange} />);

    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
  });

  it('Typing in SearchBar works', () => {
    render(<SearchBar searchValue="" onSearchBarChange={onChange} />);

    expect(screen.queryByDisplayValue(/React/)).toBeNull();

    userEvent.type(screen.getByRole('textbox'), 'React');

    expect(screen.queryByDisplayValue(/React/)).toBeInTheDocument();
  });
});
