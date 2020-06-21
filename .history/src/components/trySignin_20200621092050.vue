<template>
  <v-app id="inspire">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Email adress</v-toolbar-title>
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
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="trySignin">Try to Sign in</v-btn>
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

@Component({})
export default class TrySignin extends Vue {
    email = ''

    actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: 'https://todoapp-8da1b.firebaseapp.com/#/Signin/Signup',
      // This must be true.
      handleCodeInApp: true,
    };

    sendMail() {
      firebase.auth().sendSignInLinkToEmail(this.email, this.actionCodeSettings)
        .then((responce) => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
          window.localStorage.setItem('emailForSignIn', this.email);
        })
        .catch((error) => {
          console.log('SendingMaiError', error);
        // Some error occurred, you can inspect the code: error.code
        });
    }

    trySignin() {
    // 登録の確認
      firebase.auth().fetchSignInMethodsForEmail(this.email)
        .then((signInMethods) => {
          if (signInMethods.indexOf(firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) !== -1) {
          // User can sign in with email/password.
            this.$router.push('/Signin');
          }
          if (signInMethods.indexOf(firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD) !== -1) {
            // User can sign in with email/link.
            this.sendMail();
            window.alert('Mail are sended');
          }
        })
        .catch((error) => {
          console.log(error);
        // Some error occurred, you can inspect the code: error.code
        });
    }
}
</script>
