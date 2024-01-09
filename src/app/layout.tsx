import './globals.scss'

import { GoogleTagManager } from '@next/third-parties/google'
import { Source_Code_Pro } from 'next/font/google'

import { NavBar } from '@/components/nav-bar'
import { ThemeProvider } from '@/providers'

import type { Metadata } from 'next'

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
})

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
  ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
  : 'http://localhost:3000'

const isProduction = process.env.NODE_ENV === 'production'

const gtmId = process.env.GOOGLE_TAG_ID!

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'naopoyo',
  robots: {
    follow: true,
    index: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={sourceCodePro.variable} suppressHydrationWarning>
      <body className="font-body">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
      {isProduction && <GoogleTagManager gtmId={gtmId} />}
    </html>
  )
}
