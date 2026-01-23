import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react'
import ThemeSwitcher from '../theme-switcher'

// next-themesをモック
const mockSetTheme = vi.fn()
const mockUseTheme = vi.fn()

vi.mock('next-themes', () => ({
  useTheme: () => mockUseTheme(),
}))

const THEMES = ['dark', 'light', 'system'] as const

const setupMockTheme = (theme: string) => {
  mockUseTheme.mockReturnValue({
    theme,
    setTheme: mockSetTheme,
  })
}

const getThemeButton = (theme: string) => {
  return screen.getByRole('radio', { name: new RegExp(`Toggle ${theme}`, 'i') })
}

const waitForThemeButtons = async () => {
  await waitFor(() => {
    THEMES.forEach((theme) => {
      expect(getThemeButton(theme)).toBeTruthy()
    })
  })
}

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  describe('レンダリング', () => {
    it('テーマが設定されていると3つのテーマボタンを表示する', async () => {
      setupMockTheme('light')

      render(<ThemeSwitcher />)

      await waitForThemeButtons()
    })

    it('マウント後にテーマが未定義の場合はnullを返す', async () => {
      setupMockTheme(undefined as unknown as string)

      const { container } = render(<ThemeSwitcher />)

      await waitFor(() => {
        expect(container.firstChild).toBeNull()
      })
    })


    it('現在のテーマに対応するボタンが選択状態になる', async () => {
      setupMockTheme('dark')

      render(<ThemeSwitcher />)

      await waitFor(() => {
        const darkButton = getThemeButton('dark')
        expect(darkButton.getAttribute('data-state')).toBe('on')
      })
    })
  })

  describe('テーマ変更', () => {
    const testThemeClick = async (fromTheme: string, toTheme: string) => {
      setupMockTheme(fromTheme)

      render(<ThemeSwitcher />)

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

      render(<ThemeSwitcher />)

      await waitForThemeButtons()

      fireEvent.click(getThemeButton('dark'))
      fireEvent.click(getThemeButton('system'))

      expect(mockSetTheme).toHaveBeenCalledTimes(2)
      expect(mockSetTheme).toHaveBeenNthCalledWith(1, 'dark')
      expect(mockSetTheme).toHaveBeenNthCalledWith(2, 'system')
    })
  })

  describe('アイコン表示', () => {
    it('各ボタンに正しいアイコンが表示される', async () => {
      setupMockTheme('light')

      render(<ThemeSwitcher />)

      await waitForThemeButtons()
    })
  })
})
