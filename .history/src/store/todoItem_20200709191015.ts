import { ToDo } from '@/classes/todo';

export default {
  namespaced: true,
  state: {
    selectedId: null,
    todoId: null,
    // selectedTodo: null,
    // completedTodo: null,
  },
  getters: {
    // selectedToDo: (state: any) => state.todos.find((todo: ToDo) => todo.id === state.selecteId),
    selectedId: (state: any) => state.selectedId,
    todoId: (state: any) => state.todoId,
    // selectedTodo: (state: any) => state.selectedTodo,
  },
  mutations: {
    // completed(state: any, todo: ToDo) {
    //   state.completedTodo = todo;
    //   state.completedTodo.progress = 'completed';
    // },
    // deleteTodo(state: any, deleteTodo: ToDo) {
    //   state.todos = state.todos.filter((todo: ToDo) => todo !== deleteTodo);
    // },
    selectedId(state: any, id: Date) {
      state.selectedId = id;
    },
    addTodoId(state: any, todoId: string) {
      state.todoId = todoId;
    },
    // selectedTodo(state: any, selectedToDo: any) {
    //   state.selectedTodo = selectedToDo;
    // },
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
