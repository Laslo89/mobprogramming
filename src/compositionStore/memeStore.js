import { defineStore } from "pinia";
import { computed, ref, unref } from "vue";

export const useMemeStore = defineStore('memeStore', () => {
    const memes = ref(null)
    const loading = ref(true)


    const isLoading = computed(() => unref(loading))
    const allMemes = computed(() => unref(memes)) // JSON.parse(localStorage.getItem("memes"))


    async function fetchMemes() {
        console.log('fetching in composition meme store')
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
            saveToStorage(memes.value);
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    }

    function saveToStorage(data) {
        localStorage.setItem("memes", JSON.stringify(data));
    }

    return {
        loading,
        memes,
        fetchMemes
    }
})