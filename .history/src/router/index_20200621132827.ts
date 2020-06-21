import firebase from 'firebase';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
// import TrySignin from '../components/trySignin.vue';
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
  // {
  //   path: '/',
  //   name: 'trySignin',
  //   component: TrySignin,
  // },
  {
    path: '/',
    name: 'Signin',
    component: Signin,
  },
  {
    path: '/Signin/Signup',
    name: 'Signup',
    component: Signup,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = firebase.auth().currentUser;
    if (user) {
      // User is signed in.
      next();
    } else {
      // No user is signed in.
      // Confirm the link is a sign-in with email link.
      if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }
        firebase.auth().signInWithEmailLink(email, window.location.href)
          .then((result) => {
            window.localStorage.removeItem('emailForSignIn');
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
