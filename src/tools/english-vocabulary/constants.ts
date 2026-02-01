/**
 * 英単語クイズの定数
 */

/** 利用可能な問題集ファイル名 */
export const QUESTION_SET_FILES = [
  'set-001.yaml',
  'set-002.yaml',
  'set-003.yaml',
  'set-004.yaml',
  'set-005.yaml',
  'set-006.yaml',
  'set-007.yaml',
  'set-008.yaml',
  'set-009.yaml',
  'set-010.yaml',
] as const

/** クイズカードの CSS クラス */
export const CARD_CLASS = `
  min-h-145 rounded-xl border border-border/30 bg-background p-8 transition-colors duration-200
  hover:bg-muted/20
`

/** 選択肢ボタンの CSS クラス */
export const CHOICE_BUTTON_CLASS = `
  w-full cursor-pointer rounded-lg border border-border/30 bg-background px-6 py-4 text-left text-lg
  font-medium transition-colors duration-150
  hover:bg-muted/50
  focus:ring-2 focus:ring-primary/50 focus:outline-none
  disabled:cursor-not-allowed disabled:opacity-50
`
