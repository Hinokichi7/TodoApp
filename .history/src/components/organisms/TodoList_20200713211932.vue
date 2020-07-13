<template>
  <v-row>
    <v-col cols="12" sm="8" offset-sm="2">
        <v-toolbar prominent src="../../assets/414652_l.jpg" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>Todo List</v-toolbar-title>
              <v-spacer/>
              <v-btn class="mx-2" fab color="primary" small @click="showForm(true)">
              <v-icon>mdi-plus</v-icon>
              </v-btn>

              <v-dialog v-model="dialog">
                <todo-form v-if="dialog"
                  :todo="getSelectedTodo()"
                  :key="formCount"
                  @submit="saveTodo"
                  @close="onDialogClose"
                ></todo-form>
              </v-dialog>

        </v-toolbar>
    </v-col>

    <v-col cols="12" sm="8" offset-sm="2">
        <v-container class="lighten-2">
          <v-row justify="center">
          <v-col cols="3">
            <v-select :items="priorityItems" label="Pick Priority" multiple v-model="targetPriority" />
          </v-col>
          <v-col cols="4">
            <v-select :items="progressItems" label="Pick Progress" multiple v-model="targetProgress"/>
          </v-col>
          <v-col cols="4">
            <v-select :items="sortItems" label="Choose Sortitem" v-model="sortOption" />
          </v-col>

          </v-row>
        </v-container>
    </v-col>
    <v-col cols="12" sm="8" offset-sm="2">
        <v-card class="mx-auto">
          <v-list two-line subheader>
            <v-list-item v-for="(todo) in todos" :key="todo.id" @click="onSelect(todo.id)">
                <v-list-item-icon v-if="todo.progress !== 'completed'" @click="completed(todo.id, $event)">
                  <v-icon color="#4CAF50">mdi-check-circle-outline</v-icon>
                </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="todo.title" :style="{color: getPriorityColor(todo)}"/>
                <v-list-item-subtitle v-text="todo.progress"/>
                <v-list-item-subtitle class="text--primary" v-text="todo.deadline" />
                <v-list-item-subtitle v-text="todo.detail" />
                <v-list-item-subtitle v-text="todo.note" />
              </v-list-item-content>
              <v-list-item-icon color="#03A9F4" @click="deleteTodo(todo.id, $event)">
                  <v-icon>mdi-delete</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-card>
        <v-btn @click="sendMail">sendMail</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import firebase, { firestore } from 'firebase';
import { Component, Vue } from 'vue-property-decorator';
import { functions } from '../../plugins/firebase';
import { ToDo, ToDoItem } from '../../classes/todo';
import TodoForm from './TodoForm.vue';
@Component({
  components: {
    TodoForm,
  },
})
export default class TodoList extends Vue {
  currentUser = firebase.auth().currentUser!;
  db = firebase.firestore().collection('users')
    .doc(this.currentUser.email!).collection('todolist');
  todo: ToDo
  allTodos: any[] = []
  selectedId = '';
  formCount = 0
  dialog = false
  priorityItems = [1, 2, 3]
  progressItems = ['new', 'working', 'completed', 'pending', 'discontinued']
  targetPriority: number[] = [];
  targetProgress: string[] = [];
  sortItems = ['createdAt', 'deadline', 'priority']
  sortOption = ''
  priorityColors = {
    lv1: '#E91E63',
    lv2: '#F57C00',
    lv3: '#03A9F4',
    other: 'black',
  }

  async created() {
    await this.loadTodo();
  }

  async loadTodo() {
    const qSnapshot = await this.db.get();
    this.allTodos = qSnapshot.docs;
  }

  get todos() {
    let todos = this.allTodos.map((dSnapShot) => Object.assign(dSnapShot.data(), { id: dSnapShot.id }));
    if (this.targetPriority.length !== 0) {
      todos = todos.filter((todo: any) => this.targetPriority.includes(todo.priority));
    }
    if (this.targetProgress.length !== 0) {
      todos = todos.filter((todo: any) => this.targetProgress.includes(todo.progress));
    }
    const sortOp = this.sortOption;
    if (sortOp !== '') {
      if (this.sortOption === 'deadline' || 'createdAt') {
        todos.sort((a: any, b: any) => new Date(a[sortOp]).valueOf() - new Date(b[sortOp]).valueOf());
      } else {
        todos.sort((a: any, b: any) => a[sortOp] - b[sortOp]);
      }
    }
    return todos;
  }

  getSelectedTodo(): any {
    console.log('GET ===>', this.selectedId);
    if (this.selectedId === '') {
      return this.getNewTodo();
    }
    return this.todos.find((todo) => todo.id === this.selectedId);
  }

  getNewTodo() {// eslint-disable-line
    return {
      title: '',
      detail: '',
      note: '',
      priority: 1,
      deadline: this.getDate(),
      createdAt: new Date().toISOString(),
      progress: 'new',
    };
  }
  getDate() {// eslint-disable-line
    const dt = new Date();
    const y = dt.getFullYear();
    const m = `00${dt.getMonth() + 1}`.slice(-2);
    const d = `00${dt.getDate() + 1}`.slice(-2);
    // const d = (00' + dt.getDate()).slice(-2);
    const result = `${y}-${m}-${d}`;
    return result;
  }

  async onSelect(todoId: string) {
    this.showForm(false);
    this.selectedId = todoId;
  }

  saveTodo(todo: any) {// eslint-disable-line
    console.log('TODO===>', JSON.stringify(todo));
    if (this.selectedId === '') {
      this.createTodo(todo);
    } else {
      this.updateTodo(todo);
    }
    this.loadTodo();
  }

  async createTodo(todo: any) {
    await this.db.doc().set(todo);
  }

  async updateTodo(todo: any) {
    console.log('called update');
    await this.db.doc(this.selectedId)
      .update({
        title: todo.title,
        detail: todo.detail,
        note: todo.note,
        priority: todo.priority,
        deadline: todo.deadline,
        progress: todo.progress,
      });
  }
  async deleteTodo(todoId: string, evt: any) {
    evt.stopPropagation();
    await this.db.doc(todoId).delete();
    this.loadTodo();
  }

  showForm(reset: boolean) {
    this.dialog = true;
  }

  getPriorityColor(todo: ToDo) {
    switch (todo.priority) {
      case 1:
        return this.priorityColors.lv1;
      case 2:
        return this.priorityColors.lv2;
      case 3:
        return this.priorityColors.lv3;
      default:
        return this.priorityColors.other;
    }
  }
  onDialogClose() {
    this.dialog = false;
    this.formCount += 1;
    this.selectedId = '';
  }

  async completed(todoId: string, evt: any) {
    evt.stopPropagation();
    await this.db.doc(todoId)
      .update({
        progress: 'completed',
      });
    this.loadTodo();
  }

  getNearDeadline() {
  // const todos = this.allTodos.map((dSnapShot) =>dSnapShot.data());
    // const todoDeadlines: Date[]= this.allTodos.map((dsnaptshot) => dsnaptshot.data().deadline);
    const deadline = new Date(this.todo.deadline);
    console.log('deadline', deadline);
    const dt = new Date();

    const nearDeadlineTodo = this.db.where('deadline', '==', dt.setDate(deadline.getDate() - 1)).get();
    console.log(nearDeadlineTodo);
  }

  async sendMail() {
    const mailer = await functions.httpsCallable('sendMail');
  }
}
</script>
