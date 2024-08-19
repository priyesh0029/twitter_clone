// stores/post/getters.js
export function postCount(state) {
    return state.posts.length;
  }
  
  export function getFirstPost(state) {
    return state.posts.length > 0 ? state.posts[0] : null;
  }
  