'use client'

import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { PropsWithChildren } from 'react'

/**
 * Providers コンポーネントの Props
 */
export type ProviderProps = PropsWithChildren

/**
 * アプリケーション全体のプロバイダーコンポーネント
 *
 * ThemeProvider と NuqsAdapter を含みます。
 */
export default function Providers({ children }: ProviderProps) {
  return (
    <NuqsAdapter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </NuqsAdapter>
  )
}
