'use client'

import { ArrowLeftRightIcon, CheckIcon, ClipboardCopyIcon, SettingsIcon } from 'lucide-react'
import { useCallback, useState } from 'react'

import { FlowingGlow } from '@/components/decorations/effects'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/shadcn-utils'


/**
 * デフォルトのベースピクセル値
 * @internal
 */
const DEFAULT_BASE_PX = 16

/**
 * コピー対象のフィールド型
 * @internal
 */
type CopyField = 'px' | 'rem' | null

/**
 * コンバーターカードの CSS クラス
 * @internal
 */
const CONVERTER_CARD_CLASS = `
  group relative flex flex-col gap-3 rounded-2xl border border-border/50 bg-card/80 p-5 shadow-lg
  backdrop-blur-sm transition-all duration-300
  hover:border-foreground/15 hover:shadow-xl hover:shadow-foreground/5
`

/**
 * 入力フィールドラベルの CSS クラス
 * @internal
 */
const INPUT_LABEL_CLASS = `
  flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase
`

/**
 * 入力フィールドの CSS クラス
 * @internal
 */
const INPUT_FIELD_CLASS = `
  h-20! [appearance:textfield] border-border/50 bg-background/50 text-center font-mono text-4xl!
  font-bold! tracking-tighter transition-all duration-200
  focus:border-foreground/30 focus:bg-background/80 focus:shadow-md
  lg:h-24! lg:text-5xl!
  [&::-webkit-inner-spin-button]:appearance-none
  [&::-webkit-outer-spin-button]:appearance-none
`

/**
 * コピーボタンの CSS クラス
 * @internal
 */
const COPY_BUTTON_CLASS = `
  size-9 border-border/50 bg-background/50 transition-all duration-200
  hover:border-foreground/20 hover:bg-background/80 hover:shadow-md
`

/**
 * 矢印アイコンコンテナの CSS クラス
 * @internal
 */
const ARROW_CONTAINER_CLASS = `
  flex items-center justify-center rounded-full border border-border/30 bg-card/60 p-2 shadow-sm
  backdrop-blur-sm
`

/**
 * 設定セクションの CSS クラス
 * @internal
 */
const SETTINGS_SECTION_CLASS = `
  flex flex-col gap-3 rounded-xl border border-border/30 bg-card/40 p-4 backdrop-blur-sm
`

/**
 * 使い方セクションの CSS クラス
 * @internal
 */
const USAGE_SECTION_CLASS = `
  mx-auto flex max-w-md flex-col gap-3 rounded-xl border border-border/30 bg-card/40 p-5
  backdrop-blur-sm
`

/**
 * RemPxConverter コンポーネント
 *
 * px と rem の単位を相互変換するツールです。
 * どちらかのフィールドに値を入力すると、もう一方が自動的に計算されます。
 * FlowingGlow エフェクトとスムーズなアニメーションで視覚的なフィードバックを提供します。
 */
