import { render } from '@testing-library/react';
import Cards from './Cards';

const mockResponse = [
  {
    id: '51997149627',
    owner: '15339304@N06',
    secret: '019125af5f',
    server: '65535',
    farm: 66,
    title: '7K8A8825',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0,
    datetaken: '2022-03-25 08:58:40',
    datetakengranularity: 0,
    datetakenunknown: 0,
    ownername: 'rpealit',
    views: 0,
    url_n: 'https://live.staticflickr.com/65535/51997149627_019125af5f_n.jpg',
    height_n: '202',
    width_n: '320',
  },
  {
    id: '51997148422',
    owner: '15339304@N06',
    secret: '5241706f03',
    server: '65535',
    farm: 66,
    title: '7K8A8822',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0,
    datetaken: '2022-03-25 08:57:47',
    datetakengranularity: 0,
    datetakenunknown: 0,
    ownername: 'rpealit',
    views: 0,
    url_n: 'https://live.staticflickr.com/65535/51997148422_5241706f03_n.jpg',
    height_n: '212',
    width_n: '320',
  },
  {
    id: '51998153496',
    owner: '15339304@N06',
    secret: '6836c7c666',
    server: '65535',
    farm: 66,
    title: '7K8A8814',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0,
    datetaken: '2022-03-25 08:57:05',
    datetakengranularity: 0,
    datetakenunknown: 0,
    ownername: 'rpealit',
    views: 0,
    url_n: 'https://live.staticflickr.com/65535/51998153496_6836c7c666_n.jpg',
    height_n: '174',
    width_n: '320',
  },
  {
    id: '51998203123',
    owner: '15339304@N06',
    secret: '901b4b1b2c',
    server: '65535',
    farm: 66,
    title: '7K8A8810',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0,
    datetaken: '2022-03-25 08:55:21',
    datetakengranularity: 0,
    datetakenunknown: 0,
    ownername: 'rpealit',
    views: 1,
    url_n: 'https://live.staticflickr.com/65535/51998203123_901b4b1b2c_n.jpg',
    height_n: '213',
    width_n: '320',
  },
  {
    id: '51998398294',
    owner: '132777550@N02',
    secret: '9916ab058e',
    server: '65535',
    farm: 66,
    title: 'Speckled Wood',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0,
    datetaken: '2022-04-11 10:46:01',
    datetakengranularity: 0,
    datetakenunknown: 0,
    ownername: 'davidhampton1066',
    views: 2,
    url_n: 'https://live.staticflickr.com/65535/51998398294_9916ab058e_n.jpg',
    height_n: '240',
    width_n: '320',
  },
];

describe('Cards component', () => {
  it('Cards renders', () => {
    const { getByTestId } = render(<Cards cards={mockResponse} />);
    const cards = getByTestId('cards');
    expect(cards).toBeDefined();
  });
  it('Cards renders without data', () => {
    const { queryByTestId } = render(<Cards cards={[]} />);
    const cards = queryByTestId('cards');
    expect(cards).toBeNull();
  });
  it('Cards snapshot', () => {
    const cards = render(<Cards cards={mockResponse} />);
    expect(cards).toMatchSnapshot();
  });
  it('Cards empty snapshot', () => {
    const cards = render(<Cards cards={[]} />);
    expect(cards).toMatchSnapshot();
  });
});
