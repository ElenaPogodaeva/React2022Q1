import React from 'react';
import { Image } from '../../types/types';
import style from './Card.module.scss';

type CardProps = Image;
type CardState = Record<string, never>;

class Card extends React.Component<CardProps, CardState> {
  render() {
    return (
      <div className={style.card} data-testid="card">
        <img src={this.props.url_n} className={style.cardImg} />
        <div className={style.cardBody}>
          <p className={style.cardTitle}>{this.props.title}</p>
          <p className={style.cardOwner}>By {this.props.ownername}</p>
          <div className={style.cardDateViewWrapper}>
            <p className={style.cardDate}>{this.props.datetaken}</p>
            <div className={style.cardViews}>
              <div className={style.cardViewsImg}></div>
              {this.props.views}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
