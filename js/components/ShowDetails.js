import React from 'react';
import moment from 'moment-timezone';
import { Rating } from './Rating';
import { toStatusString } from '../util/traktUtil';
import getCountryName from '../util/countryNames';
import getLanguageName from '../util/languageNames';

export const ShowDetails = (props) => {

  const show = props.show;
  const genres = show.genres.map((genre) => {
    return genre.substring(0, 1).toUpperCase() + genre.slice(1);
  }).join(', ');

  const isAirTime = show.status && show.status !== 'ended';

  let showTime, localShowTime;
  if (isAirTime && show.airs.day && show.airs.time) {
    showTime = moment.tz(show.airs.time, 'HH:mm', show.airs.timezone);
    localShowTime = showTime.clone().tz(moment.tz.guess());
  }

  return (
    <section className="show-details">
      <div>
        <img className="poster hide-on-small-and-down" src={show.images.poster.thumb}/>
      </div>
      <div className="summary">
        <h1>{show.title} <span className="year hide-on-small-and-down">- {show.year}</span></h1>
        <div className="rating-container">
          <div className="rating-numbers">
            <p>
              <span className="rating">{show.rating.toFixed(1)}</span>
              <span className="total"> / 10</span>
              <span className="votes show-on-small-and-down"> ({show.votes} votes)</span>
            </p>
            <p className="votes hide-on-small-and-down">{show.votes} votes</p>
          </div>
          <Rating rating={show.rating}/>
        </div>
        <p>{show.overview}</p>
        <table>
          <tbody>
          <tr className="show-on-small-and-down">
            <td>Year</td>
            <td>{show.year}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{toStatusString(show.status)}
            </td>
          </tr>
          {isAirTime && showTime ?
            <tr>
              <td>Airs</td>
              <td>{show.airs.day + " at " + localShowTime.format('HH:mm') + ' (' +
              showTime.format('HH:mm zz') + ') on ' + show.network}
              </td>
            </tr>
            : null}
          {!isAirTime && show.network ?
            <tr>
              <td>Network</td>
              <td>{show.network}
              </td>
            </tr>
            : null}
          {show.runtime ?
            <tr>
              <td>Runtime</td>
              <td>{show.runtime + ' minutes'}</td>
            </tr>
            : null}
          {show.first_aired ?
            <tr>
              <td>Premiered</td>
              <td>{moment(show.first_aired).format('MMMM DD, YYYY')}</td>
            </tr>
            : null}
          {show.country ?
            <tr>
              <td>Country</td>
              <td>{getCountryName(show.country)}</td>
            </tr>
            : null }
          {show.language ?
            <tr>
              <td>Language</td>
              <td>{getLanguageName(show.language)}</td>
            </tr>
            : null }
          {genres ?
            <tr>
              <td>Genres</td>
              <td>{genres}</td>
            </tr>
            : null }
          </tbody>
        </table>
      </div>
    </section>
  )
};