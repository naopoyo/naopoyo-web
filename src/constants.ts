import { Source_Code_Pro } from 'next/font/google'

export const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
})

export const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
  ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
  : 'http://localhost:3000'

export const isProduction = process.env.NODE_ENV === 'production'

export const gtmId = process.env.GOOGLE_TAG_ID!

export const siteName = 'naopoyo'

export const tocbotHeadingOffset = 64 + 1 + 16