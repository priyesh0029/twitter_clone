// stores/user/actions.js
export function initialize() {
    if (typeof window !== 'undefined') {
      const userInfo = localStorage.getItem('userInfo');
      this.userInfo = userInfo ? JSON.parse(userInfo) : {};
      this.isInitialized = true;
    }
  }
  
  export function setUserInfo(newUserInfo) {
    if (typeof window !== 'undefined') {
      this.userInfo = newUserInfo;
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
    }
  }
  
  export function clearUserInfo() {
    if (typeof window !== 'undefined') {
      this.userInfo = {};
      localStorage.removeItem('userInfo');
    }
  }
  