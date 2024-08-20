// plugins/fetch.js
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('customFetch', $fetch);
});
