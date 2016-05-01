import React from 'react';
import { ShowDetails } from './ShowDetails';

const Show = React.createClass({
  
  componentDidMount() {
    this.props.actions.fetchShow(this.props.params.showId);
  },
  
  render() {
    const show = this.props.show;

    const coverStyle = {
      background: show ? 'url(' + show.images.fanart.full +')' : '',
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
          <div className="card details-body">
            {show ? <ShowDetails show={show}/> : null}
          </div>
        </div>
      </div>
    );
  }
});

export default Show;