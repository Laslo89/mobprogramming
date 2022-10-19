import {ref, unref} from "vue";

export const useMemeComparer = (memeList) => {
    const randomPair = ref([])
    function getRandom() {
        const memeArray = unref(memeList)
        return memeArray[Math.floor(Math.random()*memeArray.length)];
    }

    return {
        randomPair
    }
}