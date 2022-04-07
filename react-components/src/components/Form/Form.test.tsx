import { render } from '@testing-library/react';
import Form from './Form';

const setFormValues = jest.fn();

describe('Form component', () => {
  it('Form renders', () => {
    const { getByTestId } = render(<Form setFormValues={setFormValues} />);
    const form = getByTestId('form');
    expect(form).toBeInTheDocument();
  });
});
