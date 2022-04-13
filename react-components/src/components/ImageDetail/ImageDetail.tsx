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
  render() {
    const { title, owner, description, dates, views } = this.props.imageInfo;
    //const comments = this.props.imageComments;
    const url = this.props.imageUrl;

    return (
      <div className={style.popup} data-testid="image-detail">
        <div className={style.popupBody}>
          <div className={style.popupContent}>
            <img src={url} className={style.popupImg} />
            <h1 className={style.popupTitle}>{title._content}</h1>
            <p className={style.popupOwner}>By {owner.username}</p>
            <p className={style.popupDate}>Taken on {dates.taken}</p>
            <p className={style.popupDate}>Views: {views}</p>
            <h2 className={style.popupSubtitle}>Description</h2>
            <p className={style.popupText}>{description._content}</p>
            {/* <ul className={style.tagList}>
              {comments &&
                comments.map((comment) => (
                  <li key={comment.id}>
                    <p>{comment.authorname}</p>
                    <p>{comment._content}</p>
                  </li>
                ))}
            </ul> */}
            <button className={style.closeBtn} onClick={this.props.handleClose}></button>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageDetail;
