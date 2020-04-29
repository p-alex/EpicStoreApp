import React, { Component } from "react";
import "./NowAvailableSlider.css";
import axios from "axios";
import NowAvailableSliderContent from "./NowAvailableSliderContent/NowAvailableSliderContent";
class NowAvailableSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderData: [],
      sliderGames: [],
      slideNumber: 1,
    };
  }

  componentDidMount = () => {
    axios.get("/api/slider").then((response) => {
      const list = [];
      response.data.map((d) => {
        list.push(d.name);
      });
      this.setState({ sliderData: response.data, sliderGames: list });
    });
  };

  leftArrowHandler = () => {
    let subtract = this.state.slideNumber - 1;
    if (subtract < 1) {
      subtract = this.state.sliderData.length;
    }
    this.setState({ slideNumber: subtract });
  };
  dotHandler = (id) => {
    this.setState({ slideNumber: id });
  };
  rightArrowHandler = () => {
    let add = this.state.slideNumber + 1;
    if (add > this.state.sliderData.length) {
      add = 1;
    }
    this.setState({ slideNumber: add });
  };

  render() {
    let currentGame = this.state.sliderGames[this.state.slideNumber - 1];

    return (
      <section className="slider-newgames">
        {this.state.sliderData
          .filter((i) => i.name === currentGame)
          .map((item, id) => {
            return (
              <NowAvailableSliderContent
                status={item.status}
                name={item.name}
                desc={item.desc}
                rightHandler={this.rightArrowHandler}
                leftHandler={this.leftArrowHandler}
                imgURL={item.imgURL}
                sliderGames={this.state.sliderGames}
                sliderData={this.state.sliderData}
                slideNumber={this.state.slideNumber}
                dotHandler={this.dotHandler}
                linkName={item.linkName}
                linkURL={item.linkURL}
                key={id}
              />
            );
          })}
      </section>
    );
  }
}

export default NowAvailableSlider;
