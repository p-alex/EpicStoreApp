import React, {Component} from 'react';
import MainNavigation from '../../containers/MainNavigation/MainNavigation';
import axios from 'axios';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser';
class GamePage extends Component {
  state = {
    gameData: [],
  };
  componentDidMount() {
    console.log(this.props);
    axios
      .get('/api/games')
      .then((response) => {
        let dataArray = [];
        response.data.map((item) => {
          console.log(
            item.name.split(' ').join(''),
            this.props.match.params.gameName
          );

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
    console.log(this.state.gameData);
    return (
      <React.Fragment>
        <MainNavigation />
        <span
          style={{marginTop: '150px', color: 'white', position: 'absolute'}}
        >
          {this.state.gameData.map((game, id) => {
            return (
              <div key={id}>
                <p>Game Name: {game.name}</p>
                <p>Price : {game.gamePrice}$</p>
                <br />
                <h1>Small Description</h1>
                <br />
                <p style={{width: '300px'}}>{game.smallDesc}</p>
                <br />
                <br />
                <h1>About Game</h1>
                <br />
                <p style={{width: '300px'}}>
                  {ReactHtmlParser(game.aboutGame)}
                </p>
                <br />
                <br />
                <br />
                <h1>Slider Images</h1>
                <br />
                {game.imagesURL.map((img, id) => {
                  return (
                    <img
                      key={id}
                      style={{width: '300px'}}
                      src={`/images/${game.name.split(' ').join('')}/${img}`}
                    />
                  );
                })}
                <br />
                <br />
                <h1>Screenshots</h1>
                <br />
                {game.screenshotsURL.map((img) => {
                  return (
                    <img
                      style={{width: '300px'}}
                      src={`/images/${game.name.split(' ').join('')}/${img}`}
                    />
                  );
                })}
              </div>
            );
          })}
        </span>
      </React.Fragment>
    );
  }
}

export default GamePage;
