import {defineStore} from "pinia";
import {computed, ref, unref} from "vue";

export const useMemeStore = defineStore('memeStore', () => {
    const memes = ref(null)
    const loading = ref(true)

    function getById(id) {
        return unref(memes).find((meme) => meme.id === id)
    }

    function getRandom(idToAvoid) {
        let memeArray = [...unref(memes)]
        const indexToAvoid = memeArray.findIndex((meme) => meme.id === idToAvoid)
        if (indexToAvoid > -1) {
            memeArray.splice(indexToAvoid, 1)
        }
        return memeArray[Math.floor(Math.random() * memeArray.length)];
    }

    async function fetchMemes() {
        loading.value = true
        memes.value = []
        try {
            const jsonResult = await fetch("https://api.imgflip.com/get_memes");
            const result = await jsonResult.json();
            memes.value = result.data.memes.map(({id, name, url}) => ({
                id,
                name,
                url,
            }));
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        memes,
        getRandom,
        getById,
        fetchMemes
    }
})