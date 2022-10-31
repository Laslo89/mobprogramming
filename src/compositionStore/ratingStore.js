import {defineStore} from "pinia";
import {computed, ref, unref} from "vue";


export const useRatingStore = defineStore('ratingStore', () => {
    const ratings = ref([])

    const sortedRatings = computed(() => unref(ratings).sort((a, b) => {
        if (a.score > b.score) {
            return -1
        }
        if (a.score < b.score) {
            return 1
        }
        return 0
    }))

    function voteFor(meme) {
        const ratingIndex = unref(ratings).findIndex((rating) => rating.id === unref(meme).id)
        if (ratingIndex >= 0) {
            ratings.value[ratingIndex].score += 1
        } else {
            ratings.value.push({id: unref(meme).id, score: 1})
        }
    }

    return {
        ratings,
        sortedRatings,
        voteFor
    }
})