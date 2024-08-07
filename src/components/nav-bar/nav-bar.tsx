import Link from 'next/link'

import { SITE_NAME } from '@/constants'

import NavBarMenu from './nav-bar-menu'

export default function NavBar() {
  return (
    <>
      <header className="container flex h-navbar flex-row justify-center backdrop-blur-xl sm:sticky sm:top-0 sm:z-10">
        <div className="flex flex-auto items-center gap-4">
          <div className="text-2xl font-bold hover:text-link">
            <Link href="/">{SITE_NAME}</Link>
          </div>

          <div className="hidden flex-auto justify-end sm:flex">
            <NavBarMenu />
          </div>
        </div>
      </header>
      <div className="container sticky top-0 z-10 overflow-auto py-2 backdrop-blur-xl sm:hidden">
        <NavBarMenu />
      </div>
    </>
  )
}
