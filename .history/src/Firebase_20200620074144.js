// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyArv15xOLXoq3FWhlh_-l6ae2KaHC8HUKg',
  authDomain: 'todoapp-8da1b.firebaseapp.com',
  databaseURL: 'https://todoapp-8da1b.firebaseio.com',
  projectId: 'todoapp-8da1b',
  storageBucket: 'todoapp-8da1b.appspot.com',
  messagingSenderId: '617927059044',
  appId: '1:617927059044:web:4391c7671b0fca6fd62171',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
