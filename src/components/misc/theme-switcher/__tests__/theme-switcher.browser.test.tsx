import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import ThemeSwitcher from '../theme-switcher'

// next-themesをモック
const mockSetTheme = vi.fn()
const mockUseTheme = vi.fn()

vi.mock('next-themes', () => ({
  useTheme: () => mockUseTheme(),
}))

/**
 * テーマ名と対応するaria-labelのマッピング
 */
const THEME_LABELS = {
  dark: 'ダークモード',
  system: 'システム設定',
  light: 'ライトモード',
} as const

type Theme = keyof typeof THEME_LABELS

const THEMES: Theme[] = ['dark', 'light', 'system']

const setupMockTheme = (theme: string) => {
  mockUseTheme.mockReturnValue({
    theme,
    setTheme: mockSetTheme,
  })
}

const getThemeButton = (theme: Theme) => {
  return screen.getByRole('radio', { name: THEME_LABELS[theme] })
}

const waitForThemeButtons = async () => {
  await waitFor(() => {
    THEMES.forEach((theme) => {
      expect(getThemeButton(theme)).toBeInTheDocument()
    })
  })
}

const renderComponent = () => {
  return render(<ThemeSwitcher />)
}

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('レンダリング', () => {
    it('テーマが設定されていると3つのテーマボタンを表示する', async () => {
      setupMockTheme('light')

      renderComponent()

      await waitForThemeButtons()
    })

    it('マウント後にテーマが未定義の場合はnullを返す', async () => {
      setupMockTheme(undefined as unknown as string)

      const { container } = renderComponent()

      await waitFor(() => {
        expect(container.firstChild).toBeNull()
      })
    })

    it('現在のテーマに対応するボタンが選択状態になる', async () => {
      setupMockTheme('dark')

      renderComponent()

      await waitFor(() => {
        const darkButton = getThemeButton('dark')
        expect(darkButton).toHaveAttribute('aria-checked', 'true')
      })
    })
  })

  describe('テーマ変更', () => {
    const testThemeClick = async (fromTheme: Theme, toTheme: Theme) => {
      setupMockTheme(fromTheme)

      renderComponent()

      await waitForThemeButtons()

      const button = getThemeButton(toTheme)
      fireEvent.click(button)

      expect(mockSetTheme).toHaveBeenCalledWith(toTheme)
    }

    it('darkボタンをクリックするとsetThemeが呼ばれる', async () => {
      await testThemeClick('light', 'dark')
    })

    it('systemボタンをクリックするとsetThemeが呼ばれる', async () => {
      await testThemeClick('light', 'system')
    })

    it('lightボタンをクリックするとsetThemeが呼ばれる', async () => {
      await testThemeClick('dark', 'light')
    })
  })

  describe('複数クリック', () => {
    it('異なるテーマを順番にクリックするとsetThemeが呼ばれる', async () => {
      setupMockTheme('light')

      renderComponent()

      await waitForThemeButtons()

      fireEvent.click(getThemeButton('dark'))
      fireEvent.click(getThemeButton('system'))

      expect(mockSetTheme).toHaveBeenCalledTimes(2)
      expect(mockSetTheme).toHaveBeenNthCalledWith(1, 'dark')
      expect(mockSetTheme).toHaveBeenNthCalledWith(2, 'system')
    })
  })
})
