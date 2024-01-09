import { GithubIcon, XIcon } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import NextLink from 'next/link'

import { Link } from '@/components/link'
import { PageHeader } from '@/components/page-header'
import { Paragraph } from '@/components/paragraph'
import { Button } from '@/components/ui/button'

const title = 'About'

export const metadata: Metadata = {
  title: title,
}

export default function AbountPage() {
  return (
    <div className="container">
      <PageHeader>{title}</PageHeader>

      <div className="flex flex-col items-center justify-center gap-8 pb-8 md:flex-row md:items-start">
        <Image
          src="/naopoyo2.png"
          width={160}
          height={160}
          alt="logo"
          className="rounded-full border object-cover"
        />

        <div className="flex max-w-sm flex-col items-start gap-8">
          <section>
            <h2 className="mb-2 text-xl font-bold">naopoyo</h2>
            <Paragraph>個人でWEBサービスの開発をやっています。</Paragraph>
            <Paragraph>
              このサイトでは個人開発で学んだことなどをまとめた記事を公開しています。
            </Paragraph>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold">つくったもの</h2>
            <Paragraph>
              <Link href="https://hackersheet.com">Hacker Sheet</Link>
            </Paragraph>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold">SNS</h2>
            <div className="flex flex-row gap-2">
              <Button variant="ghost" size="icon" asChild>
                <NextLink href="https://github.com/naopoyo">
                  <GithubIcon />
                </NextLink>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <NextLink href="https://twitter.com/naopoyo_tw">
                  <XIcon />
                </NextLink>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
