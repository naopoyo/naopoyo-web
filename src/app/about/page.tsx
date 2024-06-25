import { Metadata } from 'next'

import { Avater } from '@/components/avatar'
import { FlexCol } from '@/components/layout'
import { Link } from '@/components/link'
import { PageHeader } from '@/components/page-header'
import { Paragraph as P } from '@/components/paragraph'
import { SnsList } from '@/components/sns-list'
import { SITE_DESC } from '@/constants'

const title = 'About'

export const metadata: Metadata = {
  title: title,
}

export default function AbountPage() {
  return (
    <div className="container">
      <PageHeader>{title}</PageHeader>

      <FlexCol className="items-center justify-center gap-8 pb-8 md:flex-row md:items-start">
        <Avater size="lg" />

        <FlexCol className="max-w-sm items-start gap-8">
          <section>
            <h2 className="mb-2 text-xl font-bold">naopoyo</h2>
            <div className="text-muted-foreground">
              <P>{SITE_DESC}</P>
              <p>そのほかにUnityでのゲーム開発も少しずつ始めています。</p>
              <P>
                このサイトのソースコードを
                <Link href="https://github.com/naopoyo/naopoyo-web">GitHub</Link>
                で公開しているので、Next.jsでブログサイトを作成したい方はぜひ参考にしてみてください。
              </P>
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold">つくったもの</h2>
            <P>
              <Link href="https://hackersheet.com">Hacker Sheet</Link>
            </P>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold">SNS</h2>
            <SnsList />
          </section>
        </FlexCol>
      </FlexCol>
    </div>
  )
}
