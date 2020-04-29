import React from "react";

const nowAvailableSliderContent = (props) => {
  return (
    <React.Fragment>
      <div className="slider-newgames__image">
        {props.sliderData.map((item, id) => {
          return (
            <img
              key={id}
              style={{
                transform:
                  "translateX(-" + (props.slideNumber - 1) * 100 + "%)",
              }}
              src={item.imgURL}
            />
          );
        })}
      </div>
      <div className="slider-newgames__content-container">
        <div className="slider-newgames__controls">
          <div className="slider-newgames__arrows">
            <p onClick={props.leftHandler}>{"<"}</p>
            <p onClick={props.rightHandler}>{">"}</p>
          </div>
          <div className="slider-newgames__dots">
            {props.sliderData.map((item, id) => {
              return (
                <div
                  className="dot-container"
                  key={id}
                  onClick={() => props.dotHandler(id + 1)}
                >
                  <div
                    className={
                      props.slideNumber === id + 1 ? "dot dot-active" : "dot"
                    }
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="slider-newgames__content">
          <div>
            <p className="content__status">{props.status}</p>
            <div className="content__info">
              <h1>{props.name}</h1>
              <p>{props.desc.slice(0, 150)}</p>
            </div>
          </div>
          <div className="slider-newgames__learn">
            <a href={props.linkURL}>{props.linkName}</a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default nowAvailableSliderContent;
