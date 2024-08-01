
// stores/usePostStore.js
import { defineStore } from 'pinia';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
  }),
  actions: {
    setPosts(newPosts) {
      this.posts = newPosts;
    },
    clearPosts() {
      this.posts = [];
    },
  },
});
