import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

const onChange = jest.fn();
const onSumbit = jest.fn();

describe('Search component', () => {
  it('Search renders', () => {
    render(<SearchBar />);

    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
  });

  it('onChange works', () => {
    render(<SearchBar />);

    userEvent.type(screen.getByRole('textbox'), 'React');

    expect(onChange).toHaveBeenCalledTimes(5);
  });
});
