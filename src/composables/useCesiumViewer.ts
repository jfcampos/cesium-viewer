import {
  Viewer,
  Ion,
  Terrain,
  Cesium3DTileset,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Cesium3DTileFeature,
} from 'cesium'

let cesiumViewer: Viewer | null = null

export default function useCesiumViewer(container?: HTMLDivElement | null) {
  // Create (or recreate) the viewer if undefined or destroyed
  if (!cesiumViewer || cesiumViewer.isDestroyed()) {
    // When creating a new viewer, container is required
    if (!container) {
      console.error('Trying to create a viewer without a container')
      return
    }
    cesiumViewer = new Viewer(container, {
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
  }

  return cesiumViewer
}
