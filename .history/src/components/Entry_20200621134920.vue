<template>
<v-card>
    <v-container>
        <v-card-actions>
    <b-btn @click="toSignin">You have account alredy</b-btn>
    <b-btn @click="toSignup">You don't have account yet</b-btn>
        </v-card-actions>
    </v-container>
</v-card>
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
}
</script>