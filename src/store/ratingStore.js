import {defineStore} from "pinia";
import {unref} from "vue";


export const useRatingStore = defineStore('ratingStore', {
    state: () => ({
        ratings: [],
    }),

    getters: {
        sortedRatings: (state) => {
            return state.ratings.sort((a, b) => {
                if (a.score > b.score) {
                    return -1
                }
                if (a.score < b.score) {
                    return 1
                }
                return 0
            })
        },
    },

    actions: {
        voteFor(meme) {
            const ratingIndex = this.ratings.findIndex((rating) => rating.id === unref(meme).id)
            if (ratingIndex >= 0) {
                this.ratings[ratingIndex].score += 1
            } else {
                this.ratings.push({id: unref(meme).id, score: 1})
            }
        }
    }
})