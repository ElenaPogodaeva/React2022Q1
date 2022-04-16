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
    }
  }

  async fetchImageSizes() {
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
      });
    } catch (err) {
      console.error(err);
    }
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
