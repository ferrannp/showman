import React from 'react';
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

  componentWillUnmount() {
    if (this.prop.show) {
      document.title = document.title.split(" - ")[1];
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

    return (
      <div className="show-component">
        <div className="cover">
          <div style={show ? coverStyle : null}/>
        </div>
        <div className="details">
          {show ?
            <div className="card details-body">
              <ShowDetails show={show}/>
            </div>
            : null}
        </div>
      </div>
    );
  }
});

export default Show;