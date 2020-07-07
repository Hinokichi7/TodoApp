<template>
  <v-row>
    <v-col cols="12" sm="8" offset-sm="2">
        <v-toolbar prominent src="../../assets/414652_l.jpg" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>Todo List</v-toolbar-title>
              <v-spacer/>
              <v-btn class="mx-2" fab dark color="#0288D1" small @click="showForm(true)">
              <v-icon>mdi-plus</v-icon>
              </v-btn>

              <v-dialog v-model="dialog">
                <todo-form @close="dialogClose()" :key="formCount" @getData="getData"></todo-form>
              </v-dialog>

        </v-toolbar>
    </v-col>

    <v-col cols="12" sm="8" offset-sm="2">
        <v-container class="lighten-2">
          <v-row justify="center">
          <v-col cols="3">
            <v-select
              :items="priorityItems" label="Pick Priority" multiple v-model="targetPriority" @change="queryPriority"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              :items="progressItems" label="Pick Progress" multiple v-model="targetProgress" @change="queryProgress"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              :items="sortItems" label="Choose Sortitem" v-model="sortOption" @change="sort"
            ></v-select>
          </v-col>

          </v-row>
        </v-container>
    </v-col>
    <v-col cols="12" sm="8" offset-sm="2">
        <v-card class="mx-auto">
          <v-list two-line subheader>
            <v-list-item v-for="(todo,id) in todos" :key="id" @click="selected(todo)">
                <v-list-item-icon v-if="todo.progress !== 'completed'" @click="completed(todo, $event)">
                  <v-icon color="#4CAF50">mdi-check-circle-outline</v-icon>
                </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="todo.title" :style="{color: getPriorityColor(todo)}"/>
                <v-list-item-subtitle v-text="todo.progress"/>
                <v-list-item-subtitle class="text--primary" v-text="todo.deadline" />
                <v-list-item-subtitle v-text="todo.detail" />
                <v-list-item-subtitle v-text="todo.note" />
              </v-list-item-content>
              <v-list-item-icon color="#03A9F4" @click="deleteTodo(todo, $event)">
                  <v-icon>mdi-delete</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import firebase, { firestore } from 'firebase';
import { Component, Vue } from 'vue-property-decorator';
import { ToDo, ToDoItem } from '../../classes/todo';
import TodoForm from './TodoForm.vue';
import TodoFilter from './TodoFilter.vue';
import TodoSort from './TodoSort.vue';
@Component({
  components: {
    TodoForm,
    TodoFilter,
    TodoSort,
  },
})
export default class TodoList extends Vue {
  formCount = 0;
  dialog = false
  priorityItems = [1, 2, 3]
  progressItems = ['new', 'working', 'completed', 'pending', 'discontinued']
  targetPriority: number[] = [];
  targetProgress: string[] = [];
  sortItems = ['createTime', 'deadline', 'priority']
  sortOption = ''
  priorityColors = {
    lv1: '#E91E63',
    lv2: '#F57C00',
    lv3: '#03A9F4',
    other: 'black',
  }
currentUser = firebase.auth().currentUser!;
db = firebase.firestore();
todos: any[] = []

created() {
  this.getData();
}
async getData() {
  const qSnapshot = await this.db
    .collection('users')
    .doc(this.currentUser.email!)
    .collection('todolist')
    .get();
  this.todos = [];
  qSnapshot.docs.map((dSnapshot) => this.todos.push(dSnapshot.data()));
}

async selectDocument() {
  const qSnapshot = await this.db
    .collection('users')
    .doc(this.currentUser.email!)
    .collection('todolist')
    .where('selected', '==', true)
    .get();
  qSnapshot.docs.map((dSnapshot) => console.log(dSnapshot.data()));
}

// async deleteData() {
//   const deleteTodo = await this.db
//     .collection('users')
//     .doc(this.currentUser.email!)
//     .collection('todolist')
//     .doc()
// }

selected(todo: ToDo) {
  // todo.selected = true;// eslint-disable-line
  this.selectDocument();
  this.showForm(false);
  this.$store.commit('todos/selected', todo);
}

showForm(reset: boolean) {
  this.formCount += 1;
  if (reset) {
    this.$store.dispatch('todos/resetSelected');
  }
  this.dialog = true;
}
// showForm(reset: boolean) {
//   this.formCount += 1;
//   if (reset) {
//     // this.$store.dispatch('todos/resetSelected');
//   }
//   this.dialog = true;
// }

async queryPriority() {
  const qSnapshot = await this.db
    .collection('users')
    .doc(this.currentUser.email!)
    .collection('todolist')
    .where('priority', 'in', this.targetPriority)
    .get();
  qSnapshot.docs.map((dSnapshot) => this.todos.filter((todo: ToDo) => todo === dSnapshot.data()));
  this.todos = [];
  qSnapshot.docs.map((dSnapshot) => this.todos.push(dSnapshot.data()));
}
async queryProgress() {
  const qSnapshot = await this.db
    .collection('users')
    .doc(this.currentUser.email!)
    .collection('todolist')
    .where('progress', 'in', this.targetProgress)
    .get();
  this.todos = [];
  qSnapshot.docs.map((dSnapshot) => this.todos.push(dSnapshot.data()));
}
async sort() {
  const qSnapshot = await this.db
    .collection('users')
    .doc(this.currentUser.email!)
    .collection('todolist')
    .orderBy(this.sortOption)
    .get();
  this.todos = [];
  qSnapshot.docs.map((dSnapshot) => this.todos.push(dSnapshot.data()));
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

dialogClose() {
  this.dialog = false;
  this.$store.dispatch('todos/resetSelected');
}

completed(todo: ToDo, evt: any) {
  evt.stopPropagation();
  this.$store.commit('todos/completed', todo);
}
deleteTodo(todo: ToDo, evt: any) {
  evt.stopPropagation();
  this.$store.commit('todos/deleteTodo', todo);
}
}
</script>
