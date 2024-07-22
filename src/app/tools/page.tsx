import { Metadata } from 'next'

import { Link } from '@/components/link'
import { PageHeader } from '@/components/page-header'

const title = 'Tools'

export const metadata: Metadata = {
  title: title,
  description: '便利ツールをまとめた一覧ページです。',
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function ToolsPage() {
  return (
    <div className="container">
      <PageHeader>{title}</PageHeader>
      <ul className="text-center">
        <li>
          <Link href="/tools/random-emoji">ランダム絵文字コピー</Link>
        </li>
      </ul>
    </div>
  )
}
