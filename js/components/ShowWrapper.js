import React from 'react';
import { Footer } from './Footer';

// This is a high order component that will enhance the 'Component'
function ShowWrapper(Component){
  return React.createClass({
    displayName: 'ShowWrapper',

    render() {
      return (
        <div className="app-wrapper">
          <Component className="content" {...this.props}/>
          {this.props.show ? <Footer /> : null}
        </div>
      )
    }
  });
}

export default ShowWrapper;