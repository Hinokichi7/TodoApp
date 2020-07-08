<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
    <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Form</v-toolbar-title>
          <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn :disabled="!valid" @click="submit" dark text>
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
      <v-form ref="form" v-model="valid" max-width="500" class="mx-auto">
            <v-text-field
              v-model="todo.title" :counter="20" :rules="titleRules" label="Title" required
            ></v-text-field>
            <v-select
              v-model="todo.priority" :items="priorityItem" :rules="[v => !!v || 'Item is required']" label="Priority" required
            ></v-select>
            <v-select
              v-model="todo.progress" :items="progressItem" label="Progress"
            ></v-select>
            <v-btn
              color="primary" class="ma-2" dark small @click="dialog2 = true">Open Calender</v-btn>
            <v-dialog v-model="dialog2" max-width="350px">
              <v-card>
                <v-card-text>
                  <v-date-picker  no-title v-model="todo.deadline" :min="minDate"></v-date-picker>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" text @click="dialog2 = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          <v-text-field
            v-model="todo.deadline" :rules="[v => !!v || 'Item is required']" label="Deadline" required
          ></v-text-field>
            <v-container fluid>
             <v-textarea v-model="todo.detail" label="detail" ></v-textarea>
             <v-textarea v-model="todo.note" label="note"></v-textarea>
          </v-container>
      </v-form>
    </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import firebase, { firestore } from 'firebase';
import { Component, Vue } from 'vue-property-decorator';
import { ToDoItem, ToDo } from '../../classes/todo';
@Component({})
export default class TodoForm extends Vue {
  dialog2 = false
  valid = true;
  priorityItem = [1, 2, 3];
  progressItem = ['new', 'working', 'pending', 'discontinued'];
  todo: ToDo;
  currentUser = firebase.auth().currentUser!;
  db = firebase.firestore().collection('users')
    .doc(this.currentUser.email!).collection('todolist');

  created() {
    const selectedId = this.$store.getters['todos/selectedId'];
    // const beforeId = this.$store.getters['todos/beforeId'];
    console.log('SELECTED ID===>', selectedId);
    // console.log('BEFORE ID===>', beforeId);
    if (selectedId === null) {
      const todoItem: ToDoItem = {
        id: new Date,
        // selected: false,
        title: '',
        detail: '',
        note: '',
        priority: 1,
        deadline: new Date().toISOString().substr(0, 10),
        createdAt: new Date(),
        progress: 'new',
      };
      this.todo = new ToDo(todoItem);
      // this.todo.id = beforeId;
      return;
    }
    this.updatesSubCllection();
  }

  async createSubCollection() {
    await this.db.doc()
      .set({
        id: new Date,
        // selected: false,
        title: this.todo.title,
        detail: this.todo.detail,
        note: this.todo.note,
        priority: this.todo.priority,
        deadline: this.todo.deadline,
        createdAt: new Date(),
        progress: this.todo.progress,
      });
  }

  async updatesSubCllection() {
    const selectedId = this.$store.getters['todos/selectedId'];
    await this.db.doc(`todolist/${selectedId}`)
      .update({
        title: this.todo.title,
        detail: this.todo.detail,
        note: this.todo.note,
        priority: this.todo.priority,
        deadline: this.todo.deadline,
        progress: this.todo.progress,
      });
  }
  titleRules: Function[] = [
    (v: any) => !!v || 'Title is required',
  ];

  get refs(): any {
    return this.$refs;
  }
  get minDate(): string {
    /* eslint class-methods-use-this: off */
    return new Date().toISOString();
  }

  close() {
    this.$emit('close');
  }
  submit(): void {
    if (this.refs.form.validate()) {
      this.createSubCollection();
      // this.$store.dispatch('todos/addToDo', this.todo);
      this.close();
      this.$emit('getData');
    }
  }
}
</script>
