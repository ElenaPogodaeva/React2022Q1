import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('Search component', () => {
  it('Search renders', () => {
    render(<SearchBar />);

    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
  });
});
