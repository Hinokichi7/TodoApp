<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
        <v-card class="mx-auto" height="300px">
            <v-select
                :items="priorityItems"
                label="Select"
                multiple
                hint="Pick Prioprity"
                persistent-hint
                v-model="targetPriority"
            ></v-select>
            <v-select
                :items="progressItems"
                label="Select"
                multiple
                hint="Pick Progress"
                persistent-hint
                v-model="targetProgress"
            ></v-select>

          <v-card-actions>
            <v-spacer/>
            <v-btn color="blue darken-1" text @click="close">Close</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import firebase, { firestore } from 'firebase';
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class TodoFilter extends Vue {
  priorityItems = [1, 2, 3]
  progressItems = ['new', 'working', 'completed', 'pending', 'discontinued']
  targetPriority: number[] = [];
  targetProgress: string[] = [];

  currentUser = firebase.auth().currentUser!;
  db = firebase.firestore();

  close() {
    this.$emit('close');
  }

  save() {
    this.db
      .collection('users')
      .doc(this.currentUser.email!)
      .collection('todolist')
      .where('priority', 'array-contains', this.targetPriority)
      .get();
    // this.$store.commit('todos/targetPriority', this.targetPriority);
    // this.$store.commit('todos/targetProgress', this.targetProgress);
    this.$emit('close');
  }
}
</script>
