import tocbot from 'tocbot'

export const isProduction = process.env.NODE_ENV === 'production'

export const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN
  ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
  : 'http://localhost:3000'

export const GTM_ID = process.env.GOOGLE_TAG_ID!

export const GOOGLE_ADS_CLIENT = process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT!
export const GOOGLE_ADS_SLOT_BANNER = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_BANNER!

export const SITE_NAME = 'naopoyo.com'

export const SITE_DESC =
  '個人でWEBサービスの開発をやっています。このサイトでは個人開発で学んだことを公開しています。'

export const RECENT_DOCS_COUNT = 6

export const HACKERSHEET_API_ENDPOINT = process.env.HACKERSHEET_API_ENDPOINT!

export const HACKERSHEET_API_ACCESS_KEY = process.env.HACKERSHEET_API_ACCESS_KEY!

export const HACKERSHEET_GITHUB_REPO_FULL_NAME = process.env.HACKERSHEET_GITHUB_REPO_FULL_NAME!
export const HACKERSHEET_GITHUB_REPO_URL = `https://github.com/${HACKERSHEET_GITHUB_REPO_FULL_NAME}`

export const TOCBOT_BASE_OPTIONS: tocbot.IStaticOptions = {
  headingSelector: 'h2, h3, h4, h5, h6',
  scrollSmooth: false,
  headingsOffset: 64 + 1 + 16,
  throttleTimeout: 0,
  scrollHandlerType: 'throttle',
}
