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
          <v-card>
            <h4>TODOリスト</h4>
            <h5>アカウント作成方法</h5>
            <h6>①email,Password入力(Paswordは6文字以上)</h6>
            <h6>②入力したアドレスに確認メールが届く</h6>
            <h6>③届いたメールのURLをクリック</h6>
            <h6>④CONTINUEをクリック</h6>
            <h5>【機能説明】</h5>
            <h6>・ツールバー+ボタンでTODOリストを新規登録</h6>
            <h6>・TODOリストを選択して編集・更新</h6>
            <h6>・ツールバー下のセレクトフォームでTODOリストを抽出・ソート</h6>
            <h6>・TODOリストの✓アイコンを選択してコンプリート、ゴミ箱アイコンで削除</h6>
            <h6>TODOリストをデータベースで管理・LOGOUTしてもデータ保持</h6>
            <h7>現在締め切り通知メール実装途中です</h7>
          </v-card>
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
