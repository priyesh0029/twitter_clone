// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    // '@nuxtjs/toast',
  ],
  plugins: [
    '~/plugins/axios.js',
  ],
  toast: {
    position: 'top-right',
    duration: 5000,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  router: {
    middleware: ['auth']
  }
});
