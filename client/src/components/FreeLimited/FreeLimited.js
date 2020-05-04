import React, { Component } from "react";
import "./FreeLimited.css";
import { appendScript } from "../../appendScript";

class FreeGames extends Component {
  componentDidMount() {
    // //appendScript("client/public/swipe.js");
    // const track = this.track;
    // console.log(track);
    // let initalPosition = null;
    // window.addEventListener("mousedown", (e) => {
    //   initalPosition = e.pageX;
    //   console.log(this.initialPosition);
    // });
    // window.addEventListener("mousemove", (e) => {
    //   const currentPosition = e.pageX;
    //   const diff = currentPosition - initalPosition;
    //   console.log("Diff:" + diff);
    //   track.style.transform = `translateX(${diff}px);`;
    // });
    const track = document.getElementById("free");
    let initialPosition = null;
    let moving = false;
    let transform = 0;
    window.addEventListener("touchstart", (e) => {
      initialPosition = e.touches.pageX;
      moving = true;
      const transformMatrix = window
        .getComputedStyle(track)
        .getPropertyValue("transform");
      if (transformMatrix !== "none") {
        transform = parseInt(transformMatrix.split(",")[4].trim());
        console.log(transform);

        //console.log(transform);
        //console.log(track.style.length);
      }
    });

    window.addEventListener("touchmove", (e) => {
      if (moving) {
        const currentPosition = e.touches.pageX;
        const diff = currentPosition - initialPosition;
        let pixelsMoved = diff + transform;
        if (pixelsMoved > 0) {
          pixelsMoved = 0;
        } else if (Math.abs(pixelsMoved) > 980) {
          pixelsMoved = -980;
        }
        track.style.transform = `translateX(${pixelsMoved}px)`;
      }
    });
    window.addEventListener("touchcancel", (e) => {
      moving = false;
    });
  }
  render() {
    return (
      <section className="free-limited">
        <div className="row-header">
          <h3>Free Games</h3>
          <a href="/">VIEW MORE</a>
        </div>
        <div
          className="free-limited__list-container"
          id="free"
          style={{ transform: `translateX(${this.mouse}px)` }}
          ref={(track) => (this.track = track)}
          onMouseDown={this.mouse}
        >
          <div className="free-limited-item">
            <div className="free-limited-item__image">
              <img
                draggable="false"
                src="/images/FreeLimitedGameImages/CrashlandsSmall.jpg"
              />
              <span>COMING SOON</span>
            </div>
            <div className="free-limited__info">
              <p>Crashlands</p>
              <p>Free Now - Apr 30 at 6:00PM</p>
            </div>
          </div>

          <div className="free-limited-item">
            <div className="free-limited-item__image">
              <img
                draggable="false"
                src="/images/FreeLimitedGameImages/CrashlandsSmall.jpg"
              />
              <span>COMING SOON</span>
            </div>
            <div className="free-limited__info">
              <p>Crashlands</p>
              <p>Free Now - Apr 30 at 6:00PM</p>
            </div>
          </div>

          <div className="free-limited-item">
            <div className="free-limited-item__image">
              <img
                draggable="false"
                src="/images/FreeLimitedGameImages/CrashlandsSmall.jpg"
              />
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
  }
}

export default FreeGames;
