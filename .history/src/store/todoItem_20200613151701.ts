import { ToDo } from '@/classes/todo';


export default {
  namespaced: true,
  state: {
    todos: [],
    nextId: 0,
    selectedId: null,
    targetPriority: [],
    targetProgress: [],
    completedTodo: null,
  },
  getters: {
    todos(state: any) {
      const n = 'new';
      const w = 'working';
      const c = 'completed';
      const p = 'pending';
      const d = 'discontined';
      let filterTodos: ToDo[] = state.todos;
      filterTodos = filterTodos.filter((todo: ToDo) =>
        state.targetPriority.length === 0 ? [1, 2, 3].includes(todo.priority) : state.targetPriority.includes(todo.priority));
      filterTodos = filterTodos.filter((todo: ToDo) =>
        state.targetProgress.length === 0 ? [n, w, c, p, d].includes(todo.progress) : state.targetProgress.includes(todo.progress));
      return filterTodos;
    },
    selectedToDo: (state: any) => state.todos.find((todo: ToDo) => todo.id === state.selectedId),
  },
  mutations: {
    addToDo(state: any, todo: ToDo) {
      if (state.selectedId === undefined) {
        const newToDo = todo;
        state.nextId += 1;
        newToDo.id = state.nextId;
        state.todos.push(newToDo);
      } else {
        const overwriteToDo = todo;
        overwriteToDo.id = state.selectedId;
      }
    },
    targetPriority(state: any, targetPriority: number[]) {
      state.targetPriority = targetPriority;
    },
    targetProgress(state: any, targetProgress: string[]) {
      state.targetProgress = targetProgress;
    },
    completed(state: any, todo: ToDo) {
      state.completedTodo = todo;
      state.completedTodo.progress = 'completed';
    },
    deleteTodo(state: any, deleteTodo: ToDo) {
      state.todos = state.todos.filter((todo: ToDo) => todo !== deleteTodo);
    },
    selected(state: any, id: number) {
      state.selectedId = id;
    },
    resetSelected(state: any) {
      state.selectedId = undefined;
    },
    sortToDo(state: any, sortOption: string) {
      const defaultFunc = function (a: any, b: any, key: any) {
        if (a[key] < b[key]) {
          return -1;
        }
        return 1;
      };
      switch (sortOption) {
        case 'createTime':
          state.todos.sort((a: any, b: any) => defaultFunc(a, b, 'createTime'));
          break;
        case 'deadline':
          state.todos.sort((a: any, b: any) => defaultFunc(a, b, 'deadline'));
          break;
        case 'priority':
          state.todos.sort((a: any, b: any) => defaultFunc(a, b, 'priority'));
          break;
        default:
      }
    },
  },
  actions: {
    addToDo(context: any, todo: ToDo) {
      context.commit('addToDo', todo);
      // context.commit('incrementId');
    },
    selected(context: any, id: number) {
      context.commit('selected', id);
    },
    resetSelected(context: any) {
      context.commit('resetSelected');
    },
    // doneTodo(context: any, todo: ToDo) {
    //   context.commit('doneTodo', todo);
    // },
    sortToDo(context: any, sortOption: string) {
      context.commit('sortToDo', sortOption);
    },
  },
};
