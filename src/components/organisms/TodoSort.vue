<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
        <v-card class="mx-auto" height="300px">
            <v-select
                :items="sortItems"
                label="Sort"
                v-model="sortOption"
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
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class TodoSort extends Vue {
  sortItems = ['createTime', 'deadline', 'priority']
  sortOption = ''

  close() {
    this.$emit('close');
  }
  save() {
    this.$store.dispatch('todos/sortToDo', this.sortOption);
    this.$emit('close');
  }
}
</script>
