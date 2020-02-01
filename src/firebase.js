import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDyJ8b6-qxqz2leigLC34-rMK5zAjFgXxg",
    authDomain: "kapda-55e97.firebaseapp.com",
    databaseURL: "https://kapda-55e97.firebaseio.com",
    projectId: "kapda-55e97",
    storageBucket: "kapda-55e97.appspot.com",
    messagingSenderId: "841617051608",
    appId: "1:841617051608:web:c5111d65430986a64decad",
    measurementId: "G-GBBF72QJKF"
  };
firebase.initializeApp(firebaseConfig);

export default firebase;