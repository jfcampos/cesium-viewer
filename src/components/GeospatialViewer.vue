<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import {
  Viewer,
  Ion,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Cesium3DTileset,
  Cesium3DTileFeature,
} from 'cesium'

import { useViewerStore } from '@/stores/viewer'

import { type FeaturePropertyList } from '@/types'

Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_ACCESS_TOKEN

const cesiumContainer = ref<HTMLDivElement>()

const viewerStore = useViewerStore()

let cesiumViewer: Viewer | undefined
let tileset: Cesium3DTileset | undefined

watch(() => viewerStore.showTileset, setTilesetShow)

watch(() => viewerStore.maxScreenSpaceError, setMaximumScreenSpaceError)

onMounted(async () => {
  cesiumViewer = new Viewer(cesiumContainer.value as HTMLDivElement, {
    animation: false,
    timeline: false,
    geocoder: false,
    baseLayerPicker: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    infoBox: false,
    selectionIndicator: false,
  })

  cesiumViewer.screenSpaceEventHandler.setInputAction(handleClick, ScreenSpaceEventType.LEFT_CLICK)

  try {
    tileset = await Cesium3DTileset.fromUrl(import.meta.env.VITE_CESIUM_TILESET_URL)

    if (!cesiumViewer || cesiumViewer.isDestroyed()) {
      console.warn('Viewer was destroyed before tiles were added')
      tileset.destroy()
      return
    }

    cesiumViewer.scene.primitives.add(tileset)

    setMaximumScreenSpaceError(viewerStore.maxScreenSpaceError)

    setTilesetShow(viewerStore.showTileset)

    await cesiumViewer.zoomTo(tileset)
  } catch (error) {
    console.warn('Error loding the tileset', error)
    return
  }
})

onBeforeUnmount(() => {
  if (cesiumViewer && !cesiumViewer.isDestroyed()) {
    cesiumViewer.destroy()
  }
})

function handleClick(e: ScreenSpaceEventHandler.PositionedEvent) {
  if (cesiumViewer && !cesiumViewer.isDestroyed()) {
    const picked = cesiumViewer.scene.pick(e.position)

    handleSelect(picked && picked instanceof Cesium3DTileFeature ? picked : null)
  }
}

function handleSelect(item: Cesium3DTileFeature | null) {
  let properties: FeaturePropertyList | null = null

  if (item !== null) {
    properties = item.getPropertyIds().map((name) => ({ key: name, value: item.getProperty(name) }))
  }

  viewerStore.selectFeature(item ? item.featureId.toString() : null, properties)
}

function setMaximumScreenSpaceError(newValue: number) {
  if (tileset) {
    tileset.maximumScreenSpaceError = newValue
  }
}

function setTilesetShow(newValue: boolean) {
  if (tileset) {
    tileset.show = newValue
  }
}
</script>

<template>
  <div ref="cesiumContainer"></div>
</template>