export default function RemPxConverter() {
  const [basePx, setBasePx] = useState(DEFAULT_BASE_PX)
  const [pxValue, setPxValue] = useState('16')
  const [remValue, setRemValue] = useState('1')
  const [copiedField, setCopiedField] = useState<CopyField>(null)

  /**
   * ベースピクセル値変更時のハンドラー
   */
  const handleBasePxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value)
      if (isNaN(value) || value <= 0) {
        setBasePx(DEFAULT_BASE_PX)
        return
      }
      setBasePx(value)

      if (pxValue !== '') {
        const px = parseFloat(pxValue)
        if (!isNaN(px)) {
          setRemValue((px / value).toString())
        }
      }
    },
    [pxValue]
  )

  /**
   * px 値変更時のハンドラー
   */
  const handlePxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setPxValue(value)

      if (value === '') {
        setRemValue('')
        return
      }

      const px = parseFloat(value)
      if (!isNaN(px)) {
        setRemValue((px / basePx).toString())
      }
    },
    [basePx]
  )

  /**
   * rem 値変更時のハンドラー
   */
  const handleRemChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setRemValue(value)

      if (value === '') {
        setPxValue('')
        return
      }

      const rem = parseFloat(value)
      if (!isNaN(rem)) {
        setPxValue((rem * basePx).toString())
      }
    },
    [basePx]
  )

  /**
   * クリップボードにコピーするハンドラー
   */
  const copyToClipboard = useCallback((value: string, unit: CopyField) => {
    if (value && unit && navigator.clipboard) {
      navigator.clipboard.writeText(`${value}${unit}`)
      setCopiedField(unit)
      setTimeout(() => setCopiedField(null), 1500)
    }
  }, [])

  return (
    <div className="flex flex-col gap-10">
      {/* メインコンバーターエリア */}
      <FlowingGlow className="relative">
        <div
          className={`
            flex flex-col items-center gap-6
            lg:flex-row lg:items-stretch lg:justify-center lg:gap-4
          `}
        >
          {/* px 入力カード */}
          <section className={CONVERTER_CARD_CLASS}>
            {/* グローエフェクト */}
            <div
              className={`
                pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-foreground/5
                via-transparent to-foreground/5 opacity-0 transition-opacity duration-300
                group-hover:opacity-100
              `}
              aria-hidden="true"
            />

            <div className="flex items-center justify-between">
              <label htmlFor="px-value" className={INPUT_LABEL_CLASS}>
                px
              </label>
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(pxValue, 'px')}
                disabled={!pxValue}
                className={COPY_BUTTON_CLASS}
              >
                {copiedField === 'px' ? (
                  <CheckIcon size={14} className="text-green-500" />
                ) : (
                  <ClipboardCopyIcon size={14} />
                )}
              </Button>
            </div>

            <Input
              id="px-value"
              type="number"
              value={pxValue}
              onChange={handlePxChange}
              placeholder="16"
              className={cn(
                INPUT_FIELD_CLASS,
                `
                  w-full
                  lg:w-64
                `
              )}
            />
          </section>

          {/* 矢印インジケーター */}
          <div
            className="
              flex items-center justify-center py-2
              lg:py-0
            "
          >
            <div className={ARROW_CONTAINER_CLASS}>
              <ArrowLeftRightIcon
                size={20}
                className={`
                  rotate-90 text-muted-foreground transition-transform duration-300
                  lg:rotate-0
                `}
              />
            </div>
          </div>

          {/* rem 入力カード */}
          <section className={CONVERTER_CARD_CLASS}>
            {/* グローエフェクト */}
            <div
              className={`
                pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-foreground/5
                via-transparent to-foreground/5 opacity-0 transition-opacity duration-300
                group-hover:opacity-100
              `}
              aria-hidden="true"
            />

            <div className="flex items-center justify-between">
              <label htmlFor="rem-value" className={INPUT_LABEL_CLASS}>
                rem
              </label>
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(remValue, 'rem')}
                disabled={!remValue}
                className={COPY_BUTTON_CLASS}
              >
                {copiedField === 'rem' ? (
                  <CheckIcon size={14} className="text-green-500" />
                ) : (
                  <ClipboardCopyIcon size={14} />
                )}
              </Button>
            </div>

            <Input
              id="rem-value"
              type="number"
              value={remValue}
              onChange={handleRemChange}
              placeholder="1"
              className={cn(
                INPUT_FIELD_CLASS,
                `
                  w-full
                  lg:w-64
                `
              )}
            />
          </section>
        </div>
      </FlowingGlow>

      {/* 設定セクション */}
      <section className={cn(SETTINGS_SECTION_CLASS, 'mx-auto w-full max-w-xs')}>
        <header className="flex items-center gap-2 text-sm font-medium text-foreground/80">
          <SettingsIcon size={14} className="text-muted-foreground" />
          設定
        </header>

        <div className="flex items-center gap-3">
          <label htmlFor="base-px" className="text-sm whitespace-nowrap text-muted-foreground">
            ベースサイズ
          </label>
          <div className="flex items-center gap-2">
            <Input
              id="base-px"
              type="number"
              value={basePx}
              onChange={handleBasePxChange}
              min={1}
              className={`
                h-9 w-20 [appearance:textfield] bg-background/50 text-center font-mono text-sm
                [&::-webkit-inner-spin-button]:appearance-none
                [&::-webkit-outer-spin-button]:appearance-none
              `}
            />
            <span className="text-sm text-muted-foreground/60">px</span>
          </div>
        </div>
      </section>

      {/* 使い方セクション */}
      <section className={USAGE_SECTION_CLASS}>
        <h2 className="flex items-center gap-2 text-sm font-medium text-foreground/80">
          <ArrowLeftRightIcon size={14} className="text-muted-foreground" />
          使い方
        </h2>
        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50">•</span>
            <span>px または rem の値を入力すると、もう一方が自動的に計算されます</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50">•</span>
            <span>Copy ボタンで単位付きの値をクリップボードにコピーできます</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50">•</span>
            <span>ベースサイズを変更することで、異なる基準での変換が可能です</span>
          </li>
        </ul>
      </section>
    </div>
  )
}
