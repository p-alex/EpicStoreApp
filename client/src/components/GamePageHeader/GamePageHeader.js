import React from 'react';
import './GamePageHeader.css';
const gamePageHeader = (props) => {
  return (
    <section className="game-page-header">
      <div className="game-page-header__container">
        <div className="game-page-header__logo"></div>
        <div className="game-page-header__desc"></div>
        <div className="game-page-header__buy"></div>
      </div>
    </section>
  );
};

export default gamePageHeader;
