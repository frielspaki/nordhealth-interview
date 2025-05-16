// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', '@nuxt/test-utils/module'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: false,
  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    }
  },
  css:[
      '@provetcloud/css'
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.json'
      }
    ],
    lazy: true,
    defaultLocale: 'en'
  }
})
