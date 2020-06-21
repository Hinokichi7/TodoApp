<template>
<div>
    <b-btn color="primary" @click="toSignin">You have account alredy</b-btn>
    <b-btn color="warning" @click="toSignup">You don't have account yet</b-btn>
</div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

import firebase from 'firebase';

@Component({})
export default class Entry extends Vue {
  email = ''
  password = ''

  toSignin() {
    this.$router.push('/Signin');
  }
  toSignup() {
    this.$router.push('/Signup');
  }
  firstSignIn() {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      firebase.auth().signInWithEmailLink(this.email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>
