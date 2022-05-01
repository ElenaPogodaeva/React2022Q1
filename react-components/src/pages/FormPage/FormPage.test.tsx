import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormPage from './FormPage';

describe('FormPage component', () => {
  it('should render user card', async () => {
    const { getByPlaceholderText, getByTestId } = render(<FormPage />);
    const firstNameInput = getByPlaceholderText('First name');
    const lastNameInput = getByPlaceholderText('Last name');
    const agreeInput = getByTestId('agree');
    const birthDateInput = getByTestId('birthDate');

    userEvent.type(firstNameInput, 'name');
    userEvent.type(lastNameInput, 'surname');
    userEvent.type(birthDateInput, '2022-04-04');
    userEvent.click(agreeInput);

    const btn = getByTestId('formSubmit');
    userEvent.click(btn);

    const card = await screen.findByTestId('user-card');
    expect(card).toBeInTheDocument();
  });

  it('should show an error for empty input fields', async () => {
    const { getByTestId, getByPlaceholderText, findByTestId } = render(<FormPage />);
    const firstNameInput = getByPlaceholderText('First name');
    userEvent.type(firstNameInput, 'name');

    const btn = getByTestId('formSubmit');
    userEvent.click(btn);

    expect(await findByTestId('errorLastName')).toBeInTheDocument();
    expect(await findByTestId('errorBirthDate')).toBeInTheDocument();
    expect(await findByTestId('errorAgree')).toBeInTheDocument();
  });
});
