var React = require('react');
var ReactDOM = require('react-dom');
// Access components from the react-router library (which we installed via npm install react-router)
// ES5 syntax
// var Route = require('react-router').Route;
// var Router = require('react-router').Router;

// ES6 "Destructuring" syntax
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');



ReactDOM.render(
	<p>Boilerplate 3 Project</p>,
	document.getElementById('app')
);
