import firebase from 'firebase';
console.log('FIREBASE PLAYGROUND IS FIRING');

var config = {
  apiKey: "AIzaSyC-7oxHEd1F-QNFMi3rI9N3DxC_XgzvyvY",
  authDomain: "doug-react-todo-app.firebaseapp.com",
  databaseURL: "https://doug-react-todo-app.firebaseio.com",
  projectId: "doug-react-todo-app",
  storageBucket: "doug-react-todo-app.appspot.com",
  messagingSenderId: "758245226749"
};
firebase.initializeApp(config);

// Visualize the app's db as an object
// {
//   appName: 'Todo App',
//   isRunning: true
// }

var firebaseRef = firebase.database().ref();

// CRUD methods that work on the reference
// .set()
// .update()
// .remove() // You could also .update() to null
// .once() // Trigger and listen for an event at the reference
// .on() // Listen for changes in the db
// .off() // Turn off the .on()

// .push() // Create reference to a new item within an object.  You can then .set(), .remove(), .on() etc.  Because setting is so common after push() any object put directly in push() will be set()
// .child(propertyName) // To pinpoint the method on a particular property

// Events to listen for
// value: value of reference has changed
// child_added: child added to the reference
// child_changed
// child_removed


// Arrays: no such thing in firebase; use objects with id keys as proxies instead:
// {
//   app: {
//     name: 'Todo',
//     version: '1.0'
//   },
//   isRunning: true,
//   todos: {
//     '123abc': {
//       text: 'Watch vids'
//     },
//     '456def': {
//       text: 'Walk dog'
//     }
//   }
// }

// Set() method sets some values on our db.
firebaseRef.set({
  app: {
    name: 'Todo App',
    version: '1.0.0'
  },
  isRunning: true,
  user: {
    name: 'Charley',
    age: 6
  }
});

var todosRef = firebaseRef.child('todos');

todosRef.on('child_added', (snapshot) => {
  console.log('New todo fired', snapshot.key, snapshot.val());
});

todosRef.push({ text: 'Todo 1' });
todosRef.push({ text: 'Todo 2' });
