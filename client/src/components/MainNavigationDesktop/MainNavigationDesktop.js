import React from "react";
import "./MainNavigationDesktop.css";
import { NavLink } from "react-router-dom";
const mainNavigationDesktop = (props) => {
  return (
    <nav className="nav">
      <div className="nav__left">
        <img
          className="nav__logo"
          src="/images/Logos/epic-games-logo.png"
          alt="logo"
        />
        <ul className="nav__left__links">
          <li>
            <NavLink
              to="/store"
              activeStyle={{
                borderBottom: "solid var(--special-background) 6px",
                color: "var(--special-color-hover)",
              }}
            >
              STORE
            </NavLink>
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
      </div>
      <div className="nav__right">
        <ul className="nav__right__links">
          <li>
            <a href="/">
              <img
                src="/images/Icons/global.png"
                alt="language"
                onClick={(e) => e.preventDefault()}
                style={{ position: "relative", top: "3px" }}
              />
            </a>
            <ul className="nav__right__dropdown">
              <li>
                <a href="/">ENGLISH</a>
              </li>
              <li>
                <a href="/">DEUTSCH</a>
              </li>
              <li>
                <a href="/">ITALIANO</a>
              </li>
              <li>
                <a href="/">Français</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/">
              <img
                style={{ marginRight: "10px" }}
                src="/images/Icons/user.png"
                alt="sign-in"
              />
              <span>SIGN IN</span>
            </a>
          </li>
          <li>
            <a className="special" href="/">
              GET EPIC GAMES
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default mainNavigationDesktop;
