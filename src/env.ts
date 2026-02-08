export const isProduction = process.env.NODE_ENV === 'production'

export const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN
  ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
  : 'http://localhost:3000'

export const GTM_ID = process.env.GOOGLE_TAG_ID!

export const GOOGLE_ADS_CLIENT = process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT!
export const GOOGLE_ADS_SLOT_BANNER = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_BANNER!

export const HACKERSHEET_API_ENDPOINT = process.env.HACKERSHEET_API_ENDPOINT!

export const HACKERSHEET_API_ACCESS_KEY = process.env.HACKERSHEET_API_ACCESS_KEY!

export const HACKERSHEET_GITHUB_REPO_FULL_NAME = process.env.HACKERSHEET_GITHUB_REPO_FULL_NAME!
export const HACKERSHEET_GITHUB_REPO_URL = `https://github.com/${HACKERSHEET_GITHUB_REPO_FULL_NAME}`
