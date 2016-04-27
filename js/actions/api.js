import * as types from '../constants/ActionTypes'
import { TRAKT_API_KEY } from '../secrets'

function receiveShowSuccess(show) {
  return {
    type: types.FETCH_SHOW_SUCCESS,
    show: show
  }
}

function receiveShowFailure(error) {
  return {
    type: types.FETCH_SHOW_FAILURE,
    error: error
  }
}

function checkResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    throw new Error(response.status);
  }
}

export function fetchShow(showId) {
  var initFetch = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'trakt-api-version': '2',
      'trakt-api-key': TRAKT_API_KEY
    }
  };
  
  return (dispatch, getState) => {
    const show = getState().show.show;
    if(show && (show.ids.slug === showId || show.ids.trakt === showId)) {
      return; // No need to fetch
    }
    dispatch((function(){return {type: types.FETCH_SHOW_REQUEST}}()));
    return fetch('https://api-v2launch.trakt.tv/shows/' + showId, initFetch)
      .then(checkResponse)
      .then(response => response.json())
      .then(json => dispatch(receiveShowSuccess(json)))
      .catch(error => dispatch(receiveShowFailure(error)))
  }
}