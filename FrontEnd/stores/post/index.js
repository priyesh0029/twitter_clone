// stores/post/index.js
import { defineStore } from 'pinia';
import state from './state';
import * as getters from './getters';
import * as actions from './actions';

export const usePostStore = defineStore('post', {
  state,
  getters: { ...getters },
  actions: { ...actions },
});
