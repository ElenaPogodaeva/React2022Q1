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

class Card extends React.Component<CardProps, CardState> {
  render() {
    return (
      <div className={style.card} data-testid="card">
        <img src={require(`../../../public/img/${this.props.id}.jpg`)} className={style.cardImg} />
        <div className={style.cardBody}>
          <p className={style.cardTitle}>{this.props.title}</p>
          <p className={style.cardOwner}>By {this.props.author}</p>
          <p className={style.cardDate}>{this.props.date}</p>
          <div className={style.cardStatistics}>
            <div className={style.statisticsItem}>
              <div className={`${style.statisticsImg} ${style.statisticsViews}`}></div>
              {this.props.views}
            </div>
            <div className={style.statisticsItem}>
              <div className={`${style.statisticsImg} ${style.statisticsLikes}`}></div>
              {this.props.likes}
            </div>
            <div className={style.statisticsItem}>
              <div className={`${style.statisticsImg} ${style.statisticsComments}`}></div>
              {this.props.comments}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
