import { Link } from '@/components/link'
import { Avatar, SnsList, SpeechBubble } from '@/components/site'
import { Heading, Paragraph as P } from '@/components/typography'
import { SITE_DESC } from '@/constants'

/**
 * ProfileSection の Props
 */
interface ProfileSectionProps {
  /** セクションのタイトル */
  title: string
  /** セクションのコンテンツ */
  children: React.ReactNode
}

/**
 * ProfileSection コンポーネント - プロフィール内の各セクションを描画
 *
 * @param props - ProfileSectionProps
 * @returns セクション要素の JSX
 */
function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <section className="space-y-3">
      <Heading>{title}</Heading>
      {children}
    </section>
  )
}

/**
 * FullProfile コンポーネント - サイトオーナーの詳細プロフィールを表示
 *
 * アバター画像と自己紹介、制作物、SNSリンクを含む
 * フルプロフィールセクションを描画します。
 *
 * @returns プロフィール情報の JSX
 */
export default function FullProfile() {
  return (
    <div
      className={`
        flex flex-col items-center gap-6
        md:flex-row md:items-start
      `}
    >
      <div className="shrink-0">
        <Avatar size="lg" />
      </div>

      <SpeechBubble>
        <div className="flex flex-col gap-8">
          <ProfileSection title="naopoyo">
            <div className="space-y-2 text-muted-foreground">
              <P>{SITE_DESC}</P>
              <P>また、Unity でのゲーム開発も少しずつ始めています。</P>
              <P>
                <Link href="https://github.com/naopoyo/naopoyo-web" icon="external">
                  GitHub
                </Link>{' '}
                でこのサイトのソースコードを公開しているので、Next.js
                でブログサイトを作成したい方は、ぜひ参考にしてみてください。
              </P>
            </div>
          </ProfileSection>

          <ProfileSection title="つくったもの">
            <P>
              <Link href="https://hackersheet.com" icon="external">
                Hacker Sheet
              </Link>
            </P>
          </ProfileSection>

          <ProfileSection title="SNS">
            <SnsList />
          </ProfileSection>
        </div>
      </SpeechBubble>
    </div>
  )
}
