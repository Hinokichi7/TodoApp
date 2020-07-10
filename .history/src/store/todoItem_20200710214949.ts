import { ToDo } from '@/classes/todo';

export default {
  namespaced: true,
  state: {
    selectedId: null,
    selectedTodo: null,
    completedTodo: null,
  },
  getters: {
    // selectedToDo: (state: any) => state.todos.find((todo: ToDo) => todo.id === state.selecteId),
    selectedId: (state: any) => state.selectedId,
    selectedTodo: (state: any) => state.selectedTodo,
  },
  mutations: {
    completed(state: any, todo: ToDo) {
      state.completedTodo = todo;
      state.completedTodo.progress = 'completed';
    },

    selectedId(state: any, id: string) {
      state.selectedId = id;
    },
    selectedTodo(state: any, selectedTodo: any) {
      state.selectedTodo = selectedTodo;
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
