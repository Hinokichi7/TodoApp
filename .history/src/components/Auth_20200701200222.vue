<template>
  <v-app id="inspire">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Email/Password Authentication</v-toolbar-title>
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
              <v-btn color="primary" @click="signin">Sign in</v-btn>
              <v-btn color="primary" @click="create">Create Account</v-btn>
            </v-card-actions>
          </v-card>
          <v-container>
          <h5>アカウント作成には確認メールのURLからのログインが必要です</h5>
          <!-- <p class="text-right">Twitterアカウントからの認証は一部機能が利用できません。</p>
              <v-btn color="cyan" fab small dark @click="twitter"><v-icon>mdi-twitter</v-icon></v-btn> -->
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

import firebase from 'firebase';

// import axios from 'axios';

@Component({})
export default class Auth extends Vue {
  email = ''
  password = ''
  actionCodeSettings = {
    url: 'https://todoapp-8da1b.firebaseapp.com',
    handleCodeInApp: true,
  };

  create() {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        // const credential = firebase.auth.EmailAuthProvider.credential(this.email, this.password);
        // this.sendmail();
        const user = firebase.auth().currentUser;
        if (user !== null) {
          user.sendEmailVerification(this.actionCodeSettings)
            .then(() => {
              window.alert('Please sign in again at the URL in the confirmation email');
              console.log(user.uid);
            })
            .catch((error) => {
              window.alert('mail is not correct');
              user.delete()
                .then(() => {
                  console.log(user.uid);
                });
            });
        }
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  }

  signin() {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(async () => {
        const user = firebase.auth().currentUser;
        console.log(user?.uid);
        const responce = await firebase.firestore().collection('users').doc(user!.uid).set({});
        console.log('res===>', responce);
        this.$router.push('/');
      })
      .catch((error) => {
        window.alert('wrong email/password');
        console.log(error);
      });
  }

  // twitter() { // eslint-disable-line
  //   const provider = new firebase.auth.TwitterAuthProvider();
  //   firebase.auth().signInWithPopup(provider)
  //     .then((respoce) => {
  //       const user = firebase.auth().currentUser;
  //       if (user !== null) {
  //         user.sendEmailVerification(this.actionCodeSettings)
  //           .then(() => {
  //             window.alert('sendig mail');
  //             console.log(user.uid);
  //           })
  //           .catch((error) => {
  //             // user.providerData.forEach((profile) => {
  //             //   user.email = profile?.email;
  //             // });
  //             window.alert('mail is not correct');
  //             user.delete()
  //               .then(() => {
  //                 console.log(user.uid);
  //               });
  //           });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
}
</script>
