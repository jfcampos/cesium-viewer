import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { useViewerStore } from '../viewer'
import type { FeaturePropertyList } from '@/types'

const properties: FeaturePropertyList = [
  { key: 'ogc_fid', value: 42 },
  { key: 'name', value: 'Building A' },
]

describe('viewer store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with no selection and default tileset settings', () => {
    const store = useViewerStore()

    expect(store.selectedFeatureId).toBeNull()
    expect(store.selectedFeatureProperties).toBeNull()
    expect(store.hasSelection).toBe(false)
    expect(store.showTileset).toBe(true)
    expect(store.maxScreenSpaceError).toBe(16)
  })

  it('selectFeature stores the id and properties', () => {
    const store = useViewerStore()

    store.selectFeature('42', properties)

    expect(store.selectedFeatureId).toBe('42')
    expect(store.selectedFeatureProperties).toEqual(properties)
    expect(store.hasSelection).toBe(true)
  })

  it('selectFeature with null clears the selection', () => {
    const store = useViewerStore()
    store.selectFeature('42', properties)

    store.selectFeature(null, null)

    expect(store.selectedFeatureId).toBeNull()
    expect(store.selectedFeatureProperties).toBeNull()
    expect(store.hasSelection).toBe(false)
  })

  it('selecting another feature replaces the previous selection', () => {
    const store = useViewerStore()
    const otherProperties: FeaturePropertyList = [{ key: 'ogc_fid', value: 7 }]
    store.selectFeature('42', properties)

    store.selectFeature('7', otherProperties)

    expect(store.selectedFeatureId).toBe('7')
    expect(store.selectedFeatureProperties).toEqual(otherProperties)
  })

  it('hasSelection depends on the id, not on the properties', () => {
    const store = useViewerStore()

    store.selectFeature('42', null)

    expect(store.hasSelection).toBe(true)
  })

  it('allows updating tileset visibility and maximum screen space error', () => {
    const store = useViewerStore()

    store.showTileset = false
    store.maxScreenSpaceError = 4

    expect(store.showTileset).toBe(false)
    expect(store.maxScreenSpaceError).toBe(4)
  })

  it('does not share state between Pinia instances', () => {
    const first = useViewerStore()
    first.selectFeature('42', properties)

    setActivePinia(createPinia())
    const second = useViewerStore()

    expect(second.hasSelection).toBe(false)
  })
})
