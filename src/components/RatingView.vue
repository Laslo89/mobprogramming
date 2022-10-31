<template>
  <table class="meme-rating">
    <tr>
    <th>Place</th>
    <th>Score</th>
    <th>Name</th>
    <th>ID</th>
    </tr>
    <tr v-for="(rating, index) in sortedRatings" :key="rating.id">
      <td>{{index + 1}}</td>
      <td>{{rating.score}}</td>
      <td>{{getById(rating.id)?.name}}</td>
      <td>{{rating.id}}</td>
    </tr>
  </table>
</template>

<script setup>
import {useMemeStore} from "../store/memeStore.js";
import {storeToRefs} from "pinia";
import {useRatingStore} from "../store/ratingStore.js";

const memeStore = useMemeStore()
const ratingStore = useRatingStore()

const {sortedRatings} = storeToRefs(ratingStore)
const {getById} = memeStore
</script>

<style lang="scss">
.meme-rating {
  position: absolute;
  left: 50%;
  top: 100%;
  width: max-content;
  transform: translate(-50%, 0);
  background: #ffffff;
  color: #000000;
  padding: 40px;
  border: 1px solid #000000;
  border-radius: 5px;
  text-align: left;
  th, td {
    padding: 10px;
  }
}

</style>