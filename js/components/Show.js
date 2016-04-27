import React from 'react';
import { Link } from 'react-router';

const Show = React.createClass({

  componentDidMount() {
    this.props.actions.fetchShow(this.props.params.showId);
  },

  render() {
    return (
      <div>
        <h1>Show page, id: {this.props.params.showId}</h1>
        {this.props.isFetching ? <p>Fetching...</p> : null}
        <p>{this.props.show ? JSON.stringify(this.props.show) : null}</p>
        <Link to="/">Redirect</Link>
      </div>
    );
  }
});

export default Show;