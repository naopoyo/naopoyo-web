import { IStaticOptions } from 'tocbot'

export const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
  ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
  : 'http://localhost:3000'

export const isProduction = process.env.NODE_ENV === 'production'

export const gtmId = process.env.GOOGLE_TAG_ID!

export const siteName = 'naopoyo.com'

export const siteDesc =
  '個人でWEBサービスの開発をやっています。このサイトでは個人開発で学んだことを公開しています。'

export const pickupDocumentSlugs = [
  'creating-a-headless-cms-for-developers',
  'embed-kifu-player-in-markdown',
  'shogi-log-2024-01',
]

export const pickupDocsCount = 3
export const recentDocsCount = 6

export const tocbotHeadingOffset = 64 + 1 + 16

export const hackersheetApiEndpoint = process.env.HACKERSHEET_API_ENDPOINT!

export const hackersheetApiAccessKey = process.env.HACKERSHEET_API_ACCESS_KEY!

export const hackersheetGithubRepoFullName = process.env.HACKERSHEET_GITHUB_REPO_FULL_NAME!

export const hackersheetGithubRepoUrl = `https://github.com/${hackersheetGithubRepoFullName}`

export const tocbotBaseOptions: IStaticOptions = {
  headingSelector: 'h2, h3, h4, h5, h6',
  scrollSmooth: false,
  headingsOffset: tocbotHeadingOffset,
}
