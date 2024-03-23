import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import circleDependency from 'vite-plugin-circular-dependency'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), circleDependency({ outputFilePath: './circleDep' })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
