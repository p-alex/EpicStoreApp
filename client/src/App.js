import React from 'react';
import './App.css';
import EpicStore from './layout/EpicStore/EpicStore';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import GamePage from './layout/GamePage/GamePage';
import BrowsePage from './layout/BrowsePage/BrowsePage';
function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/store" />
        <Route path="/store/browse" exact component={BrowsePage} />
        <Route path="/store" exact component={EpicStore} />
        <Route path="/product/:gameName" exact component={GamePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
