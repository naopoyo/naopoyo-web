import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'

import Avatar, { AvatarProps } from '../avatar'

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text, @typescript-eslint/no-explicit-any
    return <img {...(props as any)} />
  },
}))

const SIZE_MAP: Record<NonNullable<AvatarProps['size']>, string> = {
  xs: '64',
  sm: '128',
  base: '192',
  lg: '256',
}

function expectValidAvatarImage(img: HTMLImageElement, expectedSize: string) {
  expect(img).toBeTruthy()
  expect(img.alt).toBe('Avatar')
  expect(img.getAttribute('width')).toBe(expectedSize)
  expect(img.getAttribute('height')).toBe(expectedSize)
}

describe('Avatar コンポーネント', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('サイズレンダリング', () => {
    it.each(Object.entries(SIZE_MAP))(
      'サイズ %s が正しくレンダリングされること',
      (size, expectedSize) => {
        render(<Avatar size={size as AvatarProps['size']} />)
        const img = screen.getByRole('img') as HTMLImageElement
        expectValidAvatarImage(img, expectedSize)
      }
    )
  })
})
