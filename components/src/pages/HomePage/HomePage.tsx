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

type HomePageProps = Record<string, never>; //{
// props: Record<string, never>;
//};
type HomePageState = {
  searchValue: string;
};

class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      searchValue: '',
    };
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
  }

  handleSearchBarChange(value: string) {
    this.setState({ searchValue: value });
  }

  componentDidMount() {
    this.setState({ searchValue: localStorage.getItem('searchValue') || '' });
  }

  componentWillUnmount() {
    localStorage.setItem('searchValue', this.state.searchValue);
  }

  render() {
    return (
      <div>
        <SearchBar
          searchValue={this.state.searchValue}
          onSearchBarChange={this.handleSearchBarChange}
        />
        <Cards cards={propsValues} />
      </div>
    );
  }
}

export default HomePage;
