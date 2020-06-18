import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

  // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArv15xOLXoq3FWhlh_-l6ae2KaHC8HUKg",
  authDomain: "todoapp-8da1b.firebaseapp.com",
  databaseURL: "https://todoapp-8da1b.firebaseio.com",
  projectId: "todoapp-8da1b",
  storageBucket: "todoapp-8da1b.appspot.com",
  messagingSenderId: "617927059044",
  appId: "1:617927059044:web:4391c7671b0fca6fd62171"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})