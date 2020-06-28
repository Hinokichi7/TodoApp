<template>
    <v-container>
        <v-row>
            <v-col cols="12">
            <h1>Documant operations</h1>
            </v-col>

            <v-col cols="8">
                <h3>Create Document by RandomID:part1</h3>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="createDocumentByRandomId">add</v-btn>
            </v-col>

            <v-col cols="8">
                <h3>Create Document by RandomID:part2</h3>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="createDocumentByRandomId_2">set</v-btn>
            </v-col>

            <v-col cols="4">
                <h3>Create Document by ID</h3>
            </v-col>
            <v-col cols="4">
                <v-text-field v-model="mail"/>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="createDocumentById">set</v-btn>
            </v-col>

            <v-col cols="4">
                <h3>Get Document by ID</h3>
            </v-col>
            <v-col cols="4">
                <v-text-field v-model="mail"/>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="getDocumentById">get</v-btn>
            </v-col>

            <v-col cols="4">
                <h3>Update Document by ID</h3>
            </v-col>
            <v-col cols="4">
                <v-text-field v-model="updateId"/>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="updateDocumentById">update</v-btn>
            </v-col>
            <v-col cols="4">
                <h3>Delete Document by ID</h3>
            </v-col>
            <v-col cols="4">
                <v-text-field v-model="deleteId"/>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="deleteDocumentByRandomId">delete</v-btn>
            </v-col>

            <v-col cols="12">
            <h1>Documant operations</h1>
            </v-col>
         
            <v-col cols="8">
                <h3>Get data by Query</h3>
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
deleteId = ''
todo: string[] = ['todo1', 'todo2']
todo2: string[] = ['todo1', 'todo2', 'todo3', 'todo4']
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
  //   const snapShot = await docRef;d
  console.log(snapShot.data());
}

async updateDocumentById() {// eslint-disable-line
  firebase.firestore().doc(`users/${this.updateId}`).update({value: this.todo2});// eslint-disable-line
}
async deleteDocumentByRandomId() {// eslint-disable-line
  firebase.firestore().doc(`users/${this.deleteId}`).delete();
}

async getDocumentByQuery() {// eslint-disable-line
  const querySnapshot = await firebase.firestore().collection('list').where('name', '==', 'priority').get();
  querySnapshot.forEach((dSnapshot) => console.log(dSnapshot.data()));
  console.log(querySnapshot);
}
}
</script>
