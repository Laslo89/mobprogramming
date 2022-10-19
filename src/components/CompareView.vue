<template>
  <h2>Compare Memes</h2>
  <div v-for="meme in memePair" :key="meme.id">
    <h3>{{ meme.name }}</h3>
    <img :src="meme.url" />
  </div>
</template>

<script setup>
defineProps({
  memePair: {
    required: true,
    type: Array,
  }
})
</script>