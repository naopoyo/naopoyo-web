import { renderHook, cleanup } from '@testing-library/react'
import tocbot from 'tocbot'
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'

vi.mock('tocbot', () => ({
  default: {
    init: vi.fn(),
    destroy: vi.fn(),
  },
}))

vi.mock('@/lib/hackersheet/style', () => ({
  documentContentStyle: {
    main: 'content-main',
  },
}))

import { useTocbot } from '../use-tocbot'

const CONTENT_SELECTOR = '.content-main'

describe('useTocbot', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    // テスト用コンテンツ要素を除去
    document.querySelectorAll(CONTENT_SELECTOR).forEach((el) => el.remove())
  })

  describe('初期化', () => {
    it('マウント時に tocbot.destroy → tocbot.init の順で呼ばれる', () => {
      renderHook(() => useTocbot({ tocSelector: '#toc' }))

      const destroyOrder = vi.mocked(tocbot.destroy).mock.invocationCallOrder[0]
      const initOrder = vi.mocked(tocbot.init).mock.invocationCallOrder[0]

      expect(tocbot.destroy).toHaveBeenCalled()
      expect(tocbot.init).toHaveBeenCalled()
      expect(destroyOrder).toBeLessThan(initOrder)
    })

    it('正しいオプションで tocbot.init が呼ばれる', () => {
      renderHook(() => useTocbot({ tocSelector: '#toc' }))

      expect(tocbot.init).toHaveBeenCalledWith({
        headingSelector: 'h2, h3, h4, h5, h6',
        scrollSmooth: false,
        headingsOffset: 81,
        throttleTimeout: 0,
        scrollHandlerType: 'throttle',
        tocSelector: '#toc',
        contentSelector: CONTENT_SELECTOR,
      })
    })

    it('異なる tocSelector でも正しく初期化される', () => {
      renderHook(() => useTocbot({ tocSelector: '.my-toc' }))

      expect(tocbot.init).toHaveBeenCalledWith(
        expect.objectContaining({
          tocSelector: '.my-toc',
          contentSelector: CONTENT_SELECTOR,
        })
      )
    })
  })

  describe('リサイズイベント', () => {
    it('resize イベントで tocbot が再初期化される', () => {
      renderHook(() => useTocbot({ tocSelector: '#toc' }))

      vi.mocked(tocbot.destroy).mockClear()
      vi.mocked(tocbot.init).mockClear()

      window.dispatchEvent(new Event('resize'))

      expect(tocbot.destroy).toHaveBeenCalledTimes(1)
      expect(tocbot.init).toHaveBeenCalledTimes(1)
    })

    it('複数回の resize でその回数分再初期化される', () => {
      renderHook(() => useTocbot({ tocSelector: '#toc' }))

      vi.mocked(tocbot.destroy).mockClear()
      vi.mocked(tocbot.init).mockClear()

      window.dispatchEvent(new Event('resize'))
      window.dispatchEvent(new Event('resize'))
      window.dispatchEvent(new Event('resize'))

      expect(tocbot.destroy).toHaveBeenCalledTimes(3)
      expect(tocbot.init).toHaveBeenCalledTimes(3)
    })
  })

  describe('MutationObserver - コンテンツ要素が存在する場合', () => {
    it('コンテンツ要素の DOM 変更で tocbot が再初期化される', async () => {
      const contentEl = document.createElement('div')
      contentEl.className = 'content-main'
      document.body.appendChild(contentEl)

      renderHook(() => useTocbot({ tocSelector: '#toc' }))

      vi.mocked(tocbot.destroy).mockClear()
      vi.mocked(tocbot.init).mockClear()

      // コンテンツに子要素を追加して MutationObserver をトリガー
      const child = document.createElement('h2')
      child.textContent = 'New heading'
      contentEl.appendChild(child)

      // MutationObserver のコールバックは非同期
      await vi.waitFor(() => {
        expect(tocbot.init).toHaveBeenCalled()
      })
    })
  })

  describe('MutationObserver - コンテンツ要素が存在しない場合', () => {
    it('body を監視し、コンテンツ要素が出現したら tocbot を再初期化する', async () => {
      // コンテンツ要素なしでマウント
      renderHook(() => useTocbot({ tocSelector: '#toc' }))

      vi.mocked(tocbot.destroy).mockClear()
      vi.mocked(tocbot.init).mockClear()

      // コンテンツ要素を追加して body の MutationObserver をトリガー
      const contentEl = document.createElement('div')
      contentEl.className = 'content-main'
      document.body.appendChild(contentEl)

      await vi.waitFor(() => {
        expect(tocbot.init).toHaveBeenCalled()
      })
    })

    it('コンテンツ要素出現後、コンテンツ内の変更でも再初期化される', async () => {
      renderHook(() => useTocbot({ tocSelector: '#toc' }))

      // コンテンツ要素を追加（body observer がトリガー）
      const contentEl = document.createElement('div')
      contentEl.className = 'content-main'
      document.body.appendChild(contentEl)

      await vi.waitFor(() => {
        expect(tocbot.init).toHaveBeenCalledTimes(2) // 初回 + コンテンツ出現
      })

      vi.mocked(tocbot.destroy).mockClear()
      vi.mocked(tocbot.init).mockClear()

      // コンテンツ内を変更（content observer がトリガー）
      const heading = document.createElement('h2')
      heading.textContent = 'Dynamic heading'
      contentEl.appendChild(heading)

      await vi.waitFor(() => {
        expect(tocbot.init).toHaveBeenCalled()
      })
    })

    it('コンテンツ要素以外の body 変更では tocbot は再初期化されない', async () => {
      renderHook(() => useTocbot({ tocSelector: '#toc' }))

      vi.mocked(tocbot.destroy).mockClear()
      vi.mocked(tocbot.init).mockClear()

      // コンテンツ要素ではない要素を body に追加
      const unrelatedEl = document.createElement('div')
      unrelatedEl.className = 'unrelated'
      document.body.appendChild(unrelatedEl)

      // MutationObserver コールバックは発火するが、querySelector で content-main が
      // 見つからないため initTocbot は呼ばれない
      await new Promise((resolve) => setTimeout(resolve, 50))

      expect(tocbot.init).not.toHaveBeenCalled()

      // クリーンアップ
      unrelatedEl.remove()
    })
  })

  describe('クリーンアップ', () => {
    it('アンマウント時に tocbot.destroy が呼ばれる', () => {
      const { unmount } = renderHook(() => useTocbot({ tocSelector: '#toc' }))

      vi.mocked(tocbot.destroy).mockClear()

      unmount()

      expect(tocbot.destroy).toHaveBeenCalledTimes(1)
    })

    it('アンマウント時に resize リスナーが解除される', () => {
      const { unmount } = renderHook(() => useTocbot({ tocSelector: '#toc' }))

      unmount()

      vi.mocked(tocbot.destroy).mockClear()
      vi.mocked(tocbot.init).mockClear()

      window.dispatchEvent(new Event('resize'))

      expect(tocbot.init).not.toHaveBeenCalled()
    })

    it('アンマウント時に MutationObserver が切断される', async () => {
      const contentEl = document.createElement('div')
      contentEl.className = 'content-main'
      document.body.appendChild(contentEl)

      const { unmount } = renderHook(() => useTocbot({ tocSelector: '#toc' }))

      unmount()

      vi.mocked(tocbot.destroy).mockClear()
      vi.mocked(tocbot.init).mockClear()

      // アンマウント後のコンテンツ変更は tocbot を呼ばない
      const child = document.createElement('h3')
      contentEl.appendChild(child)

      await new Promise((resolve) => setTimeout(resolve, 50))

      expect(tocbot.init).not.toHaveBeenCalled()
    })
  })

  describe('tocSelector の変更', () => {
    it('tocSelector が変わると tocbot が再初期化される', () => {
      const { rerender } = renderHook(
        ({ tocSelector }: { tocSelector: string }) => useTocbot({ tocSelector }),
        { initialProps: { tocSelector: '#toc-1' } }
      )

      vi.mocked(tocbot.init).mockClear()

      rerender({ tocSelector: '#toc-2' })

      expect(tocbot.init).toHaveBeenCalledWith(
        expect.objectContaining({
          tocSelector: '#toc-2',
        })
      )
    })
  })
})
