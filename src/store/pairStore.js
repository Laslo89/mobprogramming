import {defineStore, storeToRefs} from "pinia";
import {unref} from "vue";
import {useMemeStore} from "./memeStore.js";
import {useRatingStore} from "./ratingStore.js";

const options = {
    state: () => ({
        memePair: [],
        loading: true
    }),
    getters: {
        favoriteId: (state) => {
            const ratingStore = useRatingStore()
            const {ratings} = storeToRefs(ratingStore)
            const ratingOne = unref(ratings).find((rating) => rating.id === state.memePair[0]?.id)
            const ratingTwo = unref(ratings).find((rating) => rating.id === state.memePair[1]?.id)

            if (ratingOne === undefined && ratingTwo === undefined) {
                return null
            } else {
                if (ratingOne === undefined) {
                    return ratingTwo.id
                } else if (ratingTwo === undefined) {
                    return ratingOne.id
                } else {
                    return ratingOne.score >= ratingTwo.score ? ratingOne.id : ratingTwo.id
                }
            }
        },
    },
    actions: {
        getRandom(idToAvoid) {
            const memeStore = useMemeStore()
            const {memes} = storeToRefs(memeStore)
            let memeArray = [...unref(memes)]
            const indexToAvoid = memeArray.findIndex((meme) => meme.id === idToAvoid)
            if (indexToAvoid > -1) {
                memeArray.splice(indexToAvoid, 1)
            }
            return memeArray[Math.floor(Math.random() * memeArray.length)];
        },

        createRandomPair() {
            this.loading = true
            const memeOne = this.getRandom()
            this.memePair = [this.getRandom(), this.getRandom(memeOne.id)]
            this.loading = false
        }

    }
}

// this creates a new instance with id if it doesn't exist yet
export function createPairStore(id) {
    return defineStore(id,{...options})
}