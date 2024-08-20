// stores/usePostStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const tweetStore = defineStore('post', () => {
  // State
  const posts = ref([]);

  // Actions
  function setPosts(newPosts) {
    posts.value = newPosts;
  }

  function clearPosts() {
    posts.value = [];
  }

  // Getters
  const postCount = computed(() => posts.value.length);

  return {
    posts,
    setPosts,
    clearPosts,
    postCount,
  };
});
