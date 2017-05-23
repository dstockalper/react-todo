var React                                    = require('react');
var ReactDOM                                 = require('react-dom');
// Provider lets you provide the store to its children so that they have access to the state and can dispatch actions
var {Provider}                               = require('react-redux');
var {hashHistory} = require('react-router');


var actions = require('actions');
var store   = require('configureStore').configure();
import firebase from 'app/firebase/';
import router from 'app/router';

// auth() returns an obj w fcns.
firebase.auth().onAuthStateChanged((user) => { // Called every time state changes
	if(user) {  // If user argument is present we know someone logged in. Else, they logged out.
		hashHistory.push('/todos'); // Swap out the URL with something new
	} else {
		hashHistory.push('/');
	}
});

// Listen to changes on my store
// store.subscribe(() => {
// 	var state = store.getState();
// 	console.log("New state", state);
// 	TodoAPI.setTodos(state.todos);
// });

// var initialTodos = TodoAPI.getTodos();
// store.dispatch(actions.addTodos(initialTodos));

store.dispatch(actions.startAddTodos());

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');



ReactDOM.render(
	<Provider store={store}>
		{router}
	</Provider>,
	document.getElementById('app')
);
