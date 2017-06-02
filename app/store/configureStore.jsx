// var redux = require('redux');
import * as redux from 'redux'; // import all properties and methods from redux, which doesn't have a default
import thunk from 'redux-thunk'; // Redux middleware

import {searchTextReducer, showCompletedReducer, todosReducer, authReducer} from 'reducers';

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    // Tell Redux which store property is linked to which reducer
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer,
    auth: authReducer
  });

  // redux.compose() is for middleware
  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
