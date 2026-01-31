import { Avatar, SpeechBubble } from '@/components/site'
import { Paragraph as P } from '@/components/typography'
import { SITE_DESC } from '@/constants'

import { Link } from '@/components/link'

/**
 * Profile コンポーネント - サイトオーナーの簡易プロフィールを表示
 *
 * アバター画像と吹き出し風の自己紹介文を表示します。
 * モバイルでは縦並び、デスクトップでは横並びになります。
 *
 * @returns プロフィール情報の JSX
 */
export default function Profile() {
  return (
    <section
      className={`
        mx-auto flex max-w-lg flex-col items-center gap-6 py-10
        md:flex-row md:items-start
      `}
    >
      <div className="shrink-0">
        <Avatar size="sm" />
      </div>

      <SpeechBubble>
        <div className="text-sm text-muted-foreground">
          <h1 className="text-lg font-bold text-foreground">naopoyo</h1>
          <P>{SITE_DESC}</P>
          <P className="mt-2 mb-0">
            <Link href="/about" icon="arrow">
              プロフィールをもっと見る
            </Link>
          </P>
        </div>
      </SpeechBubble>
    </section>
  )
}
