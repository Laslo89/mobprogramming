<template>
  <h1>Meme Rating App</h1>
  <div v-if="loading"> Loading, please wait . . .</div>
  <template v-else>
    <CompareView id="view1" />
    <CompareView id="view2"/>
    <CompareView id="view2"/>
  </template>
</template>

<script setup>
import CompareView from './components/CompareView.vue'
import {useMemeStore} from "./store/memeStore.js";
import {storeToRefs} from "pinia";


const memeStore = useMemeStore()
const { loading }= storeToRefs(memeStore)
const { fetchMemes } = memeStore

async function init() {
  await fetchMemes()
}

init()
</script>

<style lang="scss"></style>
