import React from "react";
import "./LangSideDrawer.css";
const langSideDrawer = (props) => {
  return (
    <div className="lang">
      <div className="close" onClick={props.isOpen}>
        <p>{"<"}</p>
        <p>ENGLISH</p>
      </div>
      <ul className="lang__links">
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
    </div>
  );
};

export default langSideDrawer;
