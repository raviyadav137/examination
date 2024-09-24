export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
],
css: [
  '@fortawesome/fontawesome-free/css/all.css',
  '@/assets/css/input.css',
]
})
