import React, {Component} from 'react';
import axios from 'axios';
import GameCard from '../../components/GameCard/GameCard';
import './NewReleases.css';
class SortedGamesRow extends Component {
  state = {
    newReleases: [],
  };
  componentDidMount () {
    let newReleases = [];
    axios.get ('/api/newReleases').then (response => {
      newReleases = response.data;
      this.setState ({newReleases});
    });
  }

  render () {
    return (
      <React.Fragment>
        {this.state.newReleases.length
          ? <section className="game-cards-sorted">
              <div className="game-cards-sorter__header">
                <h3>New Releases</h3>
              </div>
              <div className="game-cards-sorter__card-container">
                {this.state.newReleases.map ((item, id) => {
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
          : null}
      </React.Fragment>
    );
  }
}

export default SortedGamesRow;
