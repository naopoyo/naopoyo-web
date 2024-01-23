import '@/styles/globals.scss'

import { GoogleTagManager } from '@next/third-parties/google'

import { Footer } from '@/components/footer'
import { NavBar } from '@/components/nav-bar'
import { baseUrl, gtmId, isProduction, siteName } from '@/constants'
import { GoogleFontLinks, sourceCodePro } from '@/fonts'
import { Providers } from '@/providers'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: siteName,
  robots: {
    follow: true,
    index: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={sourceCodePro.variable} suppressHydrationWarning>
      <head>
        <GoogleFontLinks />
      </head>
      <body className="flex min-h-screen flex-col font-body">
        <Providers>
          <NavBar />
          <div className="flex-auto">{children}</div>
          <Footer />
        </Providers>
      </body>
      {isProduction && <GoogleTagManager gtmId={gtmId} />}
    </html>
  )
}
