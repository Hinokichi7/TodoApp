<template>
    <v-container>
        <v-row>
            <v-col cols="8">
                <h3>Document create by RandomID:part1</h3>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="createDocumentByRandomId">create</v-btn>
            </v-col>
            <v-col cols="8">
                <h3>Document create by RandomID:part2</h3>
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
            <v-col cols="8">
                <h1>ドキュメンの削除</h1>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="deleteDocumentByRandomId">削除</v-btn>
            </v-col>
            <v-col cols="8">
                <h1>クエリの操作</h1>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="getDocumentByQuery">取得</v-btn>
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
  firebase.firestore().doc(`list/${this.updateId}`).update({ name: 'title', value: 4, value_2: 45});// eslint-disable-line
}
async deleteDocumentByRandomId() {// eslint-disable-line
  firebase.firestore().doc(`list/${'this.updateId'}`).delete();
}

async getDocumentByQuery() {// eslint-disable-line
  const querySnapshot = await firebase.firestore().collection('list').where('name', '==', 'priority').get();
  querySnapshot.forEach((dSnapshot) => console.log(dSnapshot.data()));
  console.log(querySnapshot);
}
}
</script>
