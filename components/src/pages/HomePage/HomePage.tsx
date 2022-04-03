import React from 'react';
import Cards from '../../components/Cards/Cards';
import SearchBar from '../../components/SearchBar/SearchBar';

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
    author: 'Jonathan Falcon',
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

class HomePage extends React.Component {
  render() {
    return (
      <div data-testid="home-page">
        <SearchBar />
        <Cards cards={propsValues} />
      </div>
    );
  }
}

export default HomePage;
