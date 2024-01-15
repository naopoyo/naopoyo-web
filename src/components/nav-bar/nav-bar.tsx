import { Menu } from 'lucide-react'
import Link from 'next/link'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { siteName } from '@/constants'

const menuItems = [
  {
    label: 'Search',
    href: '/search',
  },
  {
    label: 'Docs',
    href: '/',
  },
  {
    label: 'Tags',
    href: '/tags',
  },
  {
    label: 'Bookmarks',
    href: '/bookmarks',
  },
  {
    label: 'Tools',
    href: '/tools',
  },
  {
    label: 'About',
    href: '/about',
  },
]

export default function NavBar() {
  return (
    <header className="container sticky top-0 z-10 flex h-navbar flex-row justify-center backdrop-blur-xl">
      <div className="flex flex-auto items-center gap-4">
        <div className="text-2xl font-bold hover:text-link">
          <Link href="/">{siteName}</Link>
        </div>
        <div className="flex flex-auto justify-end md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              {menuItems.map((menuItem, i) => (
                <DropdownMenuItem key={`menu-item-${i}`} asChild>
                  <Link className="hover:cursor-pointer" href={menuItem.href}>
                    {menuItem.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ul className="hidden flex-auto flex-row items-center justify-end gap-6 md:flex">
          {menuItems.map((menuItem, i) => (
            <li key={`menu-item-${i}`} className="text-sm text-muted-foreground hover:text-primary">
              <Link href={menuItem.href}>{menuItem.label}</Link>
            </li>
          ))}
        </ul>

        <ThemeToggle />
      </div>
    </header>
  )
}
