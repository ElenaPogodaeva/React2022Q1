import { render } from '@testing-library/react';
import Form from './Form';

const setValues = jest.fn();

describe('Form component', () => {
  it('Form renders', () => {
    const { getByTestId } = render(<Form setValues={setValues} />);
    const form = getByTestId('form');
    expect(form).toBeInTheDocument();
  });
});
