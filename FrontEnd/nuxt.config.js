// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "~/assets/css/color-mode.css"],
  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/ui",
    // '@nuxtjs/toast',
    "@nuxtjs/color-mode",
    '@nuxtjs/tailwindcss'

  ],
  runtimeConfig: {
    public: {
      POST_URL: process.env.POST_URL,
      BASE_URL : process.env.BASE_URL || 'http://localhost:3001/api'
    },
  },
  colorMode: {
    preference: "light",
  },
  plugins: ["~/plugins/api.js","~/plugins/toastify.js","~/plugins/fetch.js"],

  toast: {
    position: "top-right",
    duration: 5000,
  },
  routeRules :{
    '/login' : { ssr : false},
    '/' :{ssr : false},
  }
});
