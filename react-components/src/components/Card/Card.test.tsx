import { render } from '@testing-library/react';
import Card from './Card';

const mockResponse = {
  id: '51997149627',
  owner: '15339304@N06',
  title: '7K8A8825',
  datetaken: '2022-03-25 08:58:40',
  ownername: 'rpealit',
  views: 0,
  url_n: 'https://live.staticflickr.com/65535/51997149627_019125af5f_n.jpg',
  height_n: '202',
  width_n: '320',
};

const onClick = jest.fn();

describe('Card component', () => {
  it('Card renders', () => {
    const { getByTestId } = render(<Card card={mockResponse} handleClick={onClick} />);
    const card = getByTestId('card');
    expect(card).toBeDefined();
  });
});
