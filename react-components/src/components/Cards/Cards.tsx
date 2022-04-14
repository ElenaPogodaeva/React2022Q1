import React from 'react';
import Card from '../Card/Card';
import { Image, ImageInfo, ImageSize, SearchInfoParams } from '../../types/types';
import style from './Cards.module.scss';
import ImageDetail from '../ImageDetail/ImageDetail';
import Spinner from '../Spinner/Spinner';
import { flickr } from '../../common/flickr';

type CardsProps = {
  cards: Image[];
};

type CardsState = {
  currentImageId: string;
  imageInfo: ImageInfo | null;
  imageUrl: string;
  viewerIsOpen: boolean;
  isLoading: boolean;
};

class Cards extends React.Component<CardsProps, CardsState> {
  constructor(props: CardsProps) {
    super(props);
    this.state = {
      currentImageId: '',
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
    const currentId = this.state.currentImageId;

    const params: SearchInfoParams = {
      photo_id: currentId,
    };

    try {
      const fetchedImageInfo = await flickr('photos.getInfo', params);
      this.setState({
        imageInfo: fetchedImageInfo.photo,
      });
    } catch (err) {
      console.error(err);
    } finally {
      // this.setState({
      //   isLoading: false,
      // });
    }
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
    const currentId = this.state.currentImageId;

    const params: SearchInfoParams = {
      photo_id: currentId,
    };

    try {
      const fetchedImageSizes = await flickr('photos.getSizes', params);
      const sizes = fetchedImageSizes.sizes.size;

      this.setState({
        imageUrl: sizes
          .reverse()
          .filter((s: ImageSize) => s.label === 'Small' || s.label === 'Large')[0].source,
        //isLoading: false,
      });
    } catch (err) {
      console.error(err);
    } finally {
      // this.setState({
      //   isLoading: false,
      // });
    }

    //Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
    // const response = await fetch(
    //   `https://www.flickr.com/services/rest?method=flickr.photos.search&api_key=${API_KEY}&tags=${searchValue}&sort=interestingness-desc&extras=url_h,owner_name,date_taken,views&format=json&nojsoncallback=1&per_page=50&page=1`
    // );
    // const response = await fetch(url.href);
    // const fetchedImageSizes = await response.json();
    // //fetchedImageInfo = fetchedImageInfo.photo;//filter((item: Image) => item.url_n);
    // const sizes = fetchedImageSizes.sizes.size;
    // console.log(sizes);
  }

  async handleClick(id: string) {
    await this.setState({
      currentImageId: id,
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
          this.state.isLoading ? (
            <Spinner />
          ) : (
            <ImageDetail
              imageInfo={this.state.imageInfo as ImageInfo}
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
