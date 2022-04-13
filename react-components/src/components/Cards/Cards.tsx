import React from 'react';
import Card from '../Card/Card';
import { Image, ImageInfo, ImageSize } from '../../types/types';
import style from './Cards.module.scss';
import ImageDetail from '../ImageDetail/ImageDetail';
import Spinner from '../Spinner/Spinner';

const API_KEY = '76f2ad1b1c2bc03737c9a268bb694c82';

type CardsProps = {
  cards: Image[];
};

type CardsState = {
  //state: Record<string, never>;
  currentId: string;
  imageInfo: ImageInfo | null;
  imageUrl: string;
  viewerIsOpen: boolean;
  isLoading: boolean;
};

type SearchParams = {
  method: string;
  api_key: string;
  photo_id: string;
  format: string;
  nojsoncallback: string;
  [key: string]: string;
};

class Cards extends React.Component<CardsProps, CardsState> {
  constructor(props: CardsProps) {
    super(props);
    this.state = {
      currentId: '',
      imageInfo: null,
      imageUrl: '',
      viewerIsOpen: false,
      isLoading: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  async fetchImageInfo() {
    // this.setState({
    //   isLoading: true,
    // });
    const currentId = this.state.currentId;

    const url = new URL('https://www.flickr.com/services/rest');

    const params: SearchParams = {
      method: 'flickr.photos.getInfo',
      api_key: API_KEY,
      photo_id: currentId,
      format: 'json',
      nojsoncallback: '1',
    };

    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
    // const response = await fetch(
    //   `https://www.flickr.com/services/rest?method=flickr.photos.search&api_key=${API_KEY}&tags=${searchValue}&sort=interestingness-desc&extras=url_h,owner_name,date_taken,views&format=json&nojsoncallback=1&per_page=50&page=1`
    // );
    const response = await fetch(url.href);
    const fetchedImageInfo = await response.json();
    //fetchedImageInfo = fetchedImageInfo.photo;//filter((item: Image) => item.url_n);

    this.setState({
      imageInfo: fetchedImageInfo.photo,
      //isLoading: false,
    });
  }

  // async fetchImageComments() {
  //   // this.setState({
  //   //   isLoading: true,
  //   // });
  //   const currentId = this.state.currentId;

  //   const url = new URL('https://www.flickr.com/services/rest');

  //   const params: SearchParams = {
  //     method: 'flickr.photos.comments.getList',
  //     api_key: API_KEY,
  //     photo_id: currentId,
  //     format: 'json',
  //     nojsoncallback: '1',
  //   };

  //   Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
  //   // const response = await fetch(
  //   //   `https://www.flickr.com/services/rest?method=flickr.photos.search&api_key=${API_KEY}&tags=${searchValue}&sort=interestingness-desc&extras=url_h,owner_name,date_taken,views&format=json&nojsoncallback=1&per_page=50&page=1`
  //   // );
  //   const response = await fetch(url.href);
  //   const fetchedImageComments = await response.json();
  //   //fetchedImageInfo = fetchedImageInfo.photo;//filter((item: Image) => item.url_n);

  //   this.setState({
  //     imageComments: fetchedImageComments.comments.comment,
  //     //isLoading: false,
  //   });
  // }

  async fetchImageSizes() {
    // this.setState({
    //   isLoading: true,
    // });
    const currentId = this.state.currentId;

    const url = new URL('https://www.flickr.com/services/rest');

    const params: SearchParams = {
      method: 'flickr.photos.getSizes',
      api_key: API_KEY,
      photo_id: currentId,
      format: 'json',
      nojsoncallback: '1',
    };

    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
    // const response = await fetch(
    //   `https://www.flickr.com/services/rest?method=flickr.photos.search&api_key=${API_KEY}&tags=${searchValue}&sort=interestingness-desc&extras=url_h,owner_name,date_taken,views&format=json&nojsoncallback=1&per_page=50&page=1`
    // );
    const response = await fetch(url.href);
    const fetchedImageSizes = await response.json();
    //fetchedImageInfo = fetchedImageInfo.photo;//filter((item: Image) => item.url_n);
    const sizes = fetchedImageSizes.sizes.size;
    console.log(sizes);

    this.setState({
      imageUrl: sizes
        .reverse()
        .filter((s: ImageSize) => s.label === 'Small' || s.label === 'Large')[0].source,
      //isLoading: false,
    });
  }

  async handleClick(id: string) {
    await this.setState({
      currentId: id,
      viewerIsOpen: true,
      isLoading: true,
    });
    await this.fetchImageInfo();
    await this.fetchImageSizes();
    await this.setState({
      isLoading: false,
    });
  }

  handleClose() {
    this.setState({
      viewerIsOpen: false,
    });
  }

  render() {
    const isLoading = this.state.isLoading;
    if (!this.props.cards.length) return null;

    return (
      <>
        <div className={style.cards} data-testid="cards">
          {this.props.cards &&
            this.props.cards.map((card) => (
              <Card key={card.id} card={card} handleClick={this.handleClick} />
            ))}
        </div>
        {this.state.viewerIsOpen ? (
          isLoading ? (
            <Spinner />
          ) : (
            <ImageDetail
              imageInfo={this.state.imageInfo as ImageInfo}
              //imageComments={this.state.imageComments as ImageComment[]}
              imageUrl={this.state.imageUrl}
              handleClose={this.handleClose}
            />
          )
        ) : null}
      </>
    );
  }
}

export default Cards;
