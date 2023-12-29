import { Metadata } from 'next'

import { Link } from '@/components/link'

export const metadata: Metadata = {
  title: 'Tools',
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function ToolsPage() {
  return (
    <>
      <h1 className="py-16 text-center text-4xl font-bold">Tools</h1>
      <ul className="text-center">
        <li>
          <Link href="/tools/random-emoji">ランダム絵文字コピー</Link>
        </li>
      </ul>
    </>
  )
}
