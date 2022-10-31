import {defineStore} from "pinia";
import {unref} from "vue";


export const useMemeStore = defineStore('memeStore', {
    state: () => ({
        memes: [],
        loading: true

    }),
    actions: {
        getById (id) {
            return this.memes.find((meme) => meme.id === id)
        },
        async fetchMemes() {
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
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
    },
})