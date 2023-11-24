import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPLugin from 'vite-plugin-eslint'
import { resolve } from 'path'
import json5Plugin from 'vite-plugin-json5'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  plugins: [vue(), eslintPLugin(), json5Plugin()],
})
