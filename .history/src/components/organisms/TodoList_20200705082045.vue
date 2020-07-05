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
              <v-btn class="mx-2" fab dark color="#0288D1" small @click="showFilter">
                <v-icon>mdi-filter</v-icon>
              </v-btn>
              <v-btn class="mx-2" fab dark color="#0288D1" small @click="showSort">
                <v-icon>mdi-sort-bool-ascending</v-icon>
              </v-btn>

              <v-dialog v-model="dialog">
                <todo-form @close="dialogClose" :key="formCount"></todo-form>
              </v-dialog>

              <v-dialog v-model="dialog2">
                <todo-filter @close="dialogClose"></todo-filter>
              </v-dialog>

              <v-dialog v-model="dialog3">
                <todo-sort @close="dialogClose"></todo-sort>
              </v-dialog>
        </v-toolbar>
    </v-col>

    <v-col cols="12" sm="8" offset-sm="2">
        <v-card class="mx-auto">
          <v-list two-line subheader>
            <v-list-item v-for="(todo,id) in todos" :key="id" @click="selected(todo,false)">
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
  dialog2 = false;
  dialog3= false;

  priorityColors = {
    lv1: '#E91E63',
    lv2: '#F57C00',
    lv3: '#03A9F4',
    other: 'black',
  }
currentUser = firebase.auth().currentUser!;
db = firebase.firestore();
// snapshot: firebase.firestore.QuerySnapshot

async getByQuery() {
  const qSnapshot = await this.db
    .collection('users')
    .doc(this.currentUser.email!)
    .collection('todolist')
    .get();
  const todolists = qSnapshot.forEach((dSnapshot) => dSnapshot.data());
  console.log(todolists);
}
get todos(): ToDo[] {
  this.getByQuery();
  return this.$store.getters['todos/todos'];
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

showForm(reset: boolean) {
  this.formCount += 1;
  if (reset) {
    this.$store.dispatch('todos/resetSelected');
  }
  this.dialog = true;
}
showFilter() {
  this.dialog2 = true;
}
showSort() {
  this.dialog3 = true;
}
dialogClose() {
  this.dialog = false;
  this.dialog2 = false;
  this.dialog3 = false;
}
selected(todo: ToDo) {
  this.$store.dispatch('todos/selected', todo.id);
  this.showForm(false);
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
