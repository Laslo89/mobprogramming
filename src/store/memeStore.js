import {defineStore} from "pinia";


export const useMemeStore = defineStore('memeStore', {
    state: () => ({
        memes: [],
        loading: true

    }),
    getters: {
        allMemes: (state) => state.memes // JSON.parse(localStorage.getItem("memes"))
    },
    actions: {
        async fetchMemes() {
            console.log('fetching in option meme store')
            this.loading = true
            this.memes = []
            try {
                const jsonResult = await fetch("https://api.imgflip.com/get_memes");
                const result = await jsonResult.json();
                this.memes = result.data.memes.map(({id, name, url}) => ({
                    id,
                    name,
                    url,
                }));
                // this.saveToStorage(this.memes.value);
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },

        saveToStorage(data) {
            localStorage.setItem("memes", JSON.stringify(data));
        }
    },
})