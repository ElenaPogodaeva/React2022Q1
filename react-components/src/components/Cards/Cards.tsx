import React from 'react';
import Card from '../Card/Card';
import { Image } from '../../types/types';
import style from './Cards.module.scss';
import { useNavigate } from 'react-router-dom';

type CardsProps = {
  cards: Image[];
};

export const Cards = ({ cards }: CardsProps) => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/images/${id}`);
  };

  return (
    <>
      <div className={style.cards} data-testid="cards">
        {Boolean(cards.length) &&
          cards.map((card) => <Card key={card.id} card={card} handleClick={handleClick} />)}
      </div>
    </>
  );
};

export default Cards;
