import { defineConfig, defineProject } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    projects: [
      defineProject({
        test: {
          name: 'unit',
          include: ['**/__tests__/**/*.unit.{test,spec}.ts'],
          environment: 'node',
        },
      }),
      defineProject({
        plugins: [tsconfigPaths(), react()],
        resolve: {
          alias: {
            '@': resolve(__dirname, 'src'),
          },
        },
        test: {
          name: 'browser',
          include: ['**/__tests__/**/*.browser.{test,spec}.ts{,x}'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
        },
      }),
    ],
  },
})
