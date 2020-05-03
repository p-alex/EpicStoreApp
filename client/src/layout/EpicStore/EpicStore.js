import React, { Component } from "react";
import MainNavigation from "../../containers/MainNavigation/MainNavigation";
import NowAvailableSlider from "../../components/NowAvailableSlider/NowAvailableSlider";
import FreeLimited from "../../components/FreeLimited/FreeLimited";
import "./EpicStore.css";
class EpicStore extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <MainNavigation />
        <NowAvailableSlider />
        <FreeLimited />
      </React.Fragment>
    );
  }
}

export default EpicStore;
