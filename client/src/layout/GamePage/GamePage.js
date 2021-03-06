import React, {Component} from 'react';
import Layout from '../Layout';
import axios from 'axios';
import {connect} from 'react-redux';
import './GamePage.css';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser';
import GamePageSlider from '../../components/GamePageSlider/GamePageSlider';
import GamePageHeader from '../../components/GamePageHeader/GamePageHeader';
import GamePageAbout from '../../components/GamePageAbout/GamePageAbout';
class GamePage extends Component {
  state = {
    gameData: [],
    sliderVideos: [],
    sliderImages: [],
    screenshotsArray: [],
    totalSlides: 0,
    loading: false,
    price: '',
    smallDesc: '',
    aboutGame: '',
    gameLogo: '',
    publisher: '',
    developer: '',
    releaseDate: '',
    rating: '',
    tags: '',
    platform: '',
    isFree: '',
  };
  componentDidMount () {
    this.props.isBrowsePage('gamepage');
    this.setState ({loading: true});
    let sliderImages = [];
    let sliderVideos = [];
    let screenshots = [];
    let gameData = [];
    axios
      .get ('/api/allGames')
      .then (response => {
        response.data.map ((d, id) => {
          if (
            d.name.replace (':', '').split (' ').join ('') ===
            this.props.match.params.gameName
              .replace (':', '')
              .split (' ')
              .join ('')
          ) {
            sliderImages = d.imagesURL;
            sliderVideos = d.videoURL.split (',');
            screenshots = d.screenshotsURL;
            this.setState ({
              sliderVideos: sliderVideos,
              sliderImages: sliderImages,
              totalSlides: sliderImages.length + sliderVideos.length,
              screenshotsArray: screenshots,
              gameData: gameData,
              gamePrice: d.gamePrice,
              isFree: d.isFree,
              smallDesc: d.smallDesc,
              aboutGame: d.aboutGame,
              publisher: d.publisher,
              developer: d.developer,
              releaseDate: d.releaseDate,
              tags: d.tags,
              rating: d.rating,
              platform: d.platform,
              gameLogo: d.gameLogoURL,
              loading: false,
            });
          }
        });
      })
      .catch (err => console.log (err));
  }
  render () {
    return (
      <React.Fragment>
        <Layout>

          {!this.state.loading
            ? <React.Fragment>
                <GamePageSlider
                  sliderVideos={this.state.sliderVideos}
                  sliderImages={this.state.sliderImages}
                  totalSlides={this.state.totalSlides}
                  params={this.props.match.params.gameName}
                />
                <GamePageHeader
                  price={this.state.gamePrice}
                  smallDesc={this.state.smallDesc}
                  gameLogo={this.state.gameLogo}
                  params={this.props.match.params.gameName}
                  isFree={this.state.isFree}
                />
                <GamePageAbout
                  params={this.props.match.params.gameName}
                  aboutGame={this.state.aboutGame}
                  screenshots={this.state.screenshotsArray}
                  publisher={this.state.publisher}
                  developer={this.state.developer}
                  releaseDate={this.state.releaseDate}
                  tags={this.state.tags}
                  platform={this.state.platform}
                  rating={this.state.rating}
                />

              </React.Fragment>
            : null}

        </Layout>

      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return (null)
}
const mapDispatchToProps = dispatch => {
  return {
    isBrowsePage: (page) => dispatch({type:'isBrowsePage',payload:{page}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
