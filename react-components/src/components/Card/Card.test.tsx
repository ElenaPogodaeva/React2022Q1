import { render } from '@testing-library/react';
import Card from './Card';

const propValue = {
  id: '1',
  title: 'Portrait of a cat looking at the camera',
  author: 'Lloyd Henneman',
  url: '',
  date: 'March 26th, 2022',
  views: '1000',
  likes: '500',
  dislikes: '200',
  comments: '100',
};

describe('Card component', () => {
  it('Card renders', () => {
    const { getByTestId } = render(<Card {...propValue} />);
    const card = getByTestId('card');
    expect(card).toBeDefined();
  });
});
