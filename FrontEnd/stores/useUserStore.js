// stores/useUserStore.js
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: useLocalStorage('userInfo', {}),
    token: useLocalStorage('token', ''),
  }),
  actions: {
    setToken(newToken) {
      this.token = newToken;
    },
    clearToken() {
      this.token = '';
    },
    setUserInfo(newUserInfo) {
      this.userInfo = newUserInfo;
    },
    clearUserInfo() {
      this.userInfo = {};
    },
  },
});
