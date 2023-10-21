import './globals.scss'

import { GoogleAnalytics } from '@/components/google-analytics'
import NabBar from '@/components/nav-bar/nav-bar'

import type { Metadata } from 'next'

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
    <html lang='ja'>
      <body className='bg-app-bg text-app-text'>
        <GoogleAnalytics />
        <NabBar />
        {children}
      </body>
    </html>
  )
}
