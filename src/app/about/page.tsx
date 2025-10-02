import { Metadata } from 'next'

import { Avater } from '@/components/avatar'
import { FlexCol } from '@/components/layout'
import { Link } from '@/components/link'
import { PageHeader } from '@/components/page-header'
import { Paragraph as P } from '@/components/paragraph'
import { SnsList } from '@/components/sns-list'
import { SITE_DESC } from '@/constants'

const title = 'About'
const description = 'naopoyo.comについて説明しているページです。'

export const metadata: Metadata = {
  title: title,
  description: description,
}

export default function AbountPage() {
  return (
    <div className="container">
      <div className="my-16 flex flex-col items-center gap-4">
        <PageHeader>{title}</PageHeader>

        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <FlexCol className={`
        items-center justify-center gap-8 pb-8
        md:flex-row md:items-start
      `}>
        <div className="w-fit">
          <Avater size="lg" />
        </div>
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
