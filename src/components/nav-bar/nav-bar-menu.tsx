'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

const menuItems = [
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
]

export default function NavBarMenu() {
  const segment = useSelectedLayoutSegment()

  const items = menuItems.map((item) => ({
    ...item,
    isActive: segment === item.segment,
  }))

  return (
    <ul className="flex items-center gap-2">
      {items.map((item, i) => (
        <li
          key={`menu-item-${i}`}
          className={`
            relative text-sm text-muted-foreground
            hover:text-link
          `}
        >
          <Link
            href={`/${item.segment}`}
            className={`
              inline-block rounded px-4 py-2
              hover:bg-muted/50
            `}
          >
            {item.label}
          </Link>
          {item.isActive && (
            <div
              className={`
                absolute inset-x-0 bottom-0 mx-auto w-6 border-b border-link
              `}
            ></div>
          )}
        </li>
      ))}
    </ul>
  )
}
