import { ToDo } from '@/classes/todo';

export default {
  namespaced: true,
  state: {
    todos: [],
    // nextId: 0,
    // beforeId: 'first',
    selectedId: null,
    selectedTodo: null,
    // targetPriority: [],
    // targetProgress: [],
    completedTodo: null,
  },
  getters: {
    // todos: (state: any) => state.todos,
    // todos(state: any) {
    //   const n = 'new';
    //   const w = 'working';
    //   const c = 'completed';
    //   const p = 'pending';
    //   const d = 'discontined';
    //   let filterTodos: ToDo[] = state.todos;
    //   filterTodos = filterTodos.filter((todo: ToDo) =>
    //     state.targetPriority.length === 0 ? [1, 2, 3].includes(todo.priority) : state.targetPriority.includes(todo.priority));
    //   filterTodos = filterTodos.filter((todo: ToDo) =>
    //     state.targetProgress.length === 0 ? [n, w, c, p, d].includes(todo.progress) : state.targetProgress.includes(todo.progress));
    //   return filterTodos;
    // },
    // selectedToDo: (state: any) => state.todos.find((todo: ToDo) => todo.id === state.selecteId),
    selectedId: (state: any) => state.selectedId,
    selectedTodo: (state: any) => state.selectedTodo,
    // beforeId: (state: any) => state.beforeId,
  },
  mutations: {
    // addToDo(state: any, todo: ToDo) {
    //   if (state.selectedId === undefined) {
    //     const newToDo = todo;
    //     state.nextId += 1;
    //     newToDo.id = state.nextId;
    //     state.todos.push(newToDo);
    //   } else {
    //     const overwriteToDo = todo;
    //     overwriteToDo.id = state.selectedId;
    //   }
    // },
    // getTodo(state: any, todos: ToDo[]) {
    //   state.todos = todos;
    // },
    // targetPriority(state: any, targetPriority: number[]) {
    //   state.targetPriority = targetPriority;
    // },
    // targetProgress(state: any, targetProgress: string[]) {
    //   state.targetProgress = targetProgress;
    // },
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
    selectedTodo(state: any, selectedToDo: any) {
      state.selectedTodo = selectedToDo;
    },
    resetSelected(state: any) {
      state.selectedId = null;
    },
    // beforeId(state: any, beforeId: string) {
    //   state.countId = beforeId;
    // },
    // sortToDo(state: any, sortOption: string) {
    //   const defaultFunc = function (a: any, b: any, key: any) {
    //     if (a[key] < b[key]) {
    //       return -1;
    //     }
    //     return 1;
    //   };
    //   switch (sortOption) {
    //     case 'createTime':
    //       state.todos.sort((a: any, b: any) => defaultFunc(a, b, 'createTime'));
    //       break;
    //     case 'deadline':
    //       state.todos.sort((a: any, b: any) => defaultFunc(a, b, 'deadline'));
    //       break;
    //     case 'priority':
    //       state.todos.sort((a: any, b: any) => defaultFunc(a, b, 'priority'));
    //       break;
    //     default:
    //   }
    // },
    // filterTodo(state: any, targetPriority: number[], targetProgress: string[]) {
    //   state.todos.filter((todo: ToDo) => targetPriority.includes(todo.priority));
    //   state.todos.filter((todo: ToDo) => targetProgress.includes(todo.progress));
    // },
  },
  actions: {
    // addToDo(context: any, todo: ToDo) {
    //   context.commit('addToDo', todo);
    //   // context.commit('incrementId');
    // },
    resetSelected(context: any) {
      context.commit('resetSelected');
    },
    // sortToDo(context: any, sortOption: string) {
    //   context.commit('sortToDo', sortOption);
    // },
    // targetPriority(context: any, targetPriority: number[]) {
    //   context.commit('filterTodo', targetPriority);
    // },
    // targetProgress(context: any, targetProgress: string[]) {
    //   context.commit('filterTodo', targetProgress);
    // },
  },
};
