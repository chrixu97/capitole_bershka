// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  runtimeConfig: {
    public: {
      categoriesApiUrl: process.env.NUXT_PUBLIC_CATEGORIES_API_URL,
    }
  },
  css: [
    "~/assets/styles/styles.scss",
  ],
  alias: {
    "@Styles": "./assets/styles",
  }
})