import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { type FeaturePropertyList } from '@/types'
export const useViewerStore = defineStore('viewer', () => {
  const selectedFeatureId = ref<string | null>(null)
  const selectedFeatureProperties = ref<FeaturePropertyList | null>(null)
  const showTileset = ref(true)
  const maxScreenSpaceError = ref(16)

  function selectFeature(id: string | null, properties: FeaturePropertyList | null) {
    selectedFeatureId.value = id
    selectedFeatureProperties.value = properties
  }

  const hasSelection = computed(() => selectedFeatureId.value !== null)

  return {
    selectedFeatureId,
    selectFeature,
    hasSelection,
    selectedFeatureProperties,
    showTileset,
    maxScreenSpaceError,
  }
})
