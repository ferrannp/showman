import React from 'react';
import { Link } from 'react-router';

const Show = React.createClass({

  componentDidMount() {
    this.props.actions.fetchShow(this.props.params.showId);
  },

  render() {
    return (
      <div className="show-component">
        <div className="cover"/>
        <section className="details">
          <h1>Show page, id: {this.props.params.showId}</h1>
          {this.props.isFetching ? <p>Fetching...</p> : null}
          <p>{this.props.show ? JSON.stringify(this.props.show) : null}</p>
          {this.props.error ? <p>{this.props.error.statusText}</p> : null}
          <Link to="/">Redirect</Link>
        </section>
      </div>
    );
  }
});

export default Show;