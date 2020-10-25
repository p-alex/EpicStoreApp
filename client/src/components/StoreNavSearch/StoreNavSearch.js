import React from 'react';
import {NavLink} from 'react-router-dom';
import './StoreNavSearch.css';
const storeNavSearch = props => {
  return (
    <div className="store-nav-container">
      <div className="container store-nav-flex">
        <div className="store-nav-container_links">
          <ul>
            <li>
              <NavLink to="/store" exact activeStyle={{color: 'white'}}>
                Discover
              </NavLink>
            </li>
            <li>
              <NavLink to="/store/browse" exact activeStyle={{color: 'white'}}>
                Browse
              </NavLink>
            </li>
          </ul>
        </div>
        <form>
          <input type="text" placeholder="Search" />
        </form>
      </div>
    </div>
  );
};

export default storeNavSearch;
