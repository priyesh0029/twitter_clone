// stores/user/getters.js
export function userName(state) {
    return state.userInfo.username || '';
  }
  
  export function userId(state) {
    return state.userInfo.id || '';
  }
  
  export function name(state) {
    return state.userInfo.name || '';
  }
  