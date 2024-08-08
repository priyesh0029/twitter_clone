// // stores/useUserStore.js
// import { defineStore } from 'pinia';

// function getInitialUserInfo() {
//   if (typeof window !== 'undefined') {
//     const userInfo = localStorage.getItem('userInfo');
//     return userInfo ? JSON.parse(userInfo) : {};
//   }
//   return {};
// }

// function getInitialToken() {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem('token') || '';
//   }
//   return '';
// }

// export const useUserStore = defineStore('user', {
//   state: () => ({
//     userInfo: getInitialUserInfo(),
//     token: getInitialToken(),
//   }),
//   actions: {
//     setToken(newToken) {
//       if (typeof window !== 'undefined') {
//         this.token = newToken;
//         localStorage.setItem('token', newToken);
//       }
//     },
//     clearToken() {
//       if (typeof window !== 'undefined') {
//         this.token = '';
//         localStorage.removeItem('token');
//       }
//     },
//     setUserInfo(newUserInfo) {
//       if (typeof window !== 'undefined') {
//         this.userInfo = newUserInfo;
//         localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
//       }
//     },
//     clearUserInfo() {
//       if (typeof window !== 'undefined') {
//         this.userInfo = {};
//         localStorage.removeItem('userInfo');
//       }
//     },
//   },
// });


import { defineStore } from 'pinia';
// import { useClientEffect } from '@nuxtjs/composition-api';

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