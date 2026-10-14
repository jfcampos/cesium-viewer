<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  Viewer,
  Ion,
  Cesium3DTileset,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Cesium3DTileFeature,
} from 'cesium'

import { useViewerStore } from '@/stores/viewer'
import useCesiumViewer from '@/composables/useCesiumViewer'
import { type FeaturePropertyList } from '@/types'

Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_ACCESS_TOKEN

const cesiumContainer = ref<HTMLDivElement>()

let cesiumViewer: Viewer | undefined

let ssEventHanler: ScreenSpaceEventHandler | undefined

const viewerStore = useViewerStore()

onMounted(async () => {
  cesiumViewer = useCesiumViewer(cesiumContainer.value!)

  // Register events for mouse click
  ssEventHanler = new ScreenSpaceEventHandler(cesiumContainer.value)
  ssEventHanler.setInputAction(handleClick, ScreenSpaceEventType.LEFT_CLICK)

  try {
    const tileset = await Cesium3DTileset.fromUrl(import.meta.env.VITE_CESIUM_TILESET_URL)

    if (!cesiumViewer || cesiumViewer.isDestroyed()) {
      console.warn('Cesium viewer was destroyed before displaying the data')
      return
    }

    cesiumViewer.scene.primitives.add(tileset)

    await cesiumViewer.zoomTo(tileset)
  } catch (error) {
    console.error(`Error creating tileset: ${error}`)
  }
})

onBeforeUnmount(() => {
  if (cesiumViewer && !cesiumViewer.isDestroyed()) {
    cesiumViewer.destroy()
    cesiumViewer = undefined
    ssEventHanler = undefined
  }
})

function handleClick(e: ScreenSpaceEventHandler.PositionedEvent) {
  const picked = cesiumViewer?.scene.pick(e.position)
  handleSelect(picked && picked instanceof Cesium3DTileFeature ? picked : null)
}

function handleSelect(item: Cesium3DTileFeature | null) {
  let properties: FeaturePropertyList | null = null

  if (item !== null) {
    properties = []
    const propertyIds = item.getPropertyIds()
    propertyIds.map((pName) => {
      properties!.push({ key: pName, value: item.getProperty(pName) })
    })
  }
  viewerStore.selectFeature(item ? item.featureId.toString() : null, properties)
}
</script>

<template>
  <div ref="cesiumContainer"></div>
</template>
