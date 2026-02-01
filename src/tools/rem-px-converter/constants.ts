/**
 * px/rem コンバーターツールの定数
 */

/** デフォルトのベースピクセル値 */
export const DEFAULT_BASE_PX = 16

/** コンバーターカードの CSS クラス */
export const CONVERTER_CARD_CLASS = `
  flex flex-col gap-3 rounded-xl border border-border/30 bg-background p-5 transition-colors
  duration-200
  hover:bg-muted/40
`

/** 入力フィールドラベルの CSS クラス */
export const INPUT_LABEL_CLASS = `
  flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase
`

/** 入力フィールドの CSS クラス */
export const INPUT_FIELD_CLASS = `
  h-20! [appearance:textfield] border-border/30 bg-background text-center font-mono text-4xl!
  font-bold! tracking-tighter transition-colors duration-150
  focus:border-foreground/30 focus:bg-muted/30
  lg:h-24! lg:text-5xl!
  [&::-webkit-inner-spin-button]:appearance-none
  [&::-webkit-outer-spin-button]:appearance-none
`

/** コピーボタンの CSS クラス */
export const COPY_BUTTON_CLASS = `
  size-9 border-border/30 bg-background transition-colors duration-150
  hover:bg-muted/50
`

/** 矢印アイコンコンテナの CSS クラス */
export const ARROW_CONTAINER_CLASS = `
  flex items-center justify-center rounded-lg border border-border/30 bg-muted/30 p-2
`

/** 設定セクションの CSS クラス */
export const SETTINGS_SECTION_CLASS = `
  flex flex-col gap-3 rounded-xl border border-border/30 bg-muted/20 p-4
`

/** 使い方セクションの CSS クラス */
export const USAGE_SECTION_CLASS = `
  mx-auto flex max-w-md flex-col gap-3 rounded-xl border border-border/30 bg-muted/30 p-5
`
