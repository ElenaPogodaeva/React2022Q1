import React from 'react';
import Card from '../Card/Card';

import style from './Cards.module.scss';

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

type CardsProps = {
  cards: CardProps[];
};

type CardsState = {
  state: Record<string, never>;
};

class Cards extends React.Component<CardsProps, CardsState> {
  render() {
    if (!this.props.cards.length) return null;

    return (
      <div className={style.cards} data-testid="cards">
        {this.props.cards &&
          this.props.cards.map((card) => <Card key={card.id} {...card} />)}
      </div>
    );
  }
}

export default Cards;
