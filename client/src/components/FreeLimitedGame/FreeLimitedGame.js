import React from 'react';
import {Link} from 'react-router-dom';
const freeLimitedGame = (props) => {
  return (
    <Link to={`/product/${props.name.replace(':', '').split(' ').join('')}`}>
      <div className="free-limited-item">
        {' '}
        <div className="free-limited-item__image">
          <img
            draggable="false"
            src={`/images/${props.name.replace(':', '').split(' ').join('')}/${
              props.img
            }`}
          />
          <span>FREE NOW</span>
        </div>
        <div className="free-limited__info">
          <p>{props.name}</p>
          <p>Free for a limited time!</p>
        </div>
      </div>
    </Link>
  );
};

export default freeLimitedGame;
