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
  ],
  colorMode: {
    preference: "light",
  },
  plugins: ["~/plugins/axios.js"],
  toast: {
    position: "top-right",
    duration: 5000,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  routeRules :{
    '/login' : { ssr : false},
    '/' :{ssr : false},
  }
});
