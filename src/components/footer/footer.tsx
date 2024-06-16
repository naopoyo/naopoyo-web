import { ThemeSwitcher } from '@/components/theme-switcher'

export default function Footer() {
  return (
    <footer className="container flex flex-col items-center justify-center gap-4 pb-4 pt-20 sm:flex-row sm:pt-40">
      <div className="flex flex-auto items-center justify-center">
        <p>&copy; naopoyo</p>
      </div>

      <ThemeSwitcher />
    </footer>
  )
}
