import React from 'react'
import {Router, Route, browserHistory} from 'react-router'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {Provider} from 'react-redux'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'

import reducers from './reducers'
import App from './components/App'
import ShowContainer from './containers/ShowContainer'

const store = createStore(
  combineReducers({
      ...reducers,
      routing: routerReducer
    },
  ),
  applyMiddleware(
    thunkMiddleware, // Let us dispatch() functions (like async calls)
  )
);

// Syncs navigation with our store (react-router-redux)
const history = syncHistoryWithStore(browserHistory, store);

export default (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}/>
      <Route path="show/:showId" component={ShowContainer}/>
    </Router>
  </Provider>
)