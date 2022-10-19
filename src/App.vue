<template>
  <h1> Meme Rating App </h1>
</template>

<script setup>
import {onMounted, ref} from "vue";
const apiData = ref(null)
async function getMemes() {
  await fetch('https://api.imgflip.com/get_memes')
  // get them from https://api.imgflip.com/get_memes data => memes
  // transform json into array of meme objects (with id, url, name)
}
</script>

<style lang="scss">
</style>
