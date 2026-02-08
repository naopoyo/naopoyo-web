import tocbot from 'tocbot'

export const SITE_NAME = 'naopoyo.com'

export const SITE_DESC =
  '個人開発をしています。このサイトには、学んだことを忘れないように記録しています。'

export const RECENT_DOCS_COUNT = 6

export const TOCBOT_BASE_OPTIONS: tocbot.IStaticOptions = {
  headingSelector: 'h2, h3, h4, h5, h6',
  scrollSmooth: false,
  headingsOffset: 64 + 1 + 16,
  throttleTimeout: 0,
  scrollHandlerType: 'throttle',
}
