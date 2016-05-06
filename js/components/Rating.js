import React from 'react';
import { Stars } from './Stars';

export const Rating = (props) => {
  return (
    <div className="rating-container">
      <div className="rating-numbers">
        <p>
          <span className="rating">{props.rating.toFixed(1)}</span>
          <span className="secondary"> / 10</span>
          <span className="secondary show-on-small-and-down"> ({props.votes} votes)</span>
        </p>
        <p className="secondary hide-on-small-and-down">{props.votes} votes</p>
      </div>
      <Stars rating={props.rating}/>
    </div>
  )
};