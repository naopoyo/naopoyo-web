import { Metadata } from 'next'

import { Container } from '@/components/layout'
import { Link } from '@/components/link'
import { PageHeader } from '@/components/page-header'

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
    <Container>
      <div className="my-16 flex flex-col items-center gap-4">
        <PageHeader>{title}</PageHeader>

        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ul className="text-center">
        <li>
          <Link href="/tools/random-emoji">ランダム絵文字コピー</Link>
        </li>
      </ul>
    </Container>
  )
}
