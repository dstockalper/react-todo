import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase';
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

  it('should generate update todo action', () => {
    var action = {
      type: 'UPDATE_TODO',
      id: '123',
      updates: {
        completed: false
      }
    };

    var res = actions.updateTodo(action.id, action.updates);
    expect(res).toEqual(action);
  });


  it('should generate login action object', () => {
    const action = {
      type: 'LOGIN',
      uid: '123abc'
    };

    const res = actions.login(action.uid);

    expect(res).toEqual(action);
  });

  it('should generate logout action object', () => {
    const action = {
      type: 'LOGOUT'
    }

    const res = actions.logout();

    expect(res).toEqual(action);
  });

  describe('Tests with firebase todos', () => {
    var testTodoRef;
    var uid;
    var todosRef;

    // mocha methods beforeEach() and afterEach()
    beforeEach((done) => {
      firebase.auth().signInAnonymously().then((user) => {
        uid      = user.uid;
        todosRef = firebaseRef.child(`users/${uid}/todos`);

        return todosRef.remove();
      }).then(() => {
        testTodoRef = todosRef.push();

        testTodoRef.set({
          text: 'Something to do',
          completed: false,
          createdAt: 67899
        });
      })
      .then(() => done())
      .catch(done);
    });

    afterEach((done) => {
      todosRef.remove().then(() => done());
    });

    it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({auth: {uid}});
      const action = actions.startToggleTodo(testTodoRef.key, true);

      store.dispatch(action).then(() => {
        const mockActions = store.getActions(); // getActions() is from the redux-mock-store library

        expect(mockActions[0]).toInclude({ // Don't use .toEqual() here because we won't have the timestamp
          type: 'UPDATE_TODO',
          id: testTodoRef.key
        });
        expect(mockActions[0].updates).toInclude({ // Don't use .toEqual() here because we won't have the timestamp
          completed: true
        });
        expect(mockActions[0].updates.completedAt).toExist();

        done();
      }, done);
    });

    it('should populate todos and dispatch ADD_TODOS', (done) => {
      const store = createMockStore({auth: {uid}});
      const action = actions.startAddTodos();

      store.dispatch(action).then(() => {
        const mockActions = store.getActions(); // getActions() is from the redux-mock-store library.  It's an array of all actions that have been dispatched

        expect(mockActions[0].type).toEqual('ADD_TODOS');
        expect(mockActions[0].todos.length).toEqual(1);
        expect(mockActions[0].todos[0].text).toEqual('Something to do');

        done();
      }, done);
    });

    // Let mocha know this is an asynchronous test via 'done' param.  Mocha shouldn't stop listening for assertions/errors until done() is called
    it('should create todo and dispatch ADD_TODO', (done) => {
      const store = createMockStore({auth: {uid}});
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

  });

});
