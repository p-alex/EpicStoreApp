import React, {Component} from 'react';
import './FreeLimited.css';
import FreeLimitedGame from '../../components/FreeLimitedGame/FreeLimitedGame';
//import ReactHtmlParser , {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';
import axios from 'axios';
import freeLimitedGame from '../../components/FreeLimitedGame/FreeLimitedGame';

class FreeGames extends Component {
  state = {
    gamesData: [],
  };
  componentDidMount() {
    axios.get('/api/games').then((response) => {
      let array = [];
      response.data.map((item) => {
        console.log(item);
        if (item.isFree === 'True') {
          array.push(item);
          this.setState({gamesData: array});
        }
      });

      console.log(this.state.gamesData);
    });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.gamesData.length !== 0 ? (
          <section className="free-limited">
            <div className="row-header">
              <h3>Free Games</h3>
              <a href="/">VIEW MORE</a>
            </div>
            <div className="free-limited__list-container">
              {this.state.gamesData.map((game) => {
                return (
                  <FreeLimitedGame
                    name={game.name}
                    img={game.gameHCover}
                    freeUntil={game.freeUntil}
                  />
                );
              })}
            </div>
          </section>
        ) : null}
      </React.Fragment>
    );
  }
}

export default FreeGames;
