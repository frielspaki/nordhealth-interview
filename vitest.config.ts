import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
    test: {
        globals: true,
        include: ['tests/**/*.spec.ts'],
        exclude: ['**/e2e/**'],
        environment: 'nuxt',
        environmentOptions: {
            nuxt: {
                domEnvironment: 'jsdom'
            }
        },
    }
});