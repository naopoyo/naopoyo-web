import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
    className,
  }: {
    children?: React.ReactNode
    href?: string
    className?: string
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))
