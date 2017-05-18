import firebase from 'firebase';

try {
  var config = {
    apiKey: "AIzaSyC-7oxHEd1F-QNFMi3rI9N3DxC_XgzvyvY",
    authDomain: "doug-react-todo-app.firebaseapp.com",
    databaseURL: "https://doug-react-todo-app.firebaseio.com",
    projectId: "doug-react-todo-app",
    storageBucket: "doug-react-todo-app.appspot.com",
    messagingSenderId: "758245226749"
  };

  firebase.initializeApp(config);
} catch(e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase; //
