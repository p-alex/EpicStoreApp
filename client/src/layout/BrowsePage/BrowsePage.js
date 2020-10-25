import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../Layout';
import axios from 'axios';
import BrowsePageFilter
  from '../../components/BrowsePageFilters/BrowsePageFilters';
import './BrowsePage.css';
const BrowsePage = props => {
  const [state, setState] = useState ({games: [], loading: true});
  useEffect (() => {
    const cancelToken = axios.CancelToken.source ();
    axios
      .get ('/api/allGames', {cancelToken: cancelToken.token})
      .then (response => {
        setState (prevState => {
          return {...prevState, games: response.data, loading: false};
        });
      })
      .catch (e => {
        if (axios.isCancel (e)) return;
        if (e) throw e;
      });
    return () => {
      cancelToken.cancel ();
    };
  }, []);

  return (
    <Layout>
      {state.loading
        ? <p style={{color: 'white'}}>Loading...</p>
        : <section className="browse-games_container">
            <div className="browse_games">
              {state.games.map (game => {
                return (
                  <Link to={`/product/` + game.name.replace(/:|,/g,'').split(' ').join('')}>
                  <div className="games_container">
                    <img
                      src={`/images/${game.name
                        .replace (':', '')
                        .split (' ')
                        .join ('')}/${game.gameVCover}`}
                    />
                    <p style={{color: 'var(--dark-grey)'}}>{game.developer}</p>
                    <p key={game._id} style={{color: 'white'}}>{game.name}</p>
                  </div>
                  </Link>
                  
                );
              })}

            </div>
            <BrowsePageFilter />
          </section>}

    </Layout>
  );
};

export default BrowsePage;
