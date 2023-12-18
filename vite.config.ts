import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPLugin from 'vite-plugin-eslint';
import { resolve } from 'path';
import JSON5 from 'json5';
import type { Plugin } from 'vite';
const fileRegex = /\.(jsonc|json5)$/;

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  plugins: [vue(), eslintPLugin(), json5Plugin()],
});

/**
 * Vue vite needs the json5 npm package as a vue vite plugin.
 * @returns jsong5 npm as a vue vite plugin.
 */
function json5Plugin(): Plugin {
  return {
    name: 'vite:parse-json5',

    async transform(code: string, id: string) {
      if (fileRegex.test(id)) {
        return {
          code: `const data = ${JSON.stringify(JSON5.parse(code))};\nexport default data;`,
          map: { mappings: '' },
        };
      }
      return null;
    },
  };
}
