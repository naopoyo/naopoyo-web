/**
 * ランダム絵文字生成ツールの定数
 */

/** 絵文字の最大履歴数 */
export const MAX_HISTORY_LENGTH = 200

/** メインディスプレイコンテナの CSS クラス */
export const DISPLAY_CONTAINER_CLASS = `
  group relative flex size-40 cursor-pointer items-center justify-center rounded-xl border
  border-border/30 bg-background transition-colors duration-200
  hover:bg-muted/50
  active:opacity-75
`

/** 絵文字表示の CSS クラス */
export const EMOJI_DISPLAY_CLASS = `text-8xl select-none`

/** スピンアニメーションの CSS クラス */
export const SPIN_ANIMATION_CLASS = `animate-[emoji-spin_0.4s_cubic-bezier(0.34,1.56,0.64,1)]`

/** バウンスアニメーションの CSS クラス */
export const BOUNCE_ANIMATION_CLASS = `animate-[emoji-bounce_0.3s_ease-out]`

/** 履歴アイテムの CSS クラス */
export const HISTORY_ITEM_CLASS = `
  flex size-10 cursor-pointer items-center justify-center rounded-lg border border-border/30
  bg-background text-2xl transition-colors duration-150
  hover:bg-muted/70
  active:opacity-75
`

/** 履歴セクションのヘッダーの CSS クラス */
export const HISTORY_HEADER_CLASS = `
  flex items-center gap-2 text-sm font-medium text-muted-foreground
`

/** ボタンコンテナの CSS クラス */
export const BUTTON_CONTAINER_CLASS = `flex flex-col gap-3`
