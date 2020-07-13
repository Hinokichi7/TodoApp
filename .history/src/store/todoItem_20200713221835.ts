import { ToDo } from '@/classes/todo';

export default {
  namespaced: true,
  state: {
    completedTodo: null,
  },
  getters: {
  },
  mutations: {
    completed(state: any, todo: ToDo) {
      state.completedTodo = todo;
      state.completedTodo.progress = 'completed';
    },
    resetSelected(state: any) {
      state.selectedId = null;
    },
  },
  actions: {
    resetSelected(context: any) {
      context.commit('resetSelected');
    },
  },
};
