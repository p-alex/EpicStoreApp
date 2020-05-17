import React, {Component} from 'react';
import './GamePageSlider.css';
import axios from 'axios';

class GamePageSlider extends Component {
  state = {
    currentGame: [],
    sliderVideos: [],
    sliderImages: [],
    totalSlides: 0,
    currentSlide: 1,
    showMore: false,
  };
  componentDidMount() {
    let sliderVideos = [];
    let sliderImages = [];
    axios.get('/api/games').then((response) => {
      response.data.map((d) => {
        if (d.name.split(' ').join('') === this.props.params) {
          sliderVideos = d.videoURL.split(',');
          sliderImages = d.imagesURL;
        }
      });
      this.setState({
        sliderVideos: sliderVideos,
        sliderImages: sliderImages,
        totalSlides: sliderImages.length + sliderVideos.length,
        currentGame: response.data,
      });

      const iframe = document.getElementsByTagName('iframe')[0].contentWindow;
      console.log(iframe);
    });
  }
  componentDidUpdate() {
    console.log(this.state.currentSlide);
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
    if (counter > this.state.totalSlides) {
      counter = 1;
    }
    this.setState({currentSlide: counter});
  };
  left = () => {
    let counter = this.state.currentSlide;
    counter = counter - 1;
    if (counter < 1) {
      counter = this.state.totalSlides;
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
    console.log('Total Slides' + this.state.totalSlides);

    return (
      <React.Fragment>
        <section>
          <div className="game-page-slider">
            <span class="game-page-slider__left ctrl" onClick={this.left}>
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
              {this.state.sliderVideos.map((video, id) => {
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
                      src={video + '?rel=0'}
                      allowFullScreen
                      frameBorder="0"
                    ></iframe>
                  </div>
                );
              })}

              {this.state.sliderImages.map((item, id) => {
                console.log(
                  'id' + id,
                  'Slidervideo length: ' + this.state.sliderVideos.length
                );

                return (
                  <div
                    className="game-page-slider__image"
                    key={id}
                    style={
                      this.state.currentSlide -
                        (this.state.sliderVideos.length + 1) !==
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

            <span class="game-page-right ctrl" onClick={this.right}>
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
                : `Show ${this.state.totalSlides - 1} More`}
            </span>
          </div>
          <div className="game-page-slider__dots">
            {this.state.sliderVideos.map((v, index) => {
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
            {this.state.sliderImages.map((i, index) => {
              return (
                <div
                  className="game-page-slider__dot-container"
                  onClick={() =>
                    this.dotHandler(index + this.state.sliderVideos.length + 1)
                  }
                >
                  <div
                    className={
                      this.state.currentSlide ===
                      index + this.state.sliderVideos.length + 1
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