import { SnsList } from '@/components/sns-list'
import { ThemeSwitcher } from '@/components/theme-switcher'

export default function Footer() {
  return (
    <footer
      className={`
        container flex flex-col-reverse items-center justify-center gap-8 pt-20
        pb-4
        sm:flex-row sm:items-end sm:pt-40
      `}
    >
      <div
        className={`
          flex flex-auto flex-col items-center justify-center gap-8
          sm:items-start
        `}
      >
        <SnsList />
        <p className="align-middle">© naopoyo</p>
      </div>

      <ThemeSwitcher />
    </footer>
  )
}
