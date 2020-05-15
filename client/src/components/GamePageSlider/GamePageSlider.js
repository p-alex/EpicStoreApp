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
  };
  componentDidMount() {
    let sliderVideos = [];
    let sliderImages = [];
    axios.get('/api/games').then((response) => {
      response.data.map((d) => {
        if (d.name.split(' ').join('') === this.props.params) {
          sliderVideos = d.videoURL.split(',');
        }
      });
      response.data.map((d) => {
        if (d.name.split(' ').join('') === this.props.params) {
          sliderImages = d.imagesURL;
        }
      });
      this.setState({
        sliderVideos: sliderVideos,
        sliderImages: sliderImages,
        totalSlides: sliderImages.length + sliderVideos.length,
      });
    });
  }
  componentDidUpdate() {
    console.log(this.state.currentSlide);
  }
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
  render() {
    // console.log(
    //   this.state.currentGame.map((b) => {
    //     return b.imagesURL;
    //   })
    // );
    console.log('Total Slides' + this.state.totalSlides);

    return (
      <React.Fragment>
        <section className="game-page-slider">
          <span class="game-page-slider__left ctrl" onClick={this.left}>
            <i
              style={{position: 'relative', fontSize: '18px'}}
              className="fas fa-arrow-left"
            ></i>
          </span>
          <div
            className="game-page-slider__track"
            style={{
              transform: `translateX(-${(this.state.currentSlide - 1) * 100}%)`,
            }}
          >
            {this.state.sliderVideos.map((video, id) => {
              return (
                <div
                  className="game-page-slider__video"
                  key={id}
                  style={
                    this.state.currentSlide - this.state.currentGame - 1 !== id
                      ? {opacity: '0.3'}
                      : {opacity: '1'}
                  }
                >
                  <iframe src={video} allowFullScreen frameBorder="0"></iframe>
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
                    id
                      ? {opacity: '0.1'}
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
        </section>
      </React.Fragment>
    );
  }
}

export default GamePageSlider;
