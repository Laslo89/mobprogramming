import {ref, unref} from "vue";

export const useMemeComparer = (memeList) => {
    const randomPair = ref([])
    
    function getRandom(idToAvoid) {
        const memeArray = unref(memeList)
        const indexToAvoid = memeArray.findIndex(({id} ) => id === idToAvoid)
        if(indexToAvoid > -1 ) {
            memeArray.splice(indexToAvoid, 1)
        }
        return memeArray[Math.floor(Math.random()*memeArray.length)];
    }

    function getRandomPair() {
        randomPair.value = [getRandom(), getRandom(memeOne.id)]
    }

    return {
        randomPair,
        getRandomPair
    }
}