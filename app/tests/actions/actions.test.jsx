import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

var actions = require('actions');

// Create mock store; a generator to create stores (1 per test requiring a mock store)
// Pass in an array of middleware (thunk only for now)
var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'some search text'
    };

    var res = actions.setSearchText(action.searchText);
    expect(res).toEqual(action);

  });

  it('should generate toggle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };

    var res = actions.toggleShowCompleted();
    expect(res).toEqual(action);
  });

  it('should generate addTodo action', () => {
    var action = {
      type: 'ADD_TODO',
      todo: {
        id: '123abc',
        text: 'Anything we like',
        completed: false,
        createdAt: 0
      }
    };

    var res = actions.addTodo(action.todo);
    expect(res).toEqual(action);
  });

  // Let mocha know this is an asynchronous test via 'done' param.  Mocha shouldn't stop listening for assertions/errors until done() is called
  it('should create todo and dispatch ADD_TODO', (done) => {
    const store = createMockStore({}); // empty store
    const todoText = 'My todo item';

    // startAddTodo() is sending off a new todo to firebase, and the promise should then update our store...but we use a mock store for testing
    store.dispatch(actions.startAddTodo(todoText)).then(() => {
      const actions = store.getActions(); // getActions() returns an array of all the actions fired on our mock store

      expect(actions[0]).toInclude({
        type: 'ADD_TODO'
      });

      expect(actions[0].todo).toInclude({
        text: todoText
      });

      done(); // Tell karma the test is done

    }).catch(done);
  });

  it('should generate addTodos action', () => {
    var todos = [
      {
        id: '111',
        text: 'anything',
        completed: false,
        completedAt: undefined,
        createdAt: 33000
      }
    ];

    var action = {
      type: 'ADD_TODOS',
      todos
    };

    var res = actions.addTodos(todos);
    expect(res).toEqual(action);

  });

  it('should toggle todo', () => {
    var action = {
      type: 'TOGGLE_TODO',
      id: '123'
    };

    var res = actions.toggleTodo(action.id);
    expect(res).toEqual(action);
  });

});
