import React from 'react';
import { Image } from '../../types/types';
import style from './Card.module.scss';

type CardProps = {
  card: Image;
  handleClick: (id: string) => void;
};

type CardState = Record<string, never>;

class Card extends React.Component<CardProps, CardState> {
  render() {
    const { id, url_n, title, ownername, datetaken, views } = this.props.card;
    return (
      <div className={style.card} data-testid="card" onClick={() => this.props.handleClick(id)}>
        <img src={url_n} className={style.cardImg} />
        <div className={style.cardBody}>
          <p className={style.cardTitle}>{title}</p>
          <p className={style.cardOwner}>By {ownername}</p>
          <div className={style.cardDateViewWrapper}>
            <p className={style.cardDate}>{datetaken}</p>
            <div className={style.cardViews}>
              <div className={style.cardViewsImg}></div>
              {views}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
