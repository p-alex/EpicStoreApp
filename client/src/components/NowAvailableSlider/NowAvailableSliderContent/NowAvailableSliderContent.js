import React, {Component} from 'react';

class NowAvailableSliderContent extends Component {
  render () {
    return (
      <React.Fragment>
        <div
          className="slider-newgames__image"
          id="sliderTrack"
          // style={{
          //   background:
          //     "url(" +
          //     this.props.sliderData[this.props.slideNumber - 1].imgURLVertical +
          //     ") no-repeat center top/cover",
          // }}
        >
          <div className="arrow left-arrow" onClick={this.props.leftHandler}>
            <i className="fas fa-arrow-left" />
          </div>
          <div className="arrow right-arrow" onClick={this.props.rightHandler}>
            <i className="fas fa-arrow-right" />
          </div>
          {this.props.sliderData.map ((item, id) => {
            return (
              <React.Fragment key={id}>
                <div className="slider-newgames__image-container">
                  <img
                    draggable="false"
                    className="sliderHorizontalImg"
                    alt={id}
                    id="slide"
                    style={{
                      transform: 'translateX(-' +
                        (this.props.slideNumber - 1) * 100 +
                        '%)',
                    }}
                    src={item.imgURL}
                  />
                </div>

              </React.Fragment>
            );
          })}
        </div>
        <div className="slider-newgames__content-container">
          <div>
            <div className="slider-newgames__controls">
              <div className="slider-newgames__arrows">
                <p onClick={this.props.leftHandler}>{'<'}</p>
                <p onClick={this.props.rightHandler}>{'>'}</p>
              </div>
              <div className="slider-newgames__dots">
                {this.props.sliderData.map ((item, id) => {
                  return (
                    <div
                      className="dot-container"
                      key={id}
                      onClick={() => this.props.dotHandler (id + 1)}
                    >
                      <div
                        className={
                          this.props.slideNumber === id + 1
                            ? 'dot dot-active'
                            : 'dot'
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="slider-newgames__content">
              <div>
                <p className="content__status">{this.props.status}</p>
                <div className="content__info">
                  <h1>{this.props.name}</h1>
                  <p>
                    {this.props.desc.length > 125
                      ? this.props.desc.slice (
                          0,
                          this.props.desc.slice (0, 125).lastIndexOf (' ')
                        ) + '[...]'
                      : this.props.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="slider-newgames__learn">
            <a href={this.props.linkURL}>
              {this.props.linkName}
              <i
                style={{position: 'relative', left: '8px', fontSize: '12px'}}
                className="fas fa-arrow-right"
              />
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NowAvailableSliderContent;
