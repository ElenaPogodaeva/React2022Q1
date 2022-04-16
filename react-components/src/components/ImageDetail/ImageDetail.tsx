import React from 'react';
import { ImageInfo } from '../../types/types';
import style from './ImageDetail.module.scss';

type CardProps = {
  imageInfo: ImageInfo;
  imageUrl: string;
  handleClose: () => void;
};

type CardState = Record<string, never>;

class ImageDetail extends React.Component<CardProps, CardState> {
  stopPropagation(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
  }

  render() {
    const { title, owner, description, dates, views } = this.props.imageInfo;
    const url = this.props.imageUrl;

    return (
      <div className={style.popup} data-testid="image-detail">
        <div className={style.popupBody} onClick={this.props.handleClose}>
          <div className={style.popupContent} onClick={this.stopPropagation}>
            <img src={url} className={style.popupImg} />
            <h1 className={style.popupTitle}>{title._content}</h1>
            <p className={style.popupText}>By {owner.username}</p>
            <p className={style.popupText}>Taken on {dates.taken}</p>
            <p className={style.popupText}>Views: {views}</p>
            <h2 className={style.popupSubtitle}>Description</h2>
            <p
              className={style.popupDesc}
              dangerouslySetInnerHTML={{ __html: description._content }}
            ></p>
            <button className={style.closeBtn} onClick={this.props.handleClose}></button>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageDetail;
