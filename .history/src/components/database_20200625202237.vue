<template>
    <v-container class="fill-height" fluid>
        <v-row>
            <v-col cols="8">
                <h1>ランダムIDでドキュメント作成</h1>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary">作成</v-btn>
            </v-col>
        </v-row>
    <v-container>   
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';

@Component({})
export default class Datavbase extends Vue {

}
</script>
