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
        <div className="wrapper">
          <NowAvailableSlider />
          <FreeLimited />
        </div>
      </React.Fragment>
    );
  }
}

export default EpicStore;
