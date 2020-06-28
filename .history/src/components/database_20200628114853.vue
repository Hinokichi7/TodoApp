<template>
    <v-container>
        <v-row>
            <v-col cols="8">
                <h3>Document create by RandomID:part1</h3>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="createDocumentByRandomId">add</v-btn>
            </v-col>

            <v-col cols="8">
                <h3>Document create by RandomID:part2</h3>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="createDocumentByRandomId_2">set</v-btn>
            </v-col>

            <v-col cols="4">
                <h3>Document create by ID</h3>
            </v-col>
            <v-col cols="4">
                <v-text-field v-model="mail"/>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="createDocumentById">set</v-btn>
            </v-col>

            <v-col cols="4">
                <h3>Document create by ID</h3>
            </v-col>
            <v-col cols="4">
                <v-text-field v-model="mail"/>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="getDocumentById">取得</v-btn>
            </v-col>

            <v-col cols="4">
                <h3>Document update by ID</h3>
            </v-col>
            <v-col cols="4">
                <v-text-field v-model="updateId"/>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="updateDocumentByRandomId_4">更新</v-btn>
            </v-col>
            <v-col cols="8">
                <h3>ドキュメンの削除</h3>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="deleteDocumentByRandomId">削除</v-btn>
            </v-col>
            <v-col cols="8">
                <h3>クエリの操作</h3>
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
mail = ''
updateId = ''
todo: string[] = ['todo1', 'todo2']
  async createDocumentByRandomId() {// eslint-disable-line
  const responce = await firebase.firestore().collection('users').add({ name: 'user', value: this.todo });
  console.log(responce);
}

  async createDocumentByRandomId_2() {// eslint-disable-line
  await firebase.firestore().collection('users').doc().set({ name: 'user', value: this.todo });
}

  async createDocumentById() {// eslint-disable-line
  await firebase.firestore().collection('users').doc(this.mail).set({ name: this.mail, value: this.todo });
}

async getDocumentById() {// eslint-disable-line
  const snapShot = await firebase.firestore().collection('users').doc(this.mail).get();
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
