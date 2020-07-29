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
            <v-list-item v-for="(targetTodo) in todos" :key="targetTodo.id" @click="onSelect(targetTodo.id)">
                <v-list-item-icon v-if="targetTodo.progress !== 'completed'" @click="completed(targetTodo.id, $event)">
                  <v-icon color="#4CAF50">mdi-check-circle-outline</v-icon>
                </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="targetTodo.title" :style="{color: getPriorityColor(targetTodo)}"/>
                <v-list-item-subtitle v-text="targetTodo.progress"/>
                <v-list-item-subtitle class="text--primary" v-text="targetTodo.deadline" />
                <v-list-item-subtitle v-text="targetTodo.detail" />
                <v-list-item-subtitle v-text="targetTodo.note" />
              </v-list-item-content>
              <v-list-item-icon color="#03A9F4" @click="deleteTodo(targetTodo.id, $event)">
                  <v-icon>mdi-delete</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-card>
        <v-btn @click="getBeforeDeadlineTodo">getBeforeDeadlineTodos</v-btn>
        <v-btn @click="sendMail">sendMail</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import firebase, { firestore, functions } from 'firebase';
import { Component, Vue } from 'vue-property-decorator';
import { ToDo } from '../../classes/todo';
import TodoForm from './TodoForm.vue';
// import axios from 'axios';
@Component({
  components: {
    TodoForm,
  },
})
export default class TodoList extends Vue {
  currentUser = firebase.auth().currentUser!;
  db = firebase.firestore().collection('users')
    .doc(this.currentUser.email!).collection('todolist');
  targetTodo: ToDo
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
  beforeDeadlineTodos = []

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
      todos = todos.filter((targetTodo: any) => this.targetPriority.includes(targetTodo.priority));
    }
    if (this.targetProgress.length !== 0) {
      todos = todos.filter((targetTodo: any) => this.targetProgress.includes(targetTodo.progress));
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
    return this.todos.find((targetTodo) => targetTodo.id === this.selectedId);
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
    const d = `00${dt.getDate()}`.slice(-2);
    // const d = (00' + dt.getDate()).slice(-2);
    const result = `${y}-${m}-${d}`;
    return result;
  }
  async onSelect(todoId: string) {
    this.showForm(false);
    this.selectedId = todoId;
  }

  saveTodo(targetTodo: any) {// eslint-disable-line
    console.log('TODO===>', JSON.stringify(targetTodo));
    if (this.selectedId === '') {
      this.createTodo(targetTodo);
    } else {
      this.updateTodo(targetTodo);
    }
    this.loadTodo();
  }

  async createTodo(targetTodo: any) {
    await this.db.doc().set(targetTodo);
  }

  async updateTodo(targetTodo: any) {
    console.log('called update');
    await this.db.doc(this.selectedId)
      .update({
        title: targetTodo.title,
        detail: targetTodo.detail,
        note: targetTodo.note,
        priority: targetTodo.priority,
        deadline: targetTodo.deadline,
        progress: targetTodo.progress,
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

  getBeforeDate() {// eslint-disable-line
    const dt = new Date();
    const y = dt.getFullYear();
    const m = `00${dt.getMonth() + 1}`.slice(-2);
    const d = `00${dt.getDate() - 1}`.slice(-2);
    const result = `${y}-${m}-${d}`;
    return result;
  }
  async getBeforeDeadlineTodos() {
    const judgeLine = this.getBeforeDate();
    console.log(judgeLine);
    const qSnapshot = await this.db.where('deadline', '==', judgeLine).get();
    this.beforeDeadlineTodos = qSnapshot.docs.map((dSnapshot) => dSnapshot.data());
    console.log(this.beforeDeadlineTodos);
  }
  // getBeforeDeadlineTodo() {
  //   const xxx = this.allTodos.map((dSnapShot) => dSnapShot.data());
  //   console.log('AllTodos===>', xxx);
  //   const now = new Date();
  //   // const judgeLine = this.getDate();
  //   const judgeLine = '2020-07-28';
  //   console.log('JUDGE LINE===>', judgeLine);
  //   const result = xxx.filter((x) => new Date(x.deadline) < new Date(judgeLine));
  //   console.log('RESULT===>', result);
  //   // const now = new Date();
  //   // const beforeday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  //   // const deadline = this.targetTodo.deadline;// eslint-disable-line
  //   // this.beforeDeadlineTodo = this.todos.find((beforeDeadlineTodo) => deadline === beforeday);
  //   // console.log(this.beforeDeadlineTodo);
  // }

  sendMail() {// eslint-disable-line
    const mailer = firebase.functions().httpsCallable('sendMail');
    console.log('mailer===>', mailer);
    mailer(this.beforeDeadlineTodos)
      .then(() => {
        console.log('sendMail');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // sendMail() {// eslint-disable-line
  //   const mailer = firebase.functions().httpsCallable('sendMail');
  //   console.log('mailer===>', mailer);
  //   mailer(this.beforeDeadlineTodo)
  //     .then(() => {
  //       console.log('sendMail');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
}
</script>
