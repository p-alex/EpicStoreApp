import React from 'react';
import './GameCard.css';
import {Link} from 'react-router-dom';
const gameCard = (props) => {
  return (
    <div className="game-card">
      <div className="game-card__image">
        <Link
          to={`/product/${props.name.replace(':', '').split(' ').join('')}`}
        >
          <img
            src={`/images/${props.name.replace(':', '').split(' ').join('')}/${
              props.img
            }`}
          />
        </Link>
      </div>
      <div className="game-card__info">
        <p>{props.name.slice(0, 30)}</p>
        <p className="game-card__developer">{props.developer}</p>
        {props.isFree === 'True' ? (
          <p className="game-card__price">
            <s style={{color: 'grey'}}>{props.price}$</s> Free
          </p>
        ) : (
          <p className="game-card__price">{props.price}$</p>
        )}
      </div>
    </div>
  );
};

export default gameCard;
