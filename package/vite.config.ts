/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import autoprefixer from 'autoprefixer'
import dts from 'vite-plugin-dts'
import preserveDirectives from 'rollup-preserve-directives'
import { fileURLToPath } from 'node:url'

const filesNeedToExclude = ['readme']

const filesPathToExclude = filesNeedToExclude.map((src) => {
  return fileURLToPath(new URL(src, import.meta.url))
})

export default defineConfig({
  plugins: [
    react(),
    preserveDirectives(),
    dts({
      exclude: ['**/*.stories.tsx', 'src/test-setup.ts', '**/*.test.tsx'],
      insertTypesEntry: true,
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  build: {
    cssCodeSplit: false, // Inline CSS into JS bundle

    lib: {
      fileName: 'index',
      cssFileName: 'index',
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', ...filesPathToExclude],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'React-dom',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
    preprocessorOptions: {
      scss: {},
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
    css: false,
  },
})
