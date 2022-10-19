<template>
  <h1>Meme Rating App</h1>
  <CompareView :meme-pair="randomPair" />
</template>

<script setup>
import CompareView from './components/CompareView.vue'
import { memeStorage } from "./memesStorage";
import { useMemeComparer } from '../useMemeComparer'
import { ref } from "vue";

const memes = ref(null);
const {getRandomPair, randomPair} = useMemeComparer(memes)

async function getMemes() {
  const memesFromLocalStorage = memeStorage.get();
  if (memesFromLocalStorage) {
    memes.value = memesFromLocalStorage;
    return;
  }
  try {
    const jsonResult = await fetch("https://api.imgflip.com/get_memes");
    const result = await jsonResult.json();
    memes.value = result.data.memes.map(({ id, name, url }) => ({
      id,
      name,
      url,
    }));
    memeStorage.save(memes.value);
  } catch (error) {
    console.log(error);
  }

}

async function init() {
  await getMemes();
  getRandomPair()
}

init()
</script>

<style lang="scss"></style>
