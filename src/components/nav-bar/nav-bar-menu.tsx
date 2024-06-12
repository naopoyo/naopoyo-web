'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
    <>
      <div className="flex flex-auto justify-end md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Menu Button">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            {items.map((item, i) => (
              <DropdownMenuItem key={`menu-item-${i}`} asChild>
                <Link className="hover:cursor-pointer" href={`/${item.segment}`}>
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ul className="hidden flex-auto flex-row items-center justify-end gap-6 md:flex">
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
    </>
  )
}
