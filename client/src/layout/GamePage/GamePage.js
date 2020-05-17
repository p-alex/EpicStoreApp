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
class GamePage extends Component {
  state = {
    gameData: [],
  };
  componentDidMount() {
    axios
      .get('/api/games')
      .then((response) => {
        let dataArray = [];
        response.data.map((item) => {
          if (
            item.name.split(' ').join('') === this.props.match.params.gameName
          ) {
            dataArray.push(item);
          }
        });
        this.setState({gameData: dataArray});
      })
      .catch((err) => console.log(err));
  }
  render() {
    // console.log(this.state.gameData);

    return (
      <React.Fragment>
        <MainNavigation />
        <div className="GamePage-wrapper">
          <GamePageSlider
            gameData={this.state.gameData}
            params={this.props.match.params.gameName}
          />
          <GamePageHeader />
        </div>
      </React.Fragment>
    );
  }
}

export default GamePage;
