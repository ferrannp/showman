import React from 'react';

export const ShowDetails = (props) => {

  const show = props.show;
  const genres = show.genres.map((genre) => {
    return genre.substring(0, 1).toUpperCase() + genre.slice(1);
  }).join(', ');

  return (
    <section className="show-details">
      <div>
        <img className="poster hide-on-small-and-down" src={show.images.poster.thumb}/>
      </div>
      <div className="summary">
        <h1>{show.title} <span className="hide-on-small-and-down">- {show.year}</span></h1>
        <p>{show.overview}</p>
        <table>
          <tbody>
          <tr className="show-on-small-and-down">
            <td>Year</td>
            <td>{show.year}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{show.status.substring(0, 1).toUpperCase() + show.status.slice(1)}</td>
          </tr>
          {show.status && show.status !== "ended" ?
            <tr>
              <td>Airs</td>
              <td>{show.airs.day + " at " + show.airs.time + " on " + show.network}</td>
            </tr>
            : null}
          <tr>
            <td>Genres</td>
            <td>{genres}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
};