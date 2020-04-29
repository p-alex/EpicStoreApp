import React, { Component } from "react";
import "./MainNavigationMobile.css";
import { connect } from "react-redux";
import LangSideDrawer from "./LangSideDrawer/LangSideDrawer";
class MainNavigationMobile extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="nav-mobile">
          <div className="nav-mobile__logo">
            <img src="/images/Logos/epic-games-logo.png" alt="logo" />
          </div>
          <p className="burger" onClick={this.props.onBurgerChange}>
            {this.props.ibo ? "X" : "MENU"}
          </p>
          {this.props.ibo ? (
            <div className="burger__dropdown">
              <ul className="nav-mobile__dropdown">
                <li>
                  <a href="/">STORE</a>
                </li>
                <li>
                  <a href="/">NEWS</a>
                </li>
                <li>
                  <a href="/">FAQ</a>
                </li>
                <li>
                  <a href="/">HELP</a>
                </li>
                <li>
                  <a href="/">UNREAL ENGINE</a>
                </li>
              </ul>
              <div>
                <div className="main-nav-mobile__signin-lang">
                  <a href="/">
                    <img src="/images/Icons/user.png" alt="signin" />
                    <p>SIGN IN</p>
                  </a>
                  <div className="lang__btn" onClick={this.props.onLangChange}>
                    <img src="/images/Icons/global.png" alt="lang" />
                  </div>
                </div>
                <div className="get-epic">
                  <a className="special" href="/">
                    GET EPIC GAMES
                  </a>
                </div>
              </div>
            </div>
          ) : null}
          {this.props.ilo && this.props.ibo ? (
            <LangSideDrawer isOpen={this.props.onLangChange} />
          ) : null}
        </nav>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ibo: state.isBurgerOpen,
    ilo: state.isLangOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBurgerChange: () => dispatch({ type: "BURGER" }),
    onLangChange: (e) => dispatch({ type: "LANG", e: e }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNavigationMobile);
