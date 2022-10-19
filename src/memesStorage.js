export const memeStorage = {
  get() {
    return JSON.parse(localStorage.getItem("memes"));
  },
  save(data) {
    localStorage.setItem("memes", JSON.stringify(data));
  },
};
