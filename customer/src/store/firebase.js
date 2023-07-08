import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBV7ZRaCOkuBNLgMIXPKFxwnFY9W_1EuNs",
  authDomain: "se-ict.firebaseapp.com",
  databaseURL: "https://se-ict-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "se-ict",
  storageBucket: "se-ict.appspot.com",
  messagingSenderId: "575212650297",
  appId: "1:575212650297:web:98ab9afb5caa5c2772f2e8"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

export {auth, db};