<template>
  <h1>Meme Rating App</h1>
  <CompareView />
</template>

<script setup>
import CompareView from './components/CompareView.vue'
import { memeStorage } from "./memesStorage";
import { ref } from "vue";
const memes = ref(null);

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
getMemes();
</script>

<style lang="scss"></style>
