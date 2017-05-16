var React      = require('react');
var ReactDOM   = require('react-dom');
var {Provider} = require('react-redux');
var TestUtils  = require('react-addons-test-utils');
var expect     = require('expect');
var $          = require('jQuery');

import {configure} from 'configureStore';
import ConnectedTodoList, {TodoList} from 'TodoList';
import ConnectedTodo, {Todo} from 'Todo';

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist();
  });

  it('should render 1 todo component for each todo item', () => {
    var todos = [
      {
        id: 1,
        text: 'Do something',
        completed: false,
        createdAt: 500,
        completedAt: undefined
      },
      {
        id: 2,
        text: 'Check mail',
        completed: false,
        createdAt: 500,
        completedAt: undefined
      }
    ];

    var store = configure({
      todos // Creat an initial state
    });

    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedTodoList/>
      </Provider>
    );

    var todoList        = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
    var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);  // How many of a given component are rendered under a separte component

    expect(todosComponents.length).toBe(todos.length);
  });

  it('should render empty message if no todos', () => {
    var todos    = [];
    var todoList = TestUtils.renderIntoDocument(<TodoList todos = {todos}/>);
    var $el      = $(ReactDOM.findDOMNode(todoList));

    expect($el.find('.container__message').length).toBe(1);

  });
});
