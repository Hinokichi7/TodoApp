<template>
    <v-container>
        <v-row>
            <v-col cols="8">
                <h1>ランダムIDでドキュメント作成:part1</h1>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="createDocumentByRandomId">作成</v-btn>
            </v-col>
            <v-col cols="8">
                <h1>ランダムIDでドキュメント作成:part2</h1>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="createDocumentByRandomId_2">作成</v-btn>
            </v-col>
            <v-col cols="8">
                <v-text-field v-model="nanika"/>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="createDocumentByRandomId_3">作成</v-btn>
                <v-btn color="primary" @click="getDocumentByRandomId_3">取得</v-btn>
            </v-col>
            <v-col cols="8">
                <h1>ドキュメントの更新</h1>
                <v-text-field v-model="updateId"/>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="updateDocumentByRandomId_4">更新</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import firebase, { firestore } from 'firebase';
import todoItem from '../store/todoItem';

@Component({})
export default class Datavbase extends Vue {
nanika = ''
updateId = ''
  async createDocumentByRandomId() {// eslint-disable-line
  const responce = await firebase.firestore().collection('list').add({ name: 'title', value: 3 });
  console.log(responce);
}

  async createDocumentByRandomId_2() {// eslint-disable-line
  await firebase.firestore().collection('list').doc().set({ name: 'priority', value: 4 });
}

  async createDocumentByRandomId_3() {// eslint-disable-line
  await firebase.firestore().collection('list').doc(this.nanika).set({ name: 'title', value: 3 });
}
async getDocumentByRandomId_3() {// eslint-disable-line
  const snapShot = await firebase.firestore().collection('list').doc('nandemo').get();
  //   const snapShot = await docRef;
  console.log(snapShot.data());
}
async updateDocumentByRandomId_4() {// eslint-disable-line
  firebase.firestore().doc(`list/${this.updateId}`).update({ name: 'title', value: 4 });
}
}
</script>
