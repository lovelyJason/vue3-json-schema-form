import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import circleDependency from 'vite-plugin-circular-dependency'
import path from 'node:path'
import fs from 'node:fs'

const outputPath = process.env.name || ''
let entry = path.resolve(__dirname, 'lib', outputPath, 'index.ts')

if (!fs.existsSync(entry)) {
  if (!fs.existsSync(path.resolve(__dirname, 'lib', outputPath, 'index.tsx'))) {
    throw Error('入口文件不存在')
  } else {
    entry = path.resolve(__dirname, 'lib', outputPath, 'index.tsx')
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), circleDependency({ outputFilePath: './circleDep' })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: entry,
      name: 'MyLib',
      // the proper extensions will be added
      fileName: 'index'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
