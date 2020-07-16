import * as firebase from 'firebase/app';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false;

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
export const functions = firebase.functions();// eslint-disable-line

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
