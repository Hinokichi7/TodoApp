import firebase from 'firebase';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Entry from '../components/Entry.vue';
import Signin from '../components/Signin.vue';
import Signup from '../components/Signup.vue';
import store from '../store/index';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    name: 'Entry',
    component: Entry,
  },
  {
    path: '/Signin',
    name: 'Signin',
    component: Signin,
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const linkUser = firebase.auth().isSignInWithEmailLink(window.location.href);
  const user = firebase.auth().currentUser;
  console.log('■■■■■■■■■■■■');
  console.log('未ログイン状態');
  console.log('■■■■■■■■■■■■');
  console.log('■■■■■■■■■■■■');
  console.log('リンク経由？', linkUser, user);
  console.log('■■■■■■■■■■■■');


  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = firebase.auth().currentUser;
    if (user) {
      // User is signed in.
      next();
    } else {
      // No user is signed in.
      // Confirm the link is a sign-in with email link.
      next('/');
    }
  } else {
    next();
  }
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     console.log('ID TOKEN ===>', store.getters.idToken);
//     if (store.getters.idToken === null) {
//       next('/Signin');
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
