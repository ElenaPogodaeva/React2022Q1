import React from 'react';

import style from './Card.module.scss';

type CardProps = {
  id: string;
  title: string;
  author: string;
  url: string;
  date: string;
  views: string;
  likes: string;
  dislikes: string;
  comments: string;
};

type CardState = Record<string, never>;
//`../../assets/img/${this.props.id}.jpg`
class Card extends React.Component<CardProps, CardState> {
  render() {
    return (
      <div className={style.card}>
        <img src={require(`../../../public/img/${this.props.id}.jpg`)} className={style.cardImg} />
        <div className={style.cardBody}>
          <p className={style.cardTitle}>{this.props.title}</p>
          <p className={style.cardOwner}>By {this.props.author}</p>
          <div className={style.cardDateViewWrapper}>
            <p className={style.cardDate}>{this.props.date}</p>
            <p className={style.cardViews}>Views: {this.props.views}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
