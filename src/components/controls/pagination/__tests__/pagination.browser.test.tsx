import { cleanup, render, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { NuqsTestingAdapter } from 'nuqs/adapters/testing'
import { afterEach, describe, expect, it, vi } from 'vitest'

import Pagination from '../pagination'

/**
 * テスト用レンダーヘルパー
 * @param totalItems - 全アイテム数
 * @param pageSize - 1 ページあたりのアイテム数
 * @param searchParams - 初期クエリパラメータ
 */
function renderPagination(
  totalItems: number,
  pageSize: number,
  searchParams: Record<string, string> = {}
) {
  return render(
    <NuqsTestingAdapter searchParams={searchParams}>
      <Pagination totalItems={totalItems} pageSize={pageSize} />
    </NuqsTestingAdapter>
  )
}

/**
 * 件数表示セクションを取得する
 * nav 直下の最後の div（「N 件中 start – end」が表示される領域）
 */
function getCountSection(container: HTMLElement): Element | null {
  const nav = container.querySelector('nav')
  if (!nav) return null
  const divs = nav.querySelectorAll(':scope > div')
  return divs[divs.length - 1] ?? null
}

describe('Pagination', () => {
  afterEach(() => cleanup())

  describe('ページボタンの生成', () => {
    it('totalItems=30, pageSize=10 の場合、3 つのページボタンが表示される', () => {
      const { container } = renderPagination(30, 10)
      const buttons = container.querySelectorAll('button[type="button"]')
      expect(buttons).toHaveLength(3)
    })

    it('totalItems=25, pageSize=10 の場合、端数切り上げで 3 つのページボタンが表示される', () => {
      const { container } = renderPagination(25, 10)
      const buttons = container.querySelectorAll('button[type="button"]')
      expect(buttons).toHaveLength(3)
    })

    it('totalItems=10, pageSize=10 の場合、1 つのページボタンが表示される', () => {
      const { container } = renderPagination(10, 10)
      const buttons = container.querySelectorAll('button[type="button"]')
      expect(buttons).toHaveLength(1)
    })

    it('totalItems=0 の場合、ページボタンが表示されない', () => {
      const { container } = renderPagination(0, 10)
      const buttons = container.querySelectorAll('button[type="button"]')
      expect(buttons).toHaveLength(0)
    })
  })

  describe('アイテム件数表示', () => {
    it('totalItems=100, pageSize=10 でデフォルト（1ページ目）の場合、件数と範囲が表示される', () => {
      const { container } = renderPagination(100, 10)
      const countSection = getCountSection(container)

      expect(countSection?.textContent).toContain('100')
      expect(countSection?.textContent).toContain('件中')
      expect(countSection?.textContent).toContain('1 – 10')
    })

    it('page=3 の場合、"21 – 30" の範囲が表示される', () => {
      const { container } = renderPagination(100, 10, { page: '3' })
      const countSection = getCountSection(container)

      expect(countSection?.textContent).toContain('21 – 30')
    })

    it('最終ページで端数がある場合、end が totalItems を超えない', () => {
      const { container } = renderPagination(25, 10, { page: '3' })
      const countSection = getCountSection(container)

      expect(countSection?.textContent).toContain('21 – 25')
    })

    it('totalItems=0 の場合、"0 件中 0 – 0" と表示される', () => {
      const { container } = renderPagination(0, 10)
      const countSection = getCountSection(container)

      expect(countSection?.textContent).toContain('0')
      expect(countSection?.textContent).toContain('件中')
      expect(countSection?.textContent).toContain('0 – 0')
    })
  })

  describe('アクティブページ', () => {
    it('デフォルトでは 1 ページ目に aria-current="page" が設定される', () => {
      const { container } = renderPagination(30, 10)
      const activeButton = container.querySelector('button[aria-current="page"]')

      expect(activeButton).not.toBeNull()
      expect(activeButton?.textContent).toBe('1')
    })

    it('page=2 の場合、2 ページ目に aria-current="page" が設定される', () => {
      const { container } = renderPagination(30, 10, { page: '2' })
      const activeButton = container.querySelector('button[aria-current="page"]')

      expect(activeButton).not.toBeNull()
      expect(activeButton?.textContent).toBe('2')
    })

    it('非アクティブなページには aria-current が設定されない', () => {
      const { container } = renderPagination(30, 10)
      const buttons = container.querySelectorAll('button[type="button"]')
      const inactiveButtons = Array.from(buttons).filter((btn) => !btn.hasAttribute('aria-current'))

      expect(inactiveButtons).toHaveLength(2)
    })
  })

  describe('ページクリック', () => {
    it('ページボタンをクリックすると page クエリパラメータが更新される', async () => {
      const user = userEvent.setup()
      const onUrlUpdate = vi.fn()

      const { container } = render(
        <NuqsTestingAdapter searchParams={{}} onUrlUpdate={onUrlUpdate}>
          <Pagination totalItems={30} pageSize={10} />
        </NuqsTestingAdapter>
      )

      const buttons = container.querySelectorAll('button[type="button"]')
      await user.click(buttons[1]!)

      await waitFor(() => {
        expect(onUrlUpdate).toHaveBeenCalledWith(
          expect.objectContaining({
            searchParams: expect.any(URLSearchParams),
          })
        )
      })
      const urlUpdate = onUrlUpdate.mock.calls[0][0]
      expect(urlUpdate.searchParams.get('page')).toBe('2')
    })
  })

  describe('アクセシビリティ', () => {
    it('nav 要素に aria-label="ページネーション" が設定されている', () => {
      const { container } = renderPagination(30, 10)
      const nav = container.querySelector('nav[aria-label="ページネーション"]')

      expect(nav).not.toBeNull()
    })
  })
})
