// Configure our middleware and routes for export to app.js
import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import TodoApp from 'TodoApp';
import Login from 'Login';
import firebase from 'app/firebase';

// React Router middleware
var requireLogin = (nextState, replace, next) => {
	if(!firebase.auth().currentUser) { // currentUser() is null if no one logged in
		replace('/'); // send back to root route.  replace() works much like hashHistory.push()
	}
	next(); // Tell react router middleware we're done
}

var redirectIfLoggedIn = (nextState, replace, next) => {
	if(firebase.auth().currentUser) {
		replace('/todos');
	}
	next();
}

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
      <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
    </Route>
  </Router>
);
