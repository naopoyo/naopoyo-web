import { Link } from '@/components/link'
import { Avatar, SnsList } from '@/components/site'
import { Heading, Paragraph as P } from '@/components/typography'
import { SITE_DESC } from '@/constants'

export default function FullProfile() {
  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-8 pb-8
        md:flex-row md:items-start
      `}
    >
      <div className="w-fit">
        <Avatar size="lg" />
      </div>
      <div className="flex max-w-sm flex-col items-start gap-8">
        <section>
          <Heading>naopoyo</Heading>
          <div className="text-muted-foreground">
            <P>{SITE_DESC}</P>
            <P>そのほかにUnityでのゲーム開発も少しずつ始めています。</P>
            <P>
              このサイトのソースコードを
              <Link href="https://github.com/naopoyo/naopoyo-web" icon="external">
                GitHub
              </Link>
              で公開しているので、Next.jsでブログサイトを作成したい方はぜひ参考にしてみてください。
            </P>
          </div>
        </section>

        <section>
          <Heading>つくったもの</Heading>
          <P>
            <Link href="https://hackersheet.com" icon="external">
              Hacker Sheet
            </Link>
          </P>
        </section>

        <section className="space-y-4">
          <Heading>SNS</Heading>
          <SnsList />
        </section>
      </div>
    </div>
  )
}
