import React from 'react';
import ShowWrapper from '../components/ShowWrapper'
import {ShowDetails} from './ShowDetails';

const Show = React.createClass({
  
  componentDidMount() {
    this.props.actions.fetchShow(this.props.params.showId);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.show && !this.props.show) {
      document.title = nextProps.show.title + " - " + document.title;
    }
  },

  render() {
    const show = this.props.show;

    const coverStyle = {
      background: show ? 'url(' + show.images.fanart.full + ')' : '',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 25%',
      backgroundSize: 'cover'
    };

    if(!show){
      return <div className={this.props.className + " show-view"}></div>
    }

    return (
      <div className={this.props.className + " show-view"}>
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