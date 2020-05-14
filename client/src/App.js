import React from 'react';
import './App.css';
import EpicStore from './layout/EpicStore/EpicStore';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import GamePage from './layout/GamePage/GamePage';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/store" />
        <Route path="/store" exact component={EpicStore} />
        <Route path="/product/:gameName" exact component={GamePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
