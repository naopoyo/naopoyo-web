import { Link } from '@/components/link'
import { Paragraph as P } from '@/components/paragraph'
import { Avatar } from '@/components/site'
import { SITE_DESC } from '@/constants'

export default function Profile() {
  return (
    <section className="mx-auto flex items-start justify-center gap-4 py-10">
      <div className="w-fit">
        <Avatar size="sm" />
      </div>
      <div className="max-w-sm text-sm text-muted-foreground">
        <h1 className="text-lg font-bold text-foreground">naopoyo</h1>
        <P>{SITE_DESC}</P>
        <P>
          <Link href="/about" icon="arrow">
            プロフィールをもっと見る
          </Link>
        </P>
      </div>
    </section>
  )
}
