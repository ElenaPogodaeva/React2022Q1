import React, { useCallback, useEffect, useState } from 'react';
import Card from '../Card/Card';
import { Image, ImageInfo, ImageSize, SearchInfoParams } from '../../types/types';
import style from './Cards.module.scss';
import ImageDetail from '../ImageDetail/ImageDetail';
import Spinner from '../Spinner/Spinner';
import { flickr } from '../../common/flickr';

type CardsProps = {
  cards: Image[];
};

export const Cards = ({ cards }: CardsProps) => {
  const [currentImageId, setCurrentImageId] = useState('');
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchImageInfo = async () => {
    const params: SearchInfoParams = {
      photo_id: currentImageId,
    };
    try {
      const fetchedImageInfo = await flickr('photos.getInfo', params);
      setImageInfo(fetchedImageInfo.photo);
    } catch (err) {
      console.log('Error');
      console.error(err);
    }
  };

  const fetchImageSizes = async () => {
    const params: SearchInfoParams = {
      photo_id: currentImageId,
    };
    try {
      const fetchedImageSizes = await flickr('photos.getSizes', params);
      const sizes = fetchedImageSizes.sizes.size;

      setImageUrl(
        sizes.reverse().filter((s: ImageSize) => s.label === 'Small' || s.label === 'Large')[0]
          .source
      );
    } catch (err) {
      console.error(err);
    }
  };

  // const fetchData = useCallback(async () => {
  //   await fetchImageInfo();
  //   await fetchImageSizes();
  //   setIsLoading(false);
  // }, [currentImageId]);

  // const fetchData = useCallback( async () => {
  //   console.log('usecallback');
  //
  //   if (currentImageId) {
  //     setIsLoading(true);
  //    await fetchImageInfo();
  //    await fetchImageSizes();
  //   setIsLoading(false);
  //   }
  // }, [currentImageId]);

  const fetchData = async () => {
    if (currentImageId) {
      setIsLoading(true);
      await fetchImageInfo();
      await fetchImageSizes();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log('useeffect');
    console.log(currentImageId);
    console.log(isLoading);
  }, [currentImageId, viewerIsOpen]);

  const handleClick = (id: string) => {
    setCurrentImageId(id);

    setViewerIsOpen(true);
    setIsLoading(true);
    console.log(currentImageId);
  };

  const handleClose = () => {
    setViewerIsOpen(false);
  };

  if (!cards.length) return null;

  return (
    <>
      <div className={style.cards} data-testid="cards">
        {cards && cards.map((card) => <Card key={card.id} card={card} handleClick={handleClick} />)}
      </div>
      {viewerIsOpen && isLoading && <Spinner />}
      {viewerIsOpen && !isLoading && (
        <ImageDetail
          imageInfo={imageInfo as ImageInfo}
          imageUrl={imageUrl}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

// class Cards extends React.Component<CardsProps, CardsState> {
//   constructor(props: CardsProps) {
//     super(props);
//     this.state = {
//       currentImageId: '',
//       imageInfo: null,
//       imageUrl: '',
//       viewerIsOpen: false,
//       isLoading: true,
//     };
//     this.handleClick = this.handleClick.bind(this);
//     this.handleClose = this.handleClose.bind(this);
//   }

//   async fetchImageInfo() {
//     const currentId = this.state.currentImageId;

//     const params: SearchInfoParams = {
//       photo_id: currentId,
//     };

//     try {
//       const fetchedImageInfo = await flickr('photos.getInfo', params);
//       this.setState({
//         imageInfo: fetchedImageInfo.photo,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   async fetchImageSizes() {
//     const currentId = this.state.currentImageId;

//     const params: SearchInfoParams = {
//       photo_id: currentId,
//     };

//     try {
//       const fetchedImageSizes = await flickr('photos.getSizes', params);
//       const sizes = fetchedImageSizes.sizes.size;

//       this.setState({
//         imageUrl: sizes
//           .reverse()
//           .filter((s: ImageSize) => s.label === 'Small' || s.label === 'Large')[0].source,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   async handleClick(id: string) {
//     await this.setState({
//       currentImageId: id,
//       viewerIsOpen: true,
//       isLoading: true,
//     });
//     await this.fetchImageInfo();
//     await this.fetchImageSizes();
//     await this.setState({
//       isLoading: false,
//     });
//   }

//   handleClose() {
//     this.setState({
//       viewerIsOpen: false,
//     });
//   }

//   render() {
//     if (!this.props.cards.length) return null;

//     return (
//       <>
//         <div className={style.cards} data-testid="cards">
//           {this.props.cards &&
//             this.props.cards.map((card) => (
//               <Card key={card.id} card={card} handleClick={this.handleClick} />
//             ))}
//         </div>
//         {this.state.viewerIsOpen && this.state.isLoading && <Spinner />}
//         {this.state.viewerIsOpen && !this.state.isLoading && (
//           <ImageDetail
//             imageInfo={this.state.imageInfo as ImageInfo}
//             imageUrl={this.state.imageUrl}
//             handleClose={this.handleClose}
//           />
//         )}
//       </>
//     );
//   }
// }

export default Cards;
