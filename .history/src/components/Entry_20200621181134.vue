<template>
<v-app id="inspire">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="success" dark flat>
              <v-toolbar-title></v-toolbar-title>
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
                <v-text-field label="e-mail" prepend-icon="mdi-mail" v-model="email">Please enter your email address.</v-text-field>
              </v-form>
            </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="submitEmail">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

import firebase from 'firebase';

import axios from 'axios';

@Component({})
export default class Entry extends Vue {
  email = ''
  actionCodeSettings = {
    url: 'https://todoapp-8da1b.firebaseapp.com',
    handleCodeInApp: true,
  };

  submitEmail() {
    axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArv15xOLXoq3FWhlh_-l6ae2KaHC8HUKg',
      {
        email: this.email,
        returnSercureToken: true,
      },
    ).then((responce) => {
      this.$store.commit('idToken', responce.data.idToken);
      this.$router.push('/');
    }).catch((error) => {
      console.log('未登録===>', error);
      firebase.auth().sendSignInLinkToEmail(this.email, this.actionCodeSettings)
        .then((responce) => {
          console.log('responce', responce);
          window.localStorage.setItem('emailForSignIn', this.email);
          window.alert('SendMail');
        })
        .catch((error) => {
          console.log('SendingMaiError', error);
        });
    });
  }
}
</script>
