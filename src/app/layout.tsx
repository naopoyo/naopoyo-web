import './globals.scss'

import { Source_Code_Pro } from 'next/font/google'

import { GoogleAnalytics } from '@/components/google-analytics'
import { NavBar } from '@/components/nav-bar'

import type { Metadata } from 'next'

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
})

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
  ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
  : 'http://localhost:3000'

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
    <html lang="ja" className={sourceCodePro.variable}>
      <body className="font-body">
        <GoogleAnalytics />
        <NavBar />
        {children}
      </body>
    </html>
  )
}
