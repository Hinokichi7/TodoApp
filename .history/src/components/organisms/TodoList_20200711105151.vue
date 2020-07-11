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
                <todo-form
                  :todo="todo"
                  :key="formCount"
                  @getTodo="getTodo"
                  @submit="addTodo"
                  @close="dialogClose()"
                ></todo-form>
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
            <v-list-item v-for="(todo) in todos" :key="todo.id" @click="onSelect(todo.id)">
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
  currentUser = firebase.auth().currentUser!;
  db = firebase.firestore().collection('users')
    .doc(this.currentUser.email!).collection('todolist');
  todo: ToDo
  allTodos: any[] = []
  todoId: any = null
  selectedId: string
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
    return this.allTodos.map((dSnapShot) => Object.assign(dSnapShot.data(), { id: dSnapShot.id }));
  }

  get selectedTodo(): any {
    return this.todos.find((todo) => todo.id === this.selectedTodo);
  }

  addTodo() {
    if (this.selectedId === null) {
      this.createTodo();
    }
    this.updateTodo();
  }
  async createTodo() {
    const docRef: string = this.db.doc().id;
    console.log(docRef);
    await this.db.doc(docRef)
      .set({
        id: docRef,
        title: this.todo.title,
        detail: this.todo.detail,
        note: this.todo.note,
        priority: this.todo.priority,
        deadline: this.todo.deadline,
        createdAt: new Date(),
        progress: this.todo.progress,
      });
  }
  async updateTodo() {
    await this.db.doc(`todolist/${this.todo.id}`)
      .update({
        title: this.todo.title,
        detail: this.todo.detail,
        note: this.todo.note,
        priority: this.todo.priority,
        deadline: this.todo.deadline,
        progress: this.todo.progress,
      });
  }
  async onSelect(todoId: string) {
    this.showForm(false);
    this.selectedId = todoId;
    console.log(this.selectedId);
    // this.$store.commit('todos/selectedId', todo.id);
    // const selectedId = this.$store.getters['todos/selectedId'];
    // const selectedToDo = this.todos.find((selectedTodo: any) => todo.id === selectedId);
    // console.log('update', selectedToDo);
    // const qSnapshot = await this.db
    //   .where('id', '==', todo.id)
    //   .get();
    // const selectedTodo = qSnapshot.docs.map((dSnapshot) => dSnapshot.data());
    // this.$store.commit('todos/selectedTodo', selectedTodo);
  }
  // async deleteDocument() {
  //   const selectedId = this.$store.getters['todos/selectedId'];
  //   const qSnapshot = await this.db
  //     .where('id', '==', selectedId)
  //     .get();
  //   qSnapshot.docs.map(async (dSnapshot) => {
  //     await dSnapshot.ref.delete();
  //   });
  //   this.getTodo();
  // }
  async deleteTodo(todo: any, evt: any) {
    evt.stopPropagation();
    const qSnapshot = await this.db
      .where('id', '==', todo.id)
      .get();
    qSnapshot.docs.map(async (dSnapshot) => {
      await dSnapshot.ref.delete();
    });
    this.loadTodo();
  }

  showForm(reset: boolean) {
    this.formCount += 1;
    if (reset) {
      this.$store.dispatch('todos/resetSelected');
    }
    this.dialog = true;
  }

  async queryPriority() {
    const qSnapshot = await this.db
      .where('priority', 'in', this.targetPriority)
      .get();
    this.allTodos = [];
    qSnapshot.docs.map((dSnapshot) => this.todos.push(dSnapshot.data()));
  }
  async queryProgress() {
    const qSnapshot = await this.db
      .where('progress', 'in', this.targetProgress)
      .get();
    this.allTodos = [];
    qSnapshot.docs.map((dSnapshot) => this.todos.push(dSnapshot.data()));
  }
  async sort() {
    const qSnapshot = await this.db
      .orderBy(this.sortOption)
      .get();
    this.allTodos = [];
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

  async completed(todo: ToDo, evt: any) {
    evt.stopPropagation();
    this.$store.commit('todos/completed', todo);
    await this.db.doc(todo.id)
      .update({
        progress: 'completed',
      });
  }
}
</script>
