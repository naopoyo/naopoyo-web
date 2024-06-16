import { ThemeToggle } from '@/components/theme-toggle'

export default function Footer() {
  return (
    <footer className="container flex flex-col items-center justify-center gap-4 py-4 sm:flex-row">
      <div className="flex flex-auto items-center justify-center">
        <p>&copy; naopoyo</p>
      </div>

      <ThemeToggle />
    </footer>
  )
}
