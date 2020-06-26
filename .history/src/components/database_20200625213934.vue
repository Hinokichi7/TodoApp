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
  const snapShop = await firebase.firestore().collection('list').doc('nanika').get();
  console.log(snapShop);
//   firestore().collection().get().then((doc) => {
//     console.log(doc.data());
//   })
//     .catch((error) => {
//       console.log(error);
//     });
}
}
</script>
