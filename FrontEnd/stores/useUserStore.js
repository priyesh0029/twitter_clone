


import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {},
    token: '', 
    isInitialized: false,
  }),
  actions: {
    initialize() {
      if (typeof window !== 'undefined') {
        const userInfo = localStorage.getItem('userInfo');
        const token = localStorage.getItem('token');
        this.userInfo = userInfo ? JSON.parse(userInfo) : {};
        this.token = token || '';
        this.isInitialized = true;
      }
    },
    setToken(newToken) {
      if (typeof window !== 'undefined') {
        this.token = newToken;
        localStorage.setItem('token', newToken);
      }
    },
    clearToken() {
      if (typeof window !== 'undefined') {
        this.token = '';
        localStorage.removeItem('token');
      }
    },
    setUserInfo(newUserInfo) {
      if (typeof window !== 'undefined') {
        this.userInfo = newUserInfo;
        localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
      }
    },
    clearUserInfo() {
      if (typeof window !== 'undefined') {
        this.userInfo = {};
        localStorage.removeItem('userInfo');
      }
    },
  },
});