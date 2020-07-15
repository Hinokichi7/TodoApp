import Vue from 'vue';
import Vuex from 'vuex';
import todos from './todoItem';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        idToken: null,
    },
    getters: {
        idToken: function (state) {
            return state.idToken;
        },
    },
    mutations: {
        idToken: function (state, idToken) {
            state.idToken = idToken;
        },
    },
    actions: {},
    modules: {
        todos: todos,
    },
});
//# sourceMappingURL=index.js.map