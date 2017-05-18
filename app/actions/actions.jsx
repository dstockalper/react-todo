// thunk middleware allows our action generators to return fcns (where we can run async code) instead of objects.
import firebase, {firebaseRef} from 'app/firebase/'; // don't need filename because it goes to index.js by default
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

    // Save data to firebase
    var todoRef = firebaseRef.child('todos').push(todo);  // .set() by default

    // Save what was returned from firebase to our redux store
    return todoRef.then(() => {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key // Add an ID key to the todo {} built above
      }));
    });
  };
};

export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  };
};

export var toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};
