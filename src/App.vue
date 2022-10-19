<template>
  <h1>Meme Rating App</h1>
</template>

<script setup>
import { memeStorage } from "./memesStorage";
import { onMounted, ref } from "vue";
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
  // get them from https://api.imgflip.com/get_memes data => memes
  // transform json into array of meme objects (with id, url, name)
}
getMemes();
</script>

<style lang="scss"></style>
