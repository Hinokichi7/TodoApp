import firebase from 'firebase';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
// import Signin from '../components/Signin.vue';
import Auth from '../components/Auth.vue';
import Database from '../components/database.vue';
import store from '../store/index';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/Auth',
    name: 'Auth',
    component: Auth,
  },
  // {
  //   path: '/',
  //   name: 'Database',
  //   component: Database,
  // },
];

const router = new VueRouter({
  routes,
});


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        if (user.emailVerified) {
          next();
          console.log(user.emailVerified);
        } else {
          next('/Auth');
          console.log(user?.emailVerified);
        }
      } else {
        // No user is signed in.
        next('/Auth');
      }
    });
  } else {
    next();
  }
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     const user = firebase.auth().currentUser;
//     if (user) {
//       // User is signed in.
//       next();
//     } else {
//       // No user is signed in.
//       // Confirm the link is a sign-in with email link.
//       const linkUser = firebase.auth().isSignInWithEmailLink(window.location.href);
//       console.log('■■■■■■■■■■■■');
//       console.log('未ログイン状態');
//       console.log('■■■■■■■■■■■■');
//       console.log('■■■■■■■■■■■■');
//       console.log('リンク経由？', linkUser);
//       console.log('■■■■■■■■■■■■');
//       if (linkUser) {
//         console.log('PATTERN 1');
//         const email = window.localStorage.getItem('emailForSignIn') as string;
//         console.log('PATTERN 1-1', email);
//         firebase.auth().signInWithEmailLink(email, window.location.href)
//           .then((result) => {
//             console.log('PATTERN 2');
//             window.localStorage.removeItem('emailForSignIn');
//             console.log('登録成功？？？', result);
//             // const loginUser = firebase.auth().currentUser;
//             // let idToken = null;
//           firebase.auth().currentUser!.getIdToken(true).then((token) => {
//             // idToken = token;
//             store.commit('idToken', token);
//             console.log('IDトークン', token);
//           }).then(() => {
//             console.log('PATTERN 3');
//             next();
//           });
//           })
//           .catch((error) => {
//             console.log('PATTERN ERROR');
//             console.log(error);
//           });
//       } else {
//         console.log('PATTERN 4');
//         next('/Entry');
//       }
//     }
//   } else {
//     console.log('PATTERN 5');
//     next();
//   }
// });

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     console.log('ID TOKEN ===>', store.getters.idToken);
//     const user = firebase.auth().currentUser;
//     if (user !== null && user.emailVerified) {
//       next();
//       console.log('user is verified');
//     } else {
//       next('/Signin');
//       console.log('user is not verified');
//     }
//   } else {
//     next();
//   }
// });

export default router;
