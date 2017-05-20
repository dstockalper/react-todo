import firebase from 'firebase';

try {
  var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
  };

  var config = {
    apiKey: 'AIzaSyCzUhzgM0OcCuSqUyaT19vKaB_kmNr_egA',
    authDomain: 'todo-app-400eb.firebaseapp.com',
    databaseURL: 'https://todo-app-400eb.firebaseio.com',
    projectId: 'todo-app-400eb',
    storageBucket: 'todo-app-400eb.appspot.com',
    messagingSenderId: '215142164507'
  };

  firebase.initializeApp(config);
} catch(e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;
