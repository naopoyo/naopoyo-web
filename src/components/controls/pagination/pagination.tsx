'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { ScrollShadow } from '@/components/decorations/scroll-shadow'
import { NextLink } from '@/components/navigations/link'
import { useClientOnly, useCreateQueryString } from '@/hooks'
import { cn } from '@/lib/shadcn-utils'

/**
 * ページネーション コンポーネントの Props
 *
 * - totalItems: 全アイテム数
 * - pageSize: 1ページあたりのアイテム数
 */
export type PaginationProps = {
  totalItems: number
  pageSize: number
}

/**
 * インジケーターのスタイル型
 * @internal
 */
type IndicatorStyle = {
  left: number
  width: number
  opacity: number
}

/**
 * ナビゲーションコンテナの CSS クラス
 * @internal
 */
const NAV_CONTAINER_CLASS = `flex flex-row items-center gap-3`

/**
 * ページリストの CSS クラス
 * @internal
 */
const PAGE_LIST_CLASS = `relative flex flex-row items-center gap-1`

/**
 * スライディングインジケーターの CSS クラス
 * @internal
 */
const INDICATOR_CLASS = `
  pointer-events-none absolute top-0 h-9 rounded-lg bg-foreground shadow-md transition-all
  duration-300 ease-out
`

/**
 * ページリンクの基本 CSS クラス
 * @internal
 */
const PAGE_LINK_BASE_CLASS = `
  relative z-10 flex size-9 items-center justify-center rounded-lg text-sm font-medium
  transition-colors duration-200 ease-out
  focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none
`

/**
 * 非アクティブなページリンクの CSS クラス
 * @internal
 */
const PAGE_LINK_INACTIVE_CLASS = `
  text-muted-foreground/70
  hover:text-foreground
  active:scale-[0.94]
`

/**
 * インジケーター上のページリンクの CSS クラス（白文字）
 * @internal
 */
const PAGE_LINK_ON_INDICATOR_CLASS = `text-background`

/**
 * アイテム件数表示の CSS クラス
 * @internal
 */
const ITEM_COUNT_CLASS = `
  flex shrink-0 items-center gap-1.5 rounded-lg border bg-card/50 px-3 py-1.5 text-xs
  text-muted-foreground
`

/**
 * 件数ハイライトの CSS クラス
 * @internal
 */
const COUNT_HIGHLIGHT_CLASS = `font-semibold text-foreground/80 tabular-nums`

/**
 * ページネーションコンポーネント
 *
 * ナビゲーションランドマークを持つ横方向のページネーションを表示します。
 * 現在表示しているアイテム範囲（例: 1 - 10 / 100）も併せて表示します。
 * ホバー時にインジケーターがスムーズに移動するアニメーション付き。
 *
 * @param props - PaginationProps
 * @returns ページネーションの JSX
 */
export default function Pagination({ totalItems, pageSize }: PaginationProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollAnchorRef = useRef<HTMLAnchorElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<Map<number, HTMLLIElement>>(new Map())
  const totalPages = Math.ceil(totalItems / pageSize)
  const createQueryString = useCreateQueryString({ withPathname: true })
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const { mounted } = useClientOnly()

  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({
    left: 0,
    width: 0,
    opacity: 0,
  })
  // インジケーターが現在乗っているページ番号（ホバー中はホバー先、それ以外はアクティブページ）
  const [indicatorOnPage, setIndicatorOnPage] = useState<number>(page)

  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
  const tmpEnd = pageSize * page
  const end = totalItems === 0 ? 0 : tmpEnd > totalItems ? totalItems : tmpEnd

  const pageItems = Array.from({ length: totalPages }).map((_, index) => ({
    num: index + 1,
    href: createQueryString({ page: (index + 1).toString() }),
  }))

  const isActive = (value: number) => value === page

  /**
   * 指定した要素の位置にインジケーターを移動（offsetLeft を使用してスクロールに対応）
   */
  const updateIndicatorPosition = useCallback((element: HTMLElement, pageNum: number) => {
    setIndicatorStyle({
      left: element.offsetLeft,
      width: element.offsetWidth,
      opacity: 1,
    })
    setIndicatorOnPage(pageNum)
  }, [])

  /**
   * アクティブページの位置にインジケーターを設定
   */
  const resetToActivePage = useCallback(() => {
    const activeItem = itemRefs.current.get(page)
    if (activeItem) {
      updateIndicatorPosition(activeItem, page)
    }
  }, [page, updateIndicatorPosition])

  /**
   * ホバー時のハンドラー
   */
  const handleMouseEnter = useCallback(
    (pageNum: number) => (e: React.MouseEvent<HTMLLIElement>) => {
      updateIndicatorPosition(e.currentTarget, pageNum)
    },
    [updateIndicatorPosition]
  )

  /**
   * ホバー解除時のハンドラー
   */
  const handleMouseLeave = useCallback(() => {
    resetToActivePage()
  }, [resetToActivePage])

  // アクティブページへの自動スクロール
  useEffect(() => {
    if (!scrollContainerRef.current || !scrollAnchorRef.current) {
      return
    }

    const container = scrollContainerRef.current
    const anchor = scrollAnchorRef.current
    const containerCenter = container.offsetLeft + container.clientWidth / 2
    const anchorCenter = anchor.offsetLeft + anchor.clientWidth / 2
    if (containerCenter < anchor.offsetLeft) {
      container.scrollLeft = anchorCenter - containerCenter
      // scrollLeft をプログラム的に設定した場合、scroll イベントが発火しないことがあるため手動でディスパッチ
      container.dispatchEvent(new Event('scroll'))
    }
  }, [])

  // マウント時とページ変更時にインジケーター位置を更新
  useLayoutEffect(() => {
    if (mounted) {
      resetToActivePage()
    }
  }, [mounted, resetToActivePage])

  return (
    <nav aria-label="ページネーション" className={NAV_CONTAINER_CLASS}>
      <ScrollShadow
        ref={scrollContainerRef}
        orientation="horizontal"
        shadowSize="lg"
        className="min-w-0 flex-1"
      >
        <ul ref={listRef} className={PAGE_LIST_CLASS} onMouseLeave={handleMouseLeave}>
          {/* スライディングインジケーター */}
          {mounted && (
            <li
              aria-hidden="true"
              className={INDICATOR_CLASS}
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
              }}
            />
          )}

          {pageItems.map((pageItem) => {
            const active = isActive(pageItem.num)
            // インジケーターがこの要素の上にあるかどうか
            const hasIndicator = pageItem.num === indicatorOnPage
            return (
              <li
                key={`paginator-${pageItem.num}`}
                ref={(el) => {
                  if (el) {
                    itemRefs.current.set(pageItem.num, el)
                  } else {
                    itemRefs.current.delete(pageItem.num)
                  }
                }}
                onMouseEnter={handleMouseEnter(pageItem.num)}
              >
                <NextLink
                  ref={active ? scrollAnchorRef : undefined}
                  href={pageItem.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    PAGE_LINK_BASE_CLASS,
                    hasIndicator ? PAGE_LINK_ON_INDICATOR_CLASS : PAGE_LINK_INACTIVE_CLASS
                  )}
                >
                  {pageItem.num}
                </NextLink>
              </li>
            )
          })}
        </ul>
      </ScrollShadow>
      <div className={ITEM_COUNT_CLASS}>
        <span className={COUNT_HIGHLIGHT_CLASS}>{totalItems}</span>
        <span>件中</span>
        <span className={COUNT_HIGHLIGHT_CLASS}>
          {start} – {end}
        </span>
      </div>
    </nav>
  )
}
