<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Viewer, Ion, Terrain } from 'cesium'
Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_ACCESS_TOKEN
const cesiumContainer = ref<HTMLDivElement>()

let cesiumViewer: Viewer | undefined

onMounted(() => {
  cesiumViewer = new Viewer(cesiumContainer.value!, {
    terrain: Terrain.fromWorldTerrain(),
  })
})

onBeforeUnmount(() => {
  if (cesiumViewer && !cesiumViewer.isDestroyed()) {
    cesiumViewer.destroy()
    cesiumViewer = undefined
  }
})
</script>

<template>
  <div ref="cesiumContainer"></div>
</template>
