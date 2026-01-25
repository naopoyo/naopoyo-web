import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'

import Avatar, { AvatarProps } from '../avatar'

// next/imageのモック
vi.mock('next/image', () => ({
  __esModule: true,
  default: vi.fn((props: Record<string, unknown>) => {
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
  }),
}))

const SIZE_MAP: Record<NonNullable<AvatarProps['size']>, number> = {
  xs: 64,
  sm: 128,
  base: 192,
  lg: 256,
}

describe('Avatar', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('画像のレンダリング', () => {
    it('正しいalt属性を持つイメージを表示する', () => {
      render(<Avatar size="base" />)
      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('alt', 'Avatar')
    })

    it('正しい画像ファイルを使用する', () => {
      render(<Avatar size="base" />)
      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('src', expect.stringContaining('/naopoyo2.png'))
    })
  })

  describe('サイズ', () => {
    it.each(Object.entries(SIZE_MAP))(
      'サイズ "%s" で幅と高さが %s px に設定されている',
      (size, expectedSize) => {
        render(<Avatar size={size as AvatarProps['size']} />)
        const img = screen.getByRole('img') as HTMLImageElement

        expect(img.width).toBe(expectedSize)
        expect(img.height).toBe(expectedSize)
      }
    )
  })
})
