import { fetchShow } from '../api';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as types from '../../constants/ActionTypes';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

describe('api', () => {

  const showId = 1234;
  const show = {ids: {trakt: showId}};
  const store = mockStore({show: {show: null, error: null, isFetching: false }});
  
  beforeEach(() => {
    store.clearActions();
  });
  
  it('makes sure that window.fetch is the one from the whatwg-fetch polyfill', () => {
    expect(window.fetch.polyfill).toBe(true); // When importing "api" should load the polyfill
    expect(fetchShow).toBeDefined();
  });
  
  it('calls request and failure actions if the fetch response was not successful', () => {

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(400, 'Test' +
      ' Error', '{"status":400, "statusText": Test Error!}')));

    return store.dispatch(fetchShow(showId))
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({'type': types.FETCH_SHOW_REQUEST});
        expect(expectedActions).toContainEqual({type: types.FETCH_SHOW_FAILURE,
          error: {status: 400, statusText: 'Test Error'}});
      })
  });

  it('calls request and success actions if the fetch response was successful', () => {
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, '{"ids":{"trakt":' + showId + '}}')));

    return store.dispatch(fetchShow(showId))
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({type: types.FETCH_SHOW_REQUEST});
        expect(expectedActions).toContainEqual({type: types.FETCH_SHOW_SUCCESS, show: show});
      })
  });
  
  it('does check if we already fetched that showId and only calls fetch if necessary', () => {
  
    const store = mockStore({show: {show: show, error: {}, isFetching: false }});
  
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve());
    
    store.dispatch(fetchShow(showId)); // Same id
    expect(window.fetch).not.toBeCalled();

    store.dispatch(fetchShow(showId + 1)); // Different id
    expect(window.fetch).toBeCalled();
  });
  
});