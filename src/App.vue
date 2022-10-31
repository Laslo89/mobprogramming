<template>
  <h1>Meme Rating App</h1>
  <button @mouseenter="showRating = true" @mouseleave="showRating = false" style="position: relative;">
    SHOW RATING TABLE
    <RatingView v-if="showRating"/>
  </button>

  <div v-if="loading"> Loading, please wait . . .</div>
  <div v-else>
    <CompareView id="view1"/>
    <CompareView id="view2"/>
    <CompareView id="view2"/>
  </div>
</template>

<script setup>
import CompareView from './components/CompareView.vue'
import {useMemeStore} from "./compositionStore/memeStore.js";
import {storeToRefs} from "pinia";
import RatingView from "./components/RatingView.vue";
import {ref} from "vue";

const showRating = ref(false)
const memeStore = useMemeStore()
const {loading} = storeToRefs(memeStore)
const {fetchMemes} = memeStore

async function init() {
  await fetchMemes()
}

init()
</script>
