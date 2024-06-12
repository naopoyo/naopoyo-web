import { GithubIcon, XIcon } from 'lucide-react'
import { Metadata } from 'next'
import NextLink from 'next/link'

import { Avater } from '@/components/avatar'
import { FlexCol, FlexRow } from '@/components/layout'
import { Link } from '@/components/link'
import { PageHeader } from '@/components/page-header'
import { Paragraph as P } from '@/components/paragraph'
import { Button } from '@/components/ui/button'
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
            <FlexRow className="gap-2">
              <Button variant="ghost" size="icon" asChild>
                <NextLink href="https://github.com/naopoyo" aria-label="GitHubのLink">
                  <GithubIcon />
                </NextLink>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <NextLink href="https://twitter.com/naopoyo_tw" aria-label="XのLink">
                  <XIcon />
                </NextLink>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <NextLink href="https://sizu.me/naopoyo" aria-label="しずかなインターネットのLink">
                  <svg className="size-[24px] fill-foreground">
                    <use xlinkHref="/sizu-me-logo.svg#a"></use>
                  </svg>
                </NextLink>
              </Button>
            </FlexRow>
          </section>
        </FlexCol>
      </FlexCol>
    </div>
  )
}
