import { render } from '@testing-library/react';
import Cards from './Cards';

const propsValues = [
  {
    id: '1',
    title: 'Portrait of a cat looking at the camera',
    author: 'Lloyd Henneman',
    url: '',
    date: 'March 26th, 2022',
    views: '1000',
    likes: '500',
    dislikes: '200',
    comments: '100',
  },
  {
    id: '2',
    title: 'Gray cat',
    author: 'Max Baskakov',
    url: '',
    date: 'March 26th, 2022',
    views: '1000',
    likes: '500',
    dislikes: '200',
    comments: '100',
  },
  {
    id: '3',
    title: 'Stretching in the morning',
    author: 'Timo Volz',
    url: '',
    date: 'March 26th, 2022',
    views: '1000',
    likes: '500',
    dislikes: '200',
    comments: '100',
  },
  {
    id: '4',
    title: 'Gray cat with flowers',
    author: 'Milada Vigerova',
    url: '',
    date: 'March 28th, 2022',
    views: '1000',
    likes: '500',
    dislikes: '200',
    comments: '100',
  },
  {
    id: '5',
    title: 'Kitten',
    author: 'Alvan Nee',
    url: '',
    date: 'March 28th, 2022',
    views: '1000',
    likes: '500',
    dislikes: '200',
    comments: '100',
  },
  {
    id: '6',
    title: 'Two kittens sitting in a basket',
    author: 'Amy Baugess',
    url: '',
    date: 'March 28th, 2022',
    views: '1000',
    likes: '500',
    dislikes: '200',
    comments: '100',
  },
  {
    id: '7',
    title: 'Red cat lying on a wooden floor',
    author: 'Michael Sum',
    url: '',
    date: 'March 28th, 2022',
    views: '1000',
    likes: '500',
    dislikes: '200',
    comments: '100',
  },
  {
    id: '8',
    title: 'Yawn cat',
    author: 'Loan',
    url: '',
    date: 'March 28th, 2022',
    views: '1000',
    likes: '500',
    dislikes: '200',
    comments: '100',
  },
];

describe('Cards component', () => {
  it('Cards renders', () => {
    const { getByTestId } = render(<Cards cards={propsValues} />);
    const cards = getByTestId('cards');
    expect(cards).toBeDefined();
  });
  it('Cards renders without data', () => {
    const { queryByTestId } = render(<Cards cards={[]} />);
    const cards = queryByTestId('cards');
    expect(cards).toBeNull();
  });
  it('Cards snapshot', () => {
    const cards = render(<Cards cards={propsValues} />);
    expect(cards).toMatchSnapshot();
  });
  it('Cards empty snapshot', () => {
    const cards = render(<Cards cards={[]} />);
    expect(cards).toMatchSnapshot();
  });
});
