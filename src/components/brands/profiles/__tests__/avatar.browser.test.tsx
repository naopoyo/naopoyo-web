import { render, cleanup } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import Avatar, { AvatarProps } from '../avatar'

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { src, alt, width, height, ...rest } = props
    return (
      <img
        src={src as string}
        alt={alt as string}
        width={width as number}
        height={height as number}
        {...rest}
      />
    )
  },
}))

const SIZE_MAP: Record<AvatarProps['size'], number> = {
  xs: 64,
  sm: 128,
  base: 192,
  lg: 256,
}

describe('Avatar', () => {
  afterEach(() => cleanup())

  describe('サイズマッピング', () => {
    it.each(Object.entries(SIZE_MAP))('size="%s" で幅と高さが %d px になる', (size, expectedPx) => {
      const { container } = render(<Avatar size={size as AvatarProps['size']} />)
      const img = container.querySelector('img') as HTMLImageElement

      expect(img.width).toBe(expectedPx)
      expect(img.height).toBe(expectedPx)
    })
  })
})
