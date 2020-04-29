import React from "react";
import "./FreeLimited.css";
const freeGames = (props) => {
  return (
    <section className="free-limited">
      <div className="row-header">
        <h3>Free Games</h3>
        <a href="/">VIEW MORE</a>
      </div>
      <div className="free-limited__list-container">
        <div className="free-limited-item">
          <div className="free-limited-item__image">
            <img src="/images/FreeLimitedGameImages/CrashlandsSmall.jpg" />
            <span>COMING SOON</span>
          </div>
          <div className="free-limited__info">
            <p>Crashlands</p>
            <p>Free Now - Apr 30 at 6:00PM</p>
          </div>
        </div>

        <div className="free-limited-item">
          <div className="free-limited-item__image">
            <img src="/images/FreeLimitedGameImages/CrashlandsSmall.jpg" />
            <span>COMING SOON</span>
          </div>
          <div className="free-limited__info">
            <p>Crashlands</p>
            <p>Free Now - Apr 30 at 6:00PM</p>
          </div>
        </div>

        <div className="free-limited-item">
          <div className="free-limited-item__image">
            <img src="/images/FreeLimitedGameImages/CrashlandsSmall.jpg" />
            <span>COMING SOON</span>
          </div>
          <div className="free-limited__info">
            <p>Crashlands</p>
            <p>Free Now - Apr 30 at 6:00PM</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default freeGames;
