<template>
    <v-container>
        <v-row>
            <v-col cols="8">
                <h1>ランダムIDでドキュメント作成</h1>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary">作成</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';
import todoItem from '../store/todoItem';

@Component({})
export default class Datavbase extends Vue {

async createDocumentByRandomId() {
    const responce = await firebase.firestore().collection('list').add({name: 'title', value: 3});
    console.log(responce);
}
}
</script>
