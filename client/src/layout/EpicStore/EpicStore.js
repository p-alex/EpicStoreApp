import React, {Component} from 'react';
import Layout from '../Layout';
import NowAvailableSlider
  from '../../components/NowAvailableSlider/NowAvailableSlider';
import FreeLimited from '../../containers/FreeLimited/FreeLimited';
import NewReleases from '../../containers/NewReleases/NewReleases';
import {Link} from 'react-router-dom';
import './EpicStore.css';
class EpicStore extends Component {
  state = {
    list: [],
    loading: false,
  };
  handleChange = e => {
    this.setState ({loading: true});
    e.preventDefault ();
    e.persist ();
    setTimeout (() => {
      fetch ('/api/allGames')
        .then (r => r)
        .then (r => r.json ())
        .then (r => {
          const list = [];
          r.map (game => {
            if (game.name.toLowerCase ().includes (e.target.value)) {
              list.push (game);
            }
          });
          this.setState ({list, loading: false});
          console.log ('fetched data');
        })
        .catch (err => console.log (err));
    }, 1500);
  };
  getData = e => {};
  render () {
    return (
      <React.Fragment>
        <Layout>
          {!this.state.loading
            ? this.state.list.map (item => (
                <div
                  key={item._id}
                  style={{display: 'flex', marginTop: '50px', width: '100%'}}
                >
                  <Link
                    to={`/product/${item.name
                      .replace (':', '')
                      .split (' ')
                      .join ('')}`}
                  >
                    <img
                      width="80"
                      src={`/images/${item.name
                        .replace (':', '')
                        .split (' ')
                        .join ('')}/${item.gameLogoURL}`}
                    />
                  </Link>
                  <p style={{color: 'white', marginTop: '50px'}}>
                    {item.name} - {item.gamePrice}$
                  </p>
                </div>
              ))
            : <p style={{color: 'white', marginTop: '50px'}}>Loading</p>}
          {/* <form style={{marginTop: '50px'}}>
            <input
              type="text"
              name="search"
              onChange={e => this.handleChange (e)}
            />
            <button type="submit">Search</button>
          </form> */}
          <NowAvailableSlider />
          <NewReleases />

          <FreeLimited />
        </Layout>

      </React.Fragment>
    );
  }
}

export default EpicStore;
