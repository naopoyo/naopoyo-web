import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'

import { useClientOnly } from '../use-client-only'

describe('useClientOnly', () => {
  afterEach(() => {
    // cleanup not needed for hook tests
  })

  describe('基本動作', () => {
    it('mounted が boolean である', () => {
      const { result } = renderHook(() => useClientOnly())
      expect(typeof result.current.mounted).toBe('boolean')
    })

    it('マウント後に mounted が true になる', async () => {
      const { result } = renderHook(() => useClientOnly())

      await waitFor(() => {
        expect(result.current.mounted).toBe(true)
      })
    })

    it('複数回レンダリング後も mounted は true を保つ', async () => {
      const { result, rerender } = renderHook(() => useClientOnly())

      rerender()
      rerender()

      await waitFor(() => {
        expect(result.current.mounted).toBe(true)
      })
    })
  })
})
