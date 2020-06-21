import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import TrySignin from '../components/trySignin.vue';
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
    console.log('ID TOKEN ===>', store.getters.idToken);
    if (store.getters.idToken === null) {
      next('/Signin');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
