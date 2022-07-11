import React, { Component } from "react";
import "./GamePageAbout.css";
import ReactHtmlParser from "react-html-parser";
class GamePageAbout extends Component {
  state = {
    showMore: false,
  };
  showMoreHandler = () => {
    if (!this.state.showMore) {
      this.setState({ showMore: true });
    } else {
      this.setState({ showMore: false });
    }
  };
  render() {
    return (
      <section className="game-page-about">
        <div className="game-page-about_section-title">
          <h3>About Game</h3>
        </div>
        <div
          className="game-page-about_desc-img"
          id="descImg"
          style={
            !this.state.showMore && this.props.screenshots.length >= 4
              ? { height: "600px" }
              : { height: "auto", overflow: "auto" }
          }
        >
          <div className="game-page-about_info">
            <div className="info-box">
              <p>Developer</p>
              <p>{this.props.developer}</p>
            </div>
            <div className="info-box">
              <p>Publisher</p>
              <p>{this.props.publisher}</p>
            </div>
            <div className="info-box">
              <p>Release Date</p>
              <p>{new Date(this.props.releaseDate).toLocaleDateString()}</p>
            </div>
            <div className="info-box">
              <p>Tags</p>
              <p>{this.props.tags}</p>
            </div>
            <div className="info-box">
              <p>Rating</p>
              <p>{this.props.rating}</p>
            </div>
            <div className="info-box">
              <p>Platform</p>
              <p>{this.props.platform}</p>
            </div>
          </div>
          <p className="game-page-about_about-game">
            {ReactHtmlParser(this.props.aboutGame)}
          </p>
          {this.props.screenshots.map((s, id) => {
            if (window.innerWidth <= 960) {
              return (
                <img
                  src={`/images/${this.props.params}/${s}`}
                  style={{ width: "100%" }}
                  key={id}
                />
              );
            } else {
              if (this.props.screenshots.length > 2) {
                if (this.props.screenshots.length % 2 === 0) {
                  if (id % 4 === 0) {
                    return (
                      <img
                        src={`/images/${this.props.params}/${s}`}
                        style={{ width: "100%" }}
                        key={id}
                      />
                    );
                  } else {
                    // if (
                    //   this.props.screenshots.length % 2 === 0 &&
                    //   id + 1 === this.props.screenshots.length
                    // ) {
                    //   return (
                    //     <img
                    //       src={`/images/${this.props.params}/${s}`}
                    //       style={{width: '100%'}}
                    //     />
                    //   );
                    // } else {
                    return (
                      <img
                        src={`/images/${this.props.params}/${s}`}
                        style={{ width: "33%", padding: "4px" }}
                      />
                    );
                  }
                } else if (id % 3 === 0) {
                  return (
                    <img
                      src={`/images/${this.props.params}/${s}`}
                      style={{ width: "100%" }}
                      key={id}
                    />
                  );
                } else {
                  return (
                    <img
                      src={`/images/${this.props.params}/${s}`}
                      style={{ width: "50%", padding: "4px" }}
                      key={id}
                    />
                  );
                }
              } else {
                return (
                  <img
                    src={`/images/${this.props.params}/${s}`}
                    style={{ width: "100%" }}
                    key={id}
                  />
                );
              }
            }
          })}
          {this.props.screenshots.length >= 4 ? (
            <span className="desc-img_show-more" onClick={this.showMoreHandler}>
              {this.state.showMore ? "Show Less" : "Show More"}
            </span>
          ) : null}
        </div>
      </section>
    );
  }
}

export default GamePageAbout;
