import React from 'react'
import {Router, Route, browserHistory} from 'react-router'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {Provider} from 'react-redux'

import reducers from './reducers'
import App from './components/App'
import ShowContainer from './containers/ShowContainer'

const store = createStore(
  combineReducers({
      ...reducers
    },
  ),
  applyMiddleware(
    thunkMiddleware, // Let us dispatch() functions (like async calls)
  )
);

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
      <Route path="shows/:showId" component={ShowContainer}/>
    </Router>
  </Provider>
)