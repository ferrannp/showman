import React from 'react';
import moment from 'moment-timezone';
import { Rating } from './Rating';
import { toStatusString } from '../util/traktUtil';
import getCountryName from '../util/countryNames';
import getLanguageName from '../util/languageNames';

function getRowIfExists(title, content, className) {
  if(!content) return null;
  return(
    <tr className={className || null}>
      <td>{title}</td>
      <td>{content}</td>
    </tr>
  )
}

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
        <p className="xs-caption secondary">Data and images from Trakt.tv: <a
          href="https://trakt.tv/terms">Terms and conditions</a>
        </p>
      </div>
      <div className="summary">
        <h1>{show.title} <span className="secondary hide-on-small-and-down">- {show.year}</span></h1>
        <Rating rating={show.rating} votes={show.votes} />
        <p>{show.overview}</p>
        <table>
          <tbody>
          {getRowIfExists('Year', show.year, 'show-on-small-and-down')}
          {getRowIfExists('Status', toStatusString(show.status))}
          {isAirTime ? getRowIfExists('Airs', show.airs.day + " at " + localShowTime.format('HH:mm')
            + ' (' + showTime.format('HH:mm zz') + ') on ' + show.network) : null}
          {!isAirTime ? getRowIfExists('Network', show.network) : null}
          {getRowIfExists('Runtime', show.runtime + ' minutes')}
          {show.first_aired ? getRowIfExists('Premiered', moment(show.first_aired).format('MMMM' +
            ' DD, YYYY')) : null}
          {show.country ? getRowIfExists('Country', getCountryName(show.country)) : null}
          {show.language ? getRowIfExists('Language', getLanguageName(show.language)) : null}
          {getRowIfExists('Genres', genres)}
          </tbody>
        </table>
      </div>
    </section>
  )
};