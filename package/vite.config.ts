/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import autoprefixer from 'autoprefixer'
import dts from 'vite-plugin-dts'
import preserveDirectives from 'rollup-preserve-directives'

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
      external: ['react', 'react-dom', 'react/jsx-runtime'],
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
