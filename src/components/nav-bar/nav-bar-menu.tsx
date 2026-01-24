'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

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
 *
 * @returns メニューのリストを返します
 */
export default function NavBarMenu() {
  const segment = useSelectedLayoutSegment()

  return (
    <ul className="flex items-center gap-2">
      {MENU_ITEMS.map((item) => {
        const isActive = segment === item.segment
        return (
          <li
            key={item.segment}
            className={`
              relative text-sm text-muted-foreground
              hover:text-link
            `}
          >
            <NextLink
              href={`/${item.segment}`}
              className={`
                inline-block rounded-sm px-4 py-2
                hover:bg-muted/50
              `}
            >
              {item.label}
            </NextLink>
            {isActive && (
              <div className="absolute inset-x-0 bottom-0 mx-auto w-6 border-b border-link" />
            )}
          </li>
        )
      })}
    </ul>
  )
}
