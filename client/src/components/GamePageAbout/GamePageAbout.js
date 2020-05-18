import React, {Component} from 'react';
import './GamePageAbout.css';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser';
class GamePageAbout extends Component {
  state = {
    showMore: false,
  };
  showMoreHandler = () => {
    if (!this.state.showMore) {
      this.setState({showMore: true});
    } else {
      this.setState({showMore: false});
    }
  };
  render() {
    return (
      <section className="game-page-about">
        <div className="game-page-about_section-title">
          <h3>About Game</h3>
        </div>
        <div
          className="game-page-about_desc-img"
          id="descImg"
          style={
            !this.state.showMore && this.props.screenshots.length >= 4
              ? {height: '600px'}
              : {height: 'auto', overflow: 'auto'}
          }
        >
          <p>{ReactHtmlParser(this.props.aboutGame)}</p>
          {this.props.screenshots.map((s, id) => {
            if (this.props.screenshots.length > 2) {
              if (id % 3 === 0) {
                return (
                  <img
                    src={`/images/${this.props.params}/${s}`}
                    style={{width: '100%'}}
                  />
                );
              } else {
                return (
                  <img
                    src={`/images/${this.props.params}/${s}`}
                    style={{width: '50%', padding: '4px'}}
                  />
                );
              }
            }
          })}
          {this.props.screenshots.length >= 4 ? (
            <span className="desc-img_show-more" onClick={this.showMoreHandler}>
              {this.state.showMore ? 'Show Less' : 'Show More'}
            </span>
          ) : null}
        </div>
      </section>
    );
  }
}

export default GamePageAbout;
