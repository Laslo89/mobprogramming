import {computed, ref, unref} from "vue";
import {defineStore, storeToRefs} from "pinia";
import {useMemeStore} from "./memeStore.js";
import {useRatingStore} from "./ratingStore.js";


const usePairStore = () => {
    const memeStore = useMemeStore()
    const {memes} = storeToRefs(memeStore)

    const memePair = ref([])
    const loading = ref(true)

    const ratingStore = useRatingStore()
    const {ratings} = storeToRefs(ratingStore)
    const favoriteId = computed(() => {
        const ratingOne = unref(ratings).find((rating) => rating.id === unref(memePair)[0]?.id)
        const ratingTwo = unref(ratings).find((rating) => rating.id === unref(memePair)[1]?.id)

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
    })

    function getRandom(idToAvoid) {
        let memeArray = [...unref(memes)]
        const indexToAvoid = memeArray.findIndex((meme) => meme.id === idToAvoid)
        if (indexToAvoid > -1) {
            memeArray.splice(indexToAvoid, 1)
        }
        return memeArray[Math.floor(Math.random() * memeArray.length)];
    }

    function createRandomPair() {
        loading.value = true
        const memeOne = getRandom()
        memePair.value = [getRandom(), getRandom(memeOne.id)]
        loading.value = false
    }

    return {
        loading,
        memePair,
        favoriteId,
        createRandomPair
    }
}

// this creates a new instance with id if it doesn't exist yet
export function createPairStore(id) {
    return defineStore(id, usePairStore)
}