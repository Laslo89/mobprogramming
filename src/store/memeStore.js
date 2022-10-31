import {defineStore} from "pinia";

export const useMemeStore = defineStore('memeStore', {
    state: () => ({
        memes: [],
        loading: true

    }),
    actions: {
        getById(id) {
            return this.memes.find((meme) => meme.id === id)
        },

        getRandom(idToAvoid) {
            let memeArray = [...this.memes]
            const indexToAvoid = memeArray.findIndex((meme) => meme.id === idToAvoid)
            if (indexToAvoid > -1) {
                memeArray.splice(indexToAvoid, 1)
            }
            return memeArray[Math.floor(Math.random() * memeArray.length)];
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