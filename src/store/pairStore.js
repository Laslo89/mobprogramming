import {defineStore, storeToRefs} from "pinia";
import {unref} from "vue";
import {useMemeStore} from "../compositionStore/memeStore.js";

const options = {
    state: () => ({
        memePair: [],
        loading: true
    }),
    actions: {
        getRandom(idToAvoid) {
            const memeStore = useMemeStore()
            const {allMemes} = storeToRefs(memeStore)
            const memeArray = unref(allMemes)
            const indexToAvoid = memeArray.findIndex(({id}) => id === idToAvoid)
            if (indexToAvoid > -1) {
                memeArray.splice(indexToAvoid, 1)
            }
            return memeArray[Math.floor(Math.random() * memeArray.length)];
        },

        createRandomPair() {
            console.log('creating in option pair store')
            this.loading = true
            const memeOne = this.getRandom()
            this.memePair = [this.getRandom(), this.getRandom(memeOne.id)]
            this.loading = false
        }

    }
}
export function createPairStore(id) {
    return defineStore(id,{...options})
}