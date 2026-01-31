import { Suspense } from 'react'

import { NextLink } from '@/components/navigations/link'
import { SITE_NAME } from '@/constants'

import NavBarMenu from './nav-bar-menu'
import NavBarMenuFallback from './nav-bar-menu-fallback'

const HEADER_CLASS = `
  container mx-auto flex h-16 flex-row justify-center px-4 backdrop-blur-xl
  sm:sticky sm:top-0 sm:z-10
`
const LOGO_CLASS = `
  text-2xl font-bold
  hover:text-link
`
const DESKTOP_MENU_CLASS = `
  hidden flex-auto justify-end
  sm:flex
`
const MOBILE_MENU_WRAPPER_CLASS = `
  sticky top-0 z-10 container overflow-auto py-2 backdrop-blur-xl
  sm:hidden
`

/**
 * NavBar コンポーネント - サイト上部のナビゲーションバーを表示します。
 *
 * @returns ヘッダーとモバイル用メニューを含む JSX
 */
export default function NavBar() {
  return (
    <>
      <header className={HEADER_CLASS}>
        <div className="flex flex-auto items-center gap-4">
          <div className={LOGO_CLASS}>
            <NextLink href="/">{SITE_NAME}</NextLink>
          </div>

          <div className={DESKTOP_MENU_CLASS}>
            <Suspense fallback={<NavBarMenuFallback />}>
              <NavBarMenu />
            </Suspense>
          </div>
        </div>
      </header>
      <div className={MOBILE_MENU_WRAPPER_CLASS}>
        <Suspense fallback={<NavBarMenuFallback />}>
          <NavBarMenu />
        </Suspense>
      </div>
    </>
  )
}
