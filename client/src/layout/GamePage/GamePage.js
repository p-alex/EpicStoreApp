import React, {Component} from 'react';
import MainNavigation from '../../containers/MainNavigation/MainNavigation';
import axios from 'axios';
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
  };
  componentDidMount() {
    this.setState({loading: true});
    let sliderImages = [];
    let sliderVideos = [];
    let screenshots = [];
    let gameData = [];
    axios
      .get('/api/games')
      .then((response) => {
        response.data.map((d, id) => {
          console.log('data' + d.name);

          if (d.name.split(' ').join('') === this.props.match.params.gameName) {
            sliderImages = d.imagesURL;
            sliderVideos = d.videoURL.split(',');
            screenshots = d.screenshotsURL;
            this.setState({
              sliderVideos: sliderVideos,
              sliderImages: sliderImages,
              totalSlides: sliderImages.length + sliderVideos.length,
              screenshotsArray: screenshots,
              gameData: gameData,
              gamePrice: d.gamePrice,
              smallDesc: d.smallDesc,
              aboutGame: d.aboutGame,
              gameLogo: d.gameLogoURL,
              loading: false,
            });
          }
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <React.Fragment>
        <MainNavigation />
        <div className="GamePage-wrapper">
          {!this.state.loading ? (
            <React.Fragment>
              <GamePageSlider
                sliderVideos={this.state.sliderVideos}
                sliderImages={this.state.sliderImages}
                totalSlides={this.state.totalSlides}
                params={this.props.match.params.gameName}
              />
              <div className="GamePage-content">
                <GamePageHeader
                  price={this.state.gamePrice}
                  smallDesc={this.state.smallDesc}
                  gameLogo={this.state.gameLogo}
                  params={this.props.match.params.gameName}
                />
                <GamePageAbout
                  params={this.props.match.params.gameName}
                  aboutGame={this.state.aboutGame}
                  screenshots={this.state.screenshotsArray}
                />
              </div>
            </React.Fragment>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default GamePage;
