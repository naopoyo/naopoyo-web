import '@/styles/globals.css'

import { GoogleAnalytics } from '@next/third-parties/google'

import { Footer } from '@/components/layouts/footers'
import { NavBar } from '@/components/layouts/nav-bar'
import { GoogleAdsScript } from '@/components/misc/google-ads'
import { BASE_URL, GTM_ID, isProduction } from '@/constants'
import { inter, sourceCodePro } from '@/fonts'
import { cn } from '@/lib/shadcn-utils'
import { Providers } from '@/providers'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  robots: {
    follow: true,
    index: true,
  },
  formatDetection: { telephone: false, address: false, email: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={cn(sourceCodePro.variable, inter.variable)} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-body">
        <Providers>
          <NavBar />
          <div className="flex-auto">{children}</div>
          <Footer />
        </Providers>
      </body>
      {isProduction && <GoogleAnalytics gaId={GTM_ID} />}
      <GoogleAdsScript />
    </html>
  )
}
