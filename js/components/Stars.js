import React from 'react';

function generateImageTag(key, name){
  return <img key={key} src={name} height="24"/>
}

export const Stars = (props) => {
  const rating = props.rating;
  const roundedRating = Math.round(rating);
  const max = 10;
  const full = require('../../assets/ic_star_24px.svg');
  const half = require('../../assets/ic_star_half_24px.svg');
  const empty = require('../../assets/ic_star_border_24px.svg');

  var images = [];
  for (let i=0;i<max;i++) {
    if(rating >= i+1){
      images.push(generateImageTag(i, full));
    } else if(roundedRating > i) {
      images.push(generateImageTag(i, half));
    } else {
      images.push(generateImageTag(i, empty));
    }
  }

  return (
    <div className="stars">
      {images}
    </div>
  )
};