import React from 'react';
import './GamePageHeader.css';
const gamePageHeader = (props) => {
  console.log(props);

  return (
    <section className="game-page-header">
      <div className="game-page-header__logo">
        <img src={`/images/${props.params}/${props.gameLogo}`} />
      </div>
      <div className="game-page-header__desc">
        <p>{props.smallDesc}</p>
      </div>
      <div className="game-page-header__buy">
        <div className="buy-price">
          <h3>
            {props.isFree === 'True' ? (
              <span>
                <s style={{color: '#777'}}>{props.price}$</s> Free
              </span>
            ) : (
              props.price + '$'
            )}
          </h3>
        </div>
        <div className="buy-btn">
          <a href="/">{props.isFree === 'True' ? 'Get' : 'Buy Now'}</a>
        </div>
        <div className="buy-sale"></div>
      </div>
    </section>
  );
};

export default gamePageHeader;
