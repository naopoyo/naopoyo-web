'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'

import { useClientOnly } from '@/hooks'
import { cn } from '@/lib/shadcn-utils'

import { NextLink } from '../link'

const MENU_ITEMS = [
  {
    label: 'Docs',
    segment: 'docs',
  },
  {
    label: 'Tags',
    segment: 'tags',
  },
  {
    label: 'Bookmarks',
    segment: 'bookmarks',
  },
  {
    label: 'Tools',
    segment: 'tools',
  },
  {
    label: 'About',
    segment: 'about',
  },
] as const

/**
 * NavBarMenu コンポーネント - ナビゲーションのメニューリストを表示します（クライアントコンポーネント）。
 * ホバー時にインジケーターがスムーズに移動するアニメーション付き。
 *
 * @returns メニューのリストを返します
 */
export default function NavBarMenu() {
  const segment = useSelectedLayoutSegment()
  const navRef = useRef<HTMLUListElement>(null)
  const { mounted } = useClientOnly()
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number
    width: number
    opacity: number
  }>({ left: 0, width: 0, opacity: 0 })

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget
    const nav = navRef.current
    if (!nav) return

    const navRect = nav.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()

    setIndicatorStyle({
      left: targetRect.left - navRect.left,
      width: targetRect.width,
      opacity: 1,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
  }, [])

  return (
    <ul ref={navRef} className="relative flex items-center gap-2" onMouseLeave={handleMouseLeave}>
      {/* ホバーインジケーター（背景） - クライアント側でのみレンダリング */}
      {mounted && (
        <li
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-1/2 h-9 -translate-y-1/2 rounded-md bg-muted/50',
            'transition-all duration-300 ease-out'
          )}
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            opacity: indicatorStyle.opacity,
          }}
        />
      )}

      {MENU_ITEMS.map((item) => {
        const isActive = segment === item.segment
        return (
          <li
            key={item.segment}
            className={cn(
              'relative text-sm text-muted-foreground transition-colors duration-200',
              'hover:text-link'
            )}
            onMouseEnter={handleMouseEnter}
          >
            <NextLink href={`/${item.segment}`} className="relative z-10 inline-block px-4 py-2">
              {item.label}
            </NextLink>
            {/* アクティブインジケーター（下線） */}
            <span
              className={cn(
                'absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 w-6 rounded-full bg-link',
                'transition-all duration-300 ease-out',
                isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
              )}
            />
          </li>
        )
      })}
    </ul>
  )
}
