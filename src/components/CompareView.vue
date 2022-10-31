<template>
  <h2>Compare Memes</h2>
  <button @click="getPair"> NEW PAIR</button>
  <div v-if="loading"> Loading pair . . .</div>
  <div v-else class="meme-pair">
    <div class="meme-pair__meme" v-for="meme in memePair" :key="meme.id">
      <h3>{{ meme.name }}</h3>
      <img :src="meme.url" @click="vote(meme)"/>
      <div v-if="meme.id === favoriteId">Current Favorite</div>
    </div>
  </div>

</template>

<script setup>
import { createPairStore } from "../store/pairStore.js";
import { storeToRefs } from "pinia";
import {useRatingStore} from "../store/ratingStore.js";


const props = defineProps({
  id: {
    required: true,
    type: String,
  }
})
// this creates a new instance with id if it doesn't exist yet
const usePairStore = createPairStore(props.id)
const pairStore = usePairStore()

const { loading, memePair, favoriteId } = storeToRefs(pairStore)
const { createRandomPair } = pairStore


const ratingStore = useRatingStore()
const { voteFor } = ratingStore

const vote = (meme) => {
  voteFor(meme)
  getPair()
}

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