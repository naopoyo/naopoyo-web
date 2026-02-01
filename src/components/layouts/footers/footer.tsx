import { SnsList } from '@/components/brands/profiles'
import { ThemeSwitcher } from '@/components/misc/theme-switcher'

/**
 * Footer コンポーネント - サイト下部のフッターを表示します。
 *
 * フッターには SNS リンクとテーマ切替、著作表示を含みます。
 *
 * @returns フッターの JSX
 */
export default function Footer() {
  return (
    <footer
      className={`
        container mx-auto flex flex-col-reverse items-center justify-center gap-8 pt-20 pb-4
        sm:flex-row sm:items-end sm:pt-40
      `}
    >
      <div
        className={`
          flex flex-auto flex-col items-center justify-center gap-2
          sm:items-start
        `}
      >
        <SnsList />
        <p className="align-middle text-xs text-muted-foreground">© naopoyo</p>
      </div>

      <ThemeSwitcher />
    </footer>
  )
}
