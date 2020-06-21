<template>
  <v-app id="inspire">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon large target="_blank" v-on="on">
                    <v-icon>mdi-code-tags</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field label="e-mail" prepend-icon="mdi-mail" v-model="email"></v-text-field>
                <v-text-field label="Password"  prepend-icon="mdi-lock" v-model="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="signin">Login</v-btn>
            </v-card-actions>
          </v-card>
          <v-container>
          <router-link to="/Signin/Signup" class="font-weight-medium">
              <!-- <v-btn color="success"> -->
                Create new Account
              <!-- </v-btn> -->
            </router-link>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

// import axios from 'axios';

import firebase from 'firebase';

@Component({})
export default class Signin extends Vue {
  email = ''
  password = ''

  signin() {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((responce) => {
        this.$router.push('/Home');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  }
  // login() {
  //   axios.post(
  //     'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArv15xOLXoq3FWhlh_-l6ae2KaHC8HUKg',
  //     {
  //       email: this.email,
  //       password: this.password,
  //       returnSercureToken: true,
  //     },
  //   ).then((responce) => {
  //     this.$store.commit('idToken', responce.data.idToken);
  //     this.$router.push('/Home');
  //   }).catch((error) => {
  //     console.log('error===>', error);
  //   });
  // }
}
</script>
