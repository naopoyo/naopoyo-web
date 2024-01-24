import { IStaticOptions } from 'tocbot'

export const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
  ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
  : 'http://localhost:3000'

export const isProduction = process.env.NODE_ENV === 'production'

export const gtmId = process.env.GOOGLE_TAG_ID!

export const siteName = 'naopoyo'

export const siteDesc =
  'Ruby、TypeScriptなどの技術記事や便利ツールの公開をおこなっている個人のウェブサイトです。'

export const tocbotHeadingOffset = 64 + 1 + 16

export const hackersheetApiEndpoint = process.env.HACKERSHEET_API_ENDPOINT!

export const hackersheetApiAccessKey = process.env.HACKERSHEET_API_ACCESS_KEY!

export const hackersheetGithubRepoUrl = process.env.HACKERSHEET_GITHUB_REPO_URL!

export const tocbotBaseOptions: IStaticOptions = {
  headingSelector: 'h2, h3, h4, h5, h6',
  scrollSmooth: false,
  headingsOffset: tocbotHeadingOffset,
}
