import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import * as firebase from 'firebase/app';
import 'firebase/auth';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyArv15xOLXoq3FWhlh_-l6ae2KaHC8HUKg',
  authDomain: 'todoapp-8da1b.firebaseapp.com',
  databaseURL: 'https://todoapp-8da1b.firebaseio.com',
  projectId: 'todoapp-8da1b',
  storageBucket: 'todoapp-8da1b.appspot.com',
  messagingSenderId: '617927059044',
  appId: '1:617927059044:web:4391c7671b0fca6fd62171',
  // Dynamic Links will start with
  appAssociation: 'AUTO',
  rewrites: [{ 'source': '/signupapp/**', 'dynamicLinks': true }],
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
