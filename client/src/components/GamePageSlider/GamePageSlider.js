import React, {Component} from 'react';
import './GamePageSlider.css';
import axios from 'axios';

class GamePageSlider extends Component {
  state = {
    totalSlides: 0,
    currentSlide: 1,
    showMore: false,
  };
  componentDidMount() {
    console.log(this.props);
  }
  showMore = () => {
    const track = document.getElementById('track');
    if (this.state.showMore) {
      this.setState({showMore: false});
      track.classList.remove('show-more');
      return;
    }
    if (!this.state.showMore) {
      this.setState({showMore: true});
      track.classList.add('show-more');
      this.setState({currentSlide: 1});
      return;
    }
  };
  right = () => {
    let counter = this.state.currentSlide;
    counter = counter + 1;
    if (counter > this.props.totalSlides) {
      counter = 1;
    }
    this.setState({currentSlide: counter});
  };
  left = () => {
    let counter = this.state.currentSlide;
    counter = counter - 1;
    if (counter < 1) {
      counter = this.props.totalSlides;
    }
    this.setState({currentSlide: counter});
  };
  dotHandler = (id) => {
    this.setState({currentSlide: id});
  };
  render() {
    // console.log(
    //   this.state.currentGame.map((b) => {
    //     return b.imagesURL;
    //   })
    // );
    console.log('Total Slides' + this.props.totalSlides);

    return (
      <React.Fragment>
        <section className="game-page-slider_container">
          <div className="game-page-slider">
            <span className="game-page-slider__left ctrl" onClick={this.left}>
              <i
                style={{position: 'relative', fontSize: '18px'}}
                className="fas fa-arrow-left"
              ></i>
            </span>
            <div
              className="game-page-slider__track"
              id="track"
              style={{
                transform: `translateX(-${
                  (this.state.currentSlide - 1) * 100
                }%)`,
              }}
            >
              {this.props.sliderVideos.map((video, id) => {
                return (
                  <div
                    className="game-page-slider__video"
                    key={id}
                    style={
                      this.state.currentSlide - 1 !== id &&
                      this.state.showMore !== true
                        ? {opacity: '0.2'}
                        : {opacity: '1'}
                    }
                  >
                    <iframe
                      src={'https://www.youtube.com/embed/' + video + '?rel=0'}
                      onClick={() => this.dotHandler(id)}
                      allowFullScreen
                      frameBorder="0"
                    ></iframe>
                  </div>
                );
              })}

              {this.props.sliderImages.map((item, id) => {
                return (
                  <div
                    className="game-page-slider__image"
                    key={id}
                    style={
                      this.state.currentSlide -
                        (this.props.sliderVideos.length + 1) !==
                        id && this.state.showMore !== true
                        ? {opacity: '0.2'}
                        : {opacity: '1'}
                    }
                  >
                    <img src={`/images/${this.props.params}/${item}`} />
                  </div>
                );
              })}
            </div>

            <span className="game-page-right ctrl" onClick={this.right}>
              <i
                style={{position: 'relative', fontSize: '18px'}}
                className="fas fa-arrow-right"
              ></i>
            </span>
            <span
              className="game-page-slider__show-more"
              id="show-more"
              onClick={this.showMore}
            >
              {this.state.showMore
                ? `Show Less`
                : `Show ${this.props.totalSlides - 1} More`}
            </span>
          </div>
          <div className="game-page-slider__dots">
            {this.props.sliderVideos.map((v, index) => {
              return (
                <div
                  className="game-page-slider__dot-container"
                  onClick={() => this.dotHandler(index + 1)}
                >
                  <div
                    className={
                      this.state.currentSlide === index + 1
                        ? 'game-page-slider__dot game-page-slider__dot-active'
                        : 'game-page-slider__dot'
                    }
                  ></div>
                </div>
              );
            })}
            {this.props.sliderImages.map((i, index) => {
              return (
                <div
                  className="game-page-slider__dot-container"
                  onClick={() =>
                    this.dotHandler(index + this.props.sliderVideos.length + 1)
                  }
                >
                  <div
                    className={
                      this.state.currentSlide ===
                      index + this.props.sliderVideos.length + 1
                        ? 'game-page-slider__dot game-page-slider__dot-active'
                        : 'game-page-slider__dot'
                    }
                  ></div>
                </div>
              );
            })}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default GamePageSlider;
