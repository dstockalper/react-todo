// thunk middleware allows our action generators to return fcns (where we can run async code) instead of objects.
import firebase, {firebaseRef, githubProvider} from 'app/firebase/'; // don't need filename because it goes to index.js by default
import moment from 'moment';

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
};

// Asynchronous action startAddTodo()
// dispatch: (available via thunk middleware) allows us to dispatch actions after data is saved (to Firebase)
// getState: to get current state of our redux store
export var startAddTodo = (text) => {
  return (dispatch, getState) => {
    // Build todo obj
    var todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    };

    var uid = getState().auth.uid;
    // Save data to firebase
    var todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo);  // .set() by default

    // Save what was returned from firebase to our redux store
    return todoRef.then(() => {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key // Add an ID key to the todo {} built above
      }));
      console.log('todo added to store', todoRef.key);
    });
  };
};

export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  };
};

export var startAddTodos = () => {
  return (dispatch, getState) => {

    var uid = getState().auth.uid;

    var todosRef = firebaseRef.child(`users/${uid}/todos`);

    return todosRef.once('value').then((snapshot) => {
      var todos = snapshot.val() || {};
      var parsedTodos = [];

      // Firebase stores arrays as objects.  Convert to array for our redux store.
      Object.keys(todos).forEach((todoId) => {
        parsedTodos.push({
          id: todoId,
          ...todos[todoId]
        });
      });

      dispatch(addTodos(parsedTodos));
    });
  };
};

export var updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  };
};

export var startToggleTodo = (id, completed) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
    var updates = {
      completed,
      completedAt: completed ? moment().unix() : null
    };


    return todoRef.update(updates).then(() => {
      dispatch(updateTodo(id, updates))
    });
  }
};

export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export var startLogin = () => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(githubProvider).then((result) => {
      console.log('Auth worked', result);
    }, (e) => {
      console.log('Unable to auth', e);
    });
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
      console.log('Logged out');
    });
  }
}
