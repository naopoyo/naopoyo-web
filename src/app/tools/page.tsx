import { Metadata } from 'next'

import { Container } from '@/components/layout'
import { PageHeader } from '@/components/layout'
import { Link } from '@/components/link'

const title = 'Tools'
const description = '便利ツールをまとめた一覧ページです。'

export const metadata: Metadata = {
  title: title,
  description: description,
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function ToolsPage() {
  return (
    <Container className="flex flex-col items-center gap-8 pt-16">
      <PageHeader title={title} description={description} />
      <ul className="text-center">
        <li>
          <Link href="/tools/random-emoji">ランダム絵文字コピー</Link>
        </li>
        <li>
          <Link href="/tools/rem-px-converter">rem / px 変換</Link>
        </li>
      </ul>
    </Container>
  )
}
