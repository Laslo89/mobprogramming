<template>
  <h2>Compare Memes</h2>
  <button @click="getPair"> NEW PAIR</button>
  <div v-if="loading"> Loading pair . . .</div>
  <div v-else class="meme-pair">
    <div class="meme-pair__meme" v-for="meme in memePair" :key="meme.id">
      <h3>{{ meme.name }}</h3>
      <img :src="meme.url"/>
    </div>
  </div>

</template>

<script setup>
import { createPairStore } from "../store/pairStore.js";
import { storeToRefs } from "pinia";


const props = defineProps({
  id: {
    required: true,
    type: String,
  }
})
const useStore = createPairStore(props.id)
const store = useStore()
const { loading, memePair } = storeToRefs(store)
const { createRandomPair } = store


async function getPair() {
  await createRandomPair()
}

getPair()
</script>

<style lang="scss">
.meme-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;

  &__meme {
    padding: 20px;

    img {
      width: 100%;
    }
  }

}

button {
  background: #535bf2;
  color: #ffffff;
  font-weight: bold;
}
</style>