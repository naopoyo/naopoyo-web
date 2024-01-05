import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-10 flex h-[64px] flex-row justify-center bg-app-bg/50 px-8 backdrop-blur-xl">
      <div className="flex flex-auto items-center gap-4">
        <div className="text-2xl font-bold">
          <Link href="/">naopoyo</Link>
        </div>
        <ul className="flex flex-auto flex-row items-center justify-end gap-6">
          <li className="text-sm">
            <Link href="/search">Search</Link>
          </li>
          <li className="text-sm">
            <Link href="/">Docs</Link>
          </li>
          <li className="text-sm">
            <Link href="/tags">Tags</Link>
          </li>
          <li className="text-sm">
            <Link href="/tools">Tools</Link>
          </li>
          <li className="text-sm">
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
