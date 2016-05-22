import React from 'react';
import ShowWrapper from '../components/ShowWrapper'
import {ShowDetails} from './ShowDetails';
import Helmet from "react-helmet";

const Show = React.createClass({
  
  componentDidMount() {
    this.props.actions.fetchShow(this.props.params.showId);
  },

  render() {
    const show = this.props.show;

    const coverStyle = {
      background: show ? 'url(' + show.images.fanart.full + ')' : '',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 25%',
      backgroundSize: 'cover'
    };

    if (!show) {
      return <div className={this.props.className + " show-view"}></div>
    }

    return (
      <div className={this.props.className + " show-view"}>
        <Helmet
          title={show.title}
          meta={[
            {"name": "description", "title": show.title || "Showman"},
            {"property": "og:description", "content": show.overview},
            {"property": "og:image", "content": show.images.poster.thumb ?
            show.images.poster.thumb : require('../../assets/favicon_192.png')}
          ]}
        />
        <div className="cover">
          <div style={show ? coverStyle : null}></div>
        </div>
        <div className="details">
          <div className="card details-body">
            <ShowDetails show={show}/>
          </div>
        </div>
      </div>
    );
  }
});

export default ShowWrapper(Show);