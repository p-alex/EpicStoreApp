import React from "react";

const nowAvailableSliderContent = (props) => {
  return (
    <React.Fragment>
      <div
        className="slider-newgames__image"
        // style={{
        //   background:
        //     "url(" +
        //     props.sliderData[props.slideNumber - 1].imgURLVertical +
        //     ") no-repeat center top/cover",
        // }}
      >
        {props.sliderData.map((item, id) => {
          return (
            <React.Fragment key={id}>
              <img
                draggable="false"
                className="sliderHorizontalImg"
                style={{
                  transform:
                    "translateX(-" + (props.slideNumber - 1) * 100 + "%)",
                }}
                src={item.imgURL}
              />
              <img
                draggable="false"
                className="sliderVerticalImg"
                style={{
                  transform:
                    "translateX(-" + (props.slideNumber - 1) * 100 + "%)",
                }}
                src={item.imgURLVertical}
              />
            </React.Fragment>
          );
        })}
      </div>
      <div className="slider-newgames__content-container">
        <div>
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
                <p>
                  {props.desc.length > 125
                    ? props.desc.slice(
                        0,
                        props.desc.slice(0, 125).lastIndexOf(" ")
                      ) + "[...]"
                    : props.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="slider-newgames__learn">
          <a href={props.linkURL}>{props.linkName}</a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default nowAvailableSliderContent;
