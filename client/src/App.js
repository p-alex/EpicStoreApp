import React from "react";
import "./App.css";
import EpicStore from "./layout/EpicStore/EpicStore";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/store" />
        <Route path="/store" exact component={EpicStore} />
        <script src="/swipeJS/swipe.js" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
