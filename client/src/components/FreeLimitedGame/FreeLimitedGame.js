import React from 'react';

const freeLimitedGame = (props) => {
  return (
    <div className="free-limited-item">
      <div className="free-limited-item__image">
        <img
          draggable="false"
          src={`/images/${props.name.split(' ').join('')}/${props.img}`}
        />
        <span>FREE NOW</span>
      </div>
      <div className="free-limited__info">
        <p>{props.name}</p>
        <p>Free for a limited time!</p>
      </div>
    </div>
  );
};

export default freeLimitedGame;
