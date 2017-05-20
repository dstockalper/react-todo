var React                                    = require('react');
var ReactDOM                                 = require('react-dom');
// Provider lets you provide the store to its children so that they have access to the state and can dispatch actions
var {Provider}                               = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var TodoApp = require('TodoApp');

var actions = require('actions');
var store   = require('configureStore').configure();
var TodoAPI = require('TodoAPI');

console.log('database_url', process.env.DATABASE_URL);
console.log('api key', process.env.API_KEY);

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
		<TodoApp/>
	</Provider>,
	document.getElementById('app')
);
