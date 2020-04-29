import React, { Component } from "react";
import MainNavigationMobile from "../../components/MainNavigationMobile/MainNavigationMobile";
import MainNavigationDesktop from "../../components/MainNavigationDesktop/MainNavigationDesktop";
class MainNavigation extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <MainNavigationMobile />
        <MainNavigationDesktop />
      </React.Fragment>
    );
  }
}

export default MainNavigation;
