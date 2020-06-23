<template>
  <div class="home">
    <v-row>
      <v-col cols="12" sm="8" offset-sm="2">
        <div class="my-2">
          <v-btn text large color="primary" @click="logout">logout</v-btn>
        </div>
      </v-col>
     </v-row>
        <todo-list/>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase';
import { Component, Vue } from 'vue-property-decorator';
import TodoList from '../components/organisms/TodoList.vue';
// import { ToDo } from '../classes/todo';
@Component({
  components: {
    TodoList,
  },
})
export default class Home extends Vue {
  logout() {
    firebase.auth().signOut()
      .then(() => {
        window.alert('sign out');
      })
      .catch((error) => {
        console.log(error);
      });
  }
//   logout() {
//     this.$store.commit('idToken', null);
//     this.$router.push({ path: '/' });
//   }
// }
}
</script>
