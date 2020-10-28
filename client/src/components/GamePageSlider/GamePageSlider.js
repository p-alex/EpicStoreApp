import React, {Component} from 'react';
import './GamePageSlider.css';

class GamePageSlider extends Component {
  state = {
    totalSlides: 0,
    currentSlide: 1,
    showMore: false,
  };
  componentDidMount () {}
  showMore = () => {
    const track = document.getElementById ('track');
    if (this.state.showMore) {
      this.setState ({showMore: false});
      track.classList.remove ('show-more');
      return;
    }
    if (!this.state.showMore) {
      this.setState ({showMore: true});
      track.classList.add ('show-more');
      this.setState ({currentSlide: 1});
      return;
    }
  };
  right = () => {
    let counter = this.state.currentSlide;
    counter = counter + 1;
    if (counter > this.props.totalSlides) {
      counter = 1;
    }
    this.setState ({currentSlide: counter});
  };
  left = () => {
    let counter = this.state.currentSlide;
    counter = counter - 1;
    if (counter < 1) {
      counter = this.props.totalSlides;
    }
    this.setState ({currentSlide: counter});
  };
  dotHandler = id => {
    this.setState ({currentSlide: id});
  };

  render () {
    return (
      <React.Fragment>
        <section className="game-page-slider_container">
          <div className="game-page-slider">
            <div
              className="game-page-slider__invisible-control-left"
              onClick={this.left}
            />
            <div
              className="game-page-slider__invisible-control-right"
              onClick={this.right}
            />
            <span className="game-page-slider__left ctrl" onClick={this.left}>
              <i
                style={{position: 'relative', fontSize: '18px'}}
                className="fas fa-arrow-left"
              />
            </span>
            <div
              className="game-page-slider__track"
              id="track"
              style={{
                transform: `translateX(-${(this.state.currentSlide - 1) * 100}%)`,
              }}
            >
              {this.props.sliderVideos.map ((video, id) => {
                return (
                  <div
                    className="game-page-slider__video"
                    key={id}
                    onClick={() => this.dotHandler (id + 1)}
                    style={
                      this.state.currentSlide - 1 !== id &&
                        this.state.showMore !== true
                        ? {opacity: '0.2'}
                        : {opacity: '1'}
                    }
                  >
                    <iframe
                      src={
                        id === this.state.currentSlide - 1
                          ? 'https://www.youtube.com/embed/' +
                              video +
                              '?autoplay=1&rel=0&mute=1'
                          : 'https://www.youtube.com/embed/' + video + '?rel=0'
                      }
                      allowFullScreen
                      frameBorder="0"
                      id={`video${id}`}
                      allow="accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture"
                    />
                  </div>
                );
              })}
              {this.props.sliderImages.map ((item, id) => {
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
            <span className="game-page-slider__right ctrl" onClick={this.right}>
              <i
                style={{position: 'relative', fontSize: '18px'}}
                className="fas fa-arrow-right"
              />
            </span>
            {this.state.totalSlides === 1
              ? null
              : <span
                  className="game-page-slider__show-more"
                  id="show-more"
                  onClick={this.showMore}
                >
                  {this.state.showMore
                    ? `Show Less`
                    : `Show (${this.props.totalSlides - 1}) More`}
                </span>}
          </div>
          <div className="game-page-slider__dots">
            {this.props.sliderVideos.map ((v, index) => {
              return (
                <div
                  className="game-page-slider__dot-container"
                  onClick={() => this.dotHandler (index + 1)}
                  key={index}
                >
                  <div
                    className={
                      this.state.currentSlide === index + 1
                        ? 'game-page-slider__dot game-page-slider__dot-active'
                        : 'game-page-slider__dot'
                    }
                  />
                </div>
              );
            })}
            {this.props.sliderImages.map ((i, index) => {
              return (
                <div
                  className="game-page-slider__dot-container"
                  onClick={() =>
                    this.dotHandler (
                      index + this.props.sliderVideos.length + 1
                    )}
                    key={index}
                >
                  <div
                    className={
                      this.state.currentSlide ===
                        index + this.props.sliderVideos.length + 1
                        ? 'game-page-slider__dot game-page-slider__dot-active'
                        : 'game-page-slider__dot'
                    }
                  />
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
