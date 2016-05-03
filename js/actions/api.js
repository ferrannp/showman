import 'whatwg-fetch';
import * as types from '../constants/ActionTypes'

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
    throw {status: response.status, statusText: response.statusText};
  }
}

export function fetchShow(showId) {
  return (dispatch, getState) => {
    const show = getState().show.show;
    if(show && (show.ids.slug === showId || show.ids.trakt === showId)) {
      return; // No need to fetch
    }
    dispatch((function(){return {type: types.FETCH_SHOW_REQUEST}}()));
    return fetch('/api/shows/' + showId)
      .then(checkResponse)
      .then(response => response.json())
      .then(json => dispatch(receiveShowSuccess(json)))
      .catch(error => dispatch(receiveShowFailure(error)))
  }
}