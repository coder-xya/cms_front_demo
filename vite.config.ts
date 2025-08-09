import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import {
  createStyleImportPlugin,
  ElementPlusResolve,
} from 'vite-plugin-style-import'; //自动按需引入ele反馈组件样式

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createStyleImportPlugin({
      //自动按需引入ele反馈组件样式
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'elementPlus',
          esModule: true,
          resolveStyle: (name: string) => {
            return `element-plus/thene-chalk/${name}.css`;
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }, //路径别名配置为了打包识别
  },
});
