import React from 'react';

function generateImageTag(key, name){
  return <img key={key} src={"../assets/" + name + ".svg"} height="24"/>
}

export const Stars = (props) => {
  const rating = props.rating;
  const roundedRating = Math.round(rating);
  const max = 10;
  const full = 'ic_star_24px';
  const half = 'ic_star_half_24px';
  const empty = 'ic_star_border_24px';

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