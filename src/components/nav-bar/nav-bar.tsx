import Link from 'next/link'

import { SITE_NAME } from '@/constants'

import NavBarMenu from './nav-bar-menu'

/**
 * NavBar コンポーネント - サイト上部のナビゲーションバーを表示します。
 *
 * @returns ヘッダーとモバイル用メニューを含む JSX
 */
export default function NavBar() {
  return (
    <>
      <header
        className={`
          container mx-auto flex h-16 flex-row justify-center px-4
          backdrop-blur-xl
          sm:sticky sm:top-0 sm:z-10
        `}
      >
        <div className="flex flex-auto items-center gap-4">
          <div
            className={`
              text-2xl font-bold
              hover:text-link
            `}
          >
            <Link href="/">{SITE_NAME}</Link>
          </div>

          <div
            className={`
              hidden flex-auto justify-end
              sm:flex
            `}
          >
            <NavBarMenu />
          </div>
        </div>
      </header>
      <div
        className={`
          sticky top-0 z-10 container overflow-auto py-2 backdrop-blur-xl
          sm:hidden
        `}
      >
        <NavBarMenu />
      </div>
    </>
  )
}
