'use client'

import { ThemeProvider } from 'next-themes'
import { PropsWithChildren } from 'react'

export interface ProviderProps extends PropsWithChildren {}

export default function Providers({ children }: ProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}
