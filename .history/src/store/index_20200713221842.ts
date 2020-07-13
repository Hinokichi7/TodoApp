import Vue from 'vue';
import Vuex from 'vuex';
import todos from './todoItem';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
  },
  getters: {
    idToken(state: any) {
      return state.idToken;
    },
  },
  mutations: {
    idToken(state: any, idToken: string) {
      state.idToken = idToken;
    },
  },
  actions: {
  },
  modules: {
    todos,
  },
});
