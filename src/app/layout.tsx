import '@/styles/globals.scss'

import { GoogleTagManager } from '@next/third-parties/google'

import { Footer } from '@/components/footer'
import { NavBar } from '@/components/nav-bar'
import { baseUrl, gtmId, isProduction, siteName, sourceCodePro } from '@/constants'
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
      <body className="font-body">
        <Providers>
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
      {isProduction && <GoogleTagManager gtmId={gtmId} />}
    </html>
  )
}
