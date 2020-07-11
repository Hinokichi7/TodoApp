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
              <v-btn :disabled="!valid" @click="submit" dark text>Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
        <v-form ref="form" v-model="valid" max-width="500" class="mx-auto">
            <v-text-field v-model="editTodo.title" :counter="20" :rules="titleRules" label="Title" required />
              <v-select v-model="editTodo.priority" :items="priorityItem" :rules="[v => !!v || 'Item is required']" label="Priority" required />
              <v-select v-model="editTodo.progress" :items="progressItem" label="Progress" />
              <v-btn  color="primary" class="ma-2" dark small @click="dialog2 = true">Open Calender</v-btn>
              <v-dialog v-model="dialog2" max-width="350px">
                <v-card>
                  <v-card-text>
                    <v-date-picker  no-title v-model="editTodo.deadline" :min="minDate" />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" text @click="dialog2 = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            <v-text-field v-model="editTodo.deadline" :rules="[v => !!v || 'Item is required']" label="Deadline" required />
              <v-container fluid>
              <v-textarea v-model="editTodo.detail" label="detail" />
              <v-textarea v-model="editTodo.note" label="note" />
            </v-container>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import firebase, { firestore } from 'firebase';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ToDoItem, ToDo } from '../../classes/todo';
@Component({})
export default class TodoForm extends Vue {
  @Prop() todo!: any;
  editTodo = null;
  dialog2 = false
  valid = true;
  priorityItem = [1, 2, 3];
  progressItem = ['new', 'working', 'pending', 'discontinued'];

  created() {
    this.editTodo = JSON.parse(JSON.stringify(this.todo));
  }

  destroyed() {
    console.log('FORM DESTROYED')''
  }

  submit(): void {
    if (this.refs.form.validate()) {
      this.$emit('submit', this.editTodo);
    }
    this.close();
  }
  close() {
    this.$emit('close');
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
}
</script>
