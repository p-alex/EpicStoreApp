import React, {Component} from 'react';
import axios from 'axios';
import GameCard from '../../components/GameCard/GameCard';
import './NewReleases.css';
class SortedGamesRow extends Component {
  state = {
    newReleases: [],
  };
  componentDidMount() {
    let newReleases = [];
    axios.get('/api/newReleases').then((response) => {
      newReleases = response.data;
      this.setState({newReleases});
    });
  }

  render() {
    console.log(this.state.newReleases);

    return (
      <section className="game-cards-sorted">
        <div className="game-cards-sorter__header">
          <h3>New Releases</h3>
          <a href="/">VIEW MORE</a>
        </div>
        <div className="game-cards-sorter__card-container">
          {this.state.newReleases.map((item, id) => {
            return (
              <GameCard
                key={id}
                img={item.gameVCover}
                name={item.name}
                developer={item.developer}
                price={item.gamePrice}
                isFree={item.isFree}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

export default SortedGamesRow;
