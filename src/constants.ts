export const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
  ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
  : 'http://localhost:3000'

export const isProduction = process.env.NODE_ENV === 'production'

export const gtmId = process.env.GOOGLE_TAG_ID!

export const siteName = 'naopoyo'

export const tocbotHeadingOffset = 64 + 1 + 16

export const hackersheetApiEndpoint = process.env.HACKERSHEET_API_ENDPOINT!

export const hackersheetApiAccessKey = process.env.HACKERSHEET_API_ACCESS_KEY!
