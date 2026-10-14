<script setup lang="ts">
import GeospatialViewer from './components/GeospatialViewer.vue'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import FeatureInfoPanel from './components/FeatureInfoPanel.vue'
</script>

<template>
  <v-app class="rounded rounded-md border">
    <v-app-bar title="Cesium Viewer"></v-app-bar>
    <v-main>
      <GeospatialViewer></GeospatialViewer>
    </v-main>
    <v-navigation-drawer location="right">
      <FeatureInfoPanel></FeatureInfoPanel>
    </v-navigation-drawer>
  </v-app>
</template>

<style scoped></style>
