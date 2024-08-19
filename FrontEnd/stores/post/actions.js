// stores/post/actions.js
export function setPosts(newPosts) {
    this.posts = newPosts;
  }
  
  export function clearPosts() {
    this.posts = [];
  }
  