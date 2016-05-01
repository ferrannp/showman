import {
  FETCH_SHOW_REQUEST,
  FETCH_SHOW_SUCCESS,
  FETCH_SHOW_FAILURE
} from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  show: null,
  error: null
};

function newState(state, partialState){
  return Object.assign({}, state, partialState);
}

export default function show(state = initialState, action) {
  switch (action.type) {
    case FETCH_SHOW_REQUEST:
      return initialState;
    case FETCH_SHOW_SUCCESS:
      return newState(state, {isFetching: false, show: action.show});
    case FETCH_SHOW_FAILURE:
      return newState(state, {isFetching: false, error: action.error});
    default:
      return state;
  }
}