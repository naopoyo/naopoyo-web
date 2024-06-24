'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import { cn } from '@/lib/shadcn-utils'

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
    <ul className="flex items-center gap-6">
      {items.map((item, i) => (
        <li
          key={`menu-item-${i}`}
          className={cn(
            'text-sm text-muted-foreground hover:text-primary py-2',
            item.isActive ? 'border-b' : ''
          )}
        >
          <Link href={`/${item.segment}`}>{item.label}</Link>
        </li>
      ))}
    </ul>
  )
}
