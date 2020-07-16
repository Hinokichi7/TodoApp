import * as firebase from 'firebase/app';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
Vue.config.productionTip = false;
var firebaseConfig = {
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
new Vue({
    router: router,
    store: store,
    vuetify: vuetify,
    render: function (h) { return h(App); },
}).$mount('#app');
//# sourceMappingURL=main.js.map