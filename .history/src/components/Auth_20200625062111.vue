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
              <v-btn color="cyan" fab small dark @click="twitter"><v-icon>mdi-twitter</v-icon></v-btn>
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
        const credential = firebase.auth.EmailAuthProvider.credential(this.email, this.password);
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

  twitter() { // eslint-disable-line
    const provider = new firebase.auth.TwitterAuthProvider();    
    firebase.auth().signInWithRedirect(provider);
    // firebase.auth().signInWithPopup(provider).then((result) => {
    //   const token = result.credential?.accessToken;
    //   const secret = result.credential?.secret;
    //   // // The signed-in user info.
    //   // const credential = result.credential;// eslint-disable-line
    //   // const user = result.user;// eslint-disable-line
    //   // const user = firebase.auth().currentUser;
    //   // if (user != null) {
    //   //   user.providerData.forEach((profile) => {
    //   //     console.log('Sign-in provider: ', profile?.providerId);
    //   //     console.log('  Provider-specific UID: ', profile?.uid);
    //   //     console.log('  Name: ', profile?.displayName);
    //   //     console.log('  Email: ', profile?.email);
    //   //     console.log('  Photo URL: ', profile?.photoURL);
    //   //   });
    //   // }

    // }).catch((error) => {
    //   // // Handle Errors here.
    //   // const errorCode = error.code;
    //   // const errorMessage = error.message;
    //   // // The email of the user's account used.
    //   // const email = error.email;
    //   // // The firebase.auth.AuthCredential type that was used.
    //   // const credential = error.credential;
    // });
  }
  // submit() {
  //   axios.post(
  //     'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArv15xOLXoq3FWhlh_-l6ae2KaHC8HUKg',
  //     {
  //       email: this.email,
  //       password: this.password,
  //       returnSercureToken: true,
  //     },
  //   ).then((responce) => {
  //     this.$store.commit('idToken', responce.data.idToken);
  //     this.sendVerifiedmail();
  //     console.log('get idToken', responce.data.idToken);
  //   }).catch((error3) => {
  //     console.log(error3);
  //   });
  // }

  // sendMail() {
  //   firebase.auth().sendSignInLinkToEmail(this.email, this.actionCodeSettings)
  //     .then((responce) => {
  //     // The link was successfully sent. Inform the user.
  //     // Save the email locally so you don't need to ask the user for it again
  //     // if they open the link on the same device.
  //       console.log('responce', responce);
  //       window.localStorage.setItem('emailForSignIn', this.email);
  //       window.alert('SendMail');
  //     })
  //     .catch((error) => {
  //       console.log('SendingMaiError', error);
  //     // Some error occurred, you can inspect the code: error.code
  //     });
  // }
}
</script>
