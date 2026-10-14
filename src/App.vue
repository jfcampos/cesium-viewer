<script setup lang="ts">
import GeospatialViewer from './components/GeospatialViewer.vue'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import FeatureInfoPanel from './components/FeatureInfoPanel.vue'
import { useViewerStore } from './stores/viewer.ts'

const viewerStore = useViewerStore()
</script>

<template>
  <v-app class="rounded rounded-md border">
    <v-app-bar title="Cesium Viewer"
      ><v-switch
        v-model="viewerStore.showTileset"
        class="me-4"
        label="Display tileset"
        hide-details
        inset
      ></v-switch>
      <v-slider
        v-model="viewerStore.maxScreenSpaceError"
        class="me-4 ms-4"
        inset
        hide-details
        max="50"
        min="1"
      ></v-slider
      ><label class="me-4"
        >Screen Space Error: {{ viewerStore.maxScreenSpaceError.toFixed(0) }}</label
      >
    </v-app-bar>
    <v-main>
      <GeospatialViewer></GeospatialViewer>
    </v-main>
    <v-navigation-drawer location="right">
      <FeatureInfoPanel></FeatureInfoPanel>
    </v-navigation-drawer>
  </v-app>
</template>

<style scoped></style>
