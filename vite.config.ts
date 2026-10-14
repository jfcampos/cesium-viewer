import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { viteStaticCopy } from 'vite-plugin-static-copy'

const cesiumSource = 'node_modules/cesium/Build/Cesium'
const cesiumBaseUrl = 'cesiumStatic'
// static-copy v4 preserves the full src path; strip `node_modules/cesium/Build/Cesium`
const rename = { stripBase: cesiumSource.split('/').length }

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    viteStaticCopy({
      targets: [
        { src: `${cesiumSource}/ThirdParty`, dest: cesiumBaseUrl, rename },
        { src: `${cesiumSource}/Workers`, dest: cesiumBaseUrl, rename },
        { src: `${cesiumSource}/Assets`, dest: cesiumBaseUrl, rename },
        { src: `${cesiumSource}/Widgets`, dest: cesiumBaseUrl, rename },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: { CESIUM_BASE_URL: JSON.stringify(`/${cesiumBaseUrl}`) },
})
