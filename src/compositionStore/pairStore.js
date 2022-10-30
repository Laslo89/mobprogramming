import {ref, unref} from "vue";
import {defineStore, storeToRefs} from "pinia";
import {useMemeStore} from "./memeStore.js";


const usePairStore = () => {
    const memeStore = useMemeStore()
    const { memes } = storeToRefs(memeStore)

    const memePair = ref([])
    const loading = ref(true)

    function getRandom(idToAvoid) {
        const memeArray = unref(memes)
        const indexToAvoid = memeArray.findIndex(({id}) => id === idToAvoid)
        if (indexToAvoid > -1) {
            memeArray.splice(indexToAvoid, 1)
        }
        return memeArray[Math.floor(Math.random() * memeArray.length)];
    }

    function createRandomPair() {
        console.log('creating in composition pair store')
        loading.value = true
        const memeOne = getRandom()
        memePair.value = [getRandom(), getRandom(memeOne.id)]
        loading.value = false
    }

    return {
        loading,
        memePair,
        createRandomPair
    }
}

export function createPairStore(id) {
    return defineStore(id, usePairStore)
}