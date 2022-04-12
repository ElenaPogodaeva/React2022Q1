import React from 'react';
import Card from '../Card/Card';
import { Image } from '../../types/types';
import style from './Cards.module.scss';

type CardsProps = {
  cards: Image[];
};

type CardsState = {
  state: Record<string, never>;
};

class Cards extends React.Component<CardsProps, CardsState> {
  render() {
    if (!this.props.cards.length) return null;

    return (
      <div className={style.cards} data-testid="cards">
        {this.props.cards && this.props.cards.map((card) => <Card key={card.id} {...card} />)}
      </div>
    );
  }
}

export default Cards;
