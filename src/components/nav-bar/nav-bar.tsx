import Link from 'next/link'

import { ThemeToggle } from '@/components/theme-toggle'
import { SITE_NAME } from '@/constants'

import NavBarMenu from './nav-bar-menu'

export default function NavBar() {
  return (
    <header className="container sticky top-0 z-10 flex h-navbar flex-row justify-center backdrop-blur-xl">
      <div className="flex flex-auto items-center gap-4">
        <div className="text-2xl font-bold hover:text-link">
          <Link href="/">{SITE_NAME}</Link>
        </div>

        <NavBarMenu />

        <ThemeToggle />
      </div>
    </header>
  )
}
