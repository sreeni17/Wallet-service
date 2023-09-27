import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vitePluginRequire from 'vite-plugin-require';

export default defineConfig({
  base: '/',

  plugins: [vue()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: [
      'vue',
    ],
  },
  server: {
    port: 8080,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'MyLib',
      fileName: (format) => `my-lib.${format}.js`,
    },
    outDir: './dist/',
  },
});
