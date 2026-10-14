<script setup lang="ts">
import { useViewerStore } from '@/stores/viewer'

const viewerStore = useViewerStore()
</script>

<template>
  <h2>Panel</h2>
  <div v-if="viewerStore.hasSelection">
    <span>Selected feature</span>
    <div v-for="property in viewerStore.selectedFeatureProperties" :key="property.key">
      {{ property.key }} : {{ property.value }}
    </div>
  </div>
</template>
