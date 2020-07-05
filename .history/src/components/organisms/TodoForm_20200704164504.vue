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
                v-model="todo.title"
                :counter="20"
                :rules="titleRules"
                label="Title"
                required
            ></v-text-field>

            <v-select
              v-model="todo.priority"
              :items="priorityItem"
              :rules="[v => !!v || 'Item is required']"
              label="Priority"
              required
            ></v-select>

            <v-select
              v-model="todo.progress"
              :items="progressItem"
              label="Progress"
            ></v-select>

            <v-btn
              color="primary"
              class="ma-2"
              dark
              small
              @click="dialog2 = true"
              >Open Calender
            </v-btn>
            <v-dialog v-model="dialog2" max-width="350px">
              <v-card>
                <v-card-text>
                  <v-date-picker
                      no-title
                      v-model="todo.deadline"
                      :min="minDate"
                  ></v-date-picker>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    color="primary"
                    text
                    @click="dialog2 = false"
                  >
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          <v-text-field
            v-model="todo.deadline"
            :rules="[v => !!v || 'Item is required']"
            label="Deadline"
            required
          ></v-text-field>

            <v-container fluid>
             <v-textarea
              v-model="todo.detail"
              label="detail"
             ></v-textarea>

             <v-textarea
              v-model="todo.note"
              label="note"
             ></v-textarea>
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

  created() {
    const selectedToDo = this.$store.getters['todos/selectedToDo'];
    console.log('SELECTED TODO===>', selectedToDo);
    if (selectedToDo === undefined) {
      const todoItem: ToDoItem = {
        id: 0,
        title: '',
        detail: '',
        note: '',
        priority: 1,
        deadline: new Date().toISOString().substr(0, 10),
        createTime: new Date().toISOString().substr(0, 10),
        progress: 'new',
      };
      this.todo = new ToDo(todoItem);
      return;
    }
    this.todo = selectedToDo;
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

  async submit() {
    const user = firebase.auth().currentUser!;
    const db = firebase.firestore();
    await db.collection('users').doc(`users/${user.email}`)
      .collection('todolist').doc(`todolist/${this.todo}`);
  }
  // submit(): void {
  //   if (this.refs.form.validate()) {
  //     this.createSubCollections();
  //     this.$store.dispatch('todos/addToDo', this.todo);
  //     this.close();
  //   }
  // }
}
</script>
