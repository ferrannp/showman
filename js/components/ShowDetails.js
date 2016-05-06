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
      <div className="hide-on-small-and-down">
        <img className="poster" src={show.images.poster.thumb}/>
        <p className="caption secondary">Data and images from Trakt.tv: <a href="https://trakt.tv/terms">
          Terms and conditions</a>
        </p>
      </div>
      <div className="summary">
        <h1>{show.title} <span className="secondary hide-on-small-and-down">- {show.year}</span></h1>
        <Rating rating={show.rating} votes={show.votes} />
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