'use client'

import { ArrowLeftRightIcon, CheckIcon, ClipboardCopyIcon, SettingsIcon } from 'lucide-react'
import { useCallback, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/shadcn-utils'

import {
  ARROW_CONTAINER_CLASS,
  CONVERTER_CARD_CLASS,
  COPY_BUTTON_CLASS,
  DEFAULT_BASE_PX,
  INPUT_FIELD_CLASS,
  INPUT_LABEL_CLASS,
  SETTINGS_SECTION_CLASS,
  USAGE_SECTION_CLASS,
} from './constants'
import { copyToClipboard as copyToClipboardFn, pxToRem, remToPx } from './utils'

import type { CopyField } from './types'

/**
 * RemPxConverter コンポーネント
 *
 * px と rem の単位を相互変換するツールです。
 * どちらかのフィールドに値を入力すると、もう一方が自動的に計算されます。
 * コピー成功のチェックマークで操作完了を視覚化します
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
          setRemValue(pxToRem(px, value))
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
        setRemValue(pxToRem(px, basePx))
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
        setPxValue(remToPx(rem, basePx))
      }
    },
    [basePx]
  )

  /**
   * クリップボードにコピーするハンドラー
   */
  const handleCopy = useCallback((value: string, unit: CopyField) => {
    if (value && unit) {
      copyToClipboardFn(value, unit)
      setCopiedField(unit)
      setTimeout(() => setCopiedField(null), 1500)
    }
  }, [])

  return (
    <div className="flex flex-col gap-10">
      {/* メインコンバーターエリア */}
      <div
        className={`
          flex flex-col items-center gap-6
          lg:flex-row lg:items-stretch lg:justify-center lg:gap-4
        `}
      >
        {/* px 入力カード */}
        <section className={CONVERTER_CARD_CLASS}>
          <div className="flex items-center justify-between">
            <label htmlFor="px-value" className={INPUT_LABEL_CLASS}>
              px
            </label>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleCopy(pxValue, 'px')}
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
                rotate-90 text-muted-foreground
                lg:rotate-0
              `}
            />
          </div>
        </div>

        {/* rem 入力カード */}
        <section className={CONVERTER_CARD_CLASS}>
          <div className="flex items-center justify-between">
            <label htmlFor="rem-value" className={INPUT_LABEL_CLASS}>
              rem
            </label>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleCopy(remValue, 'rem')}
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

      {/* 設定セクション */}
      <section className={cn(SETTINGS_SECTION_CLASS, 'mx-auto w-full max-w-xs')}>
        <header className="flex items-center gap-2 text-sm font-medium text-foreground">
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
                h-9 w-20 [appearance:textfield] bg-background text-center font-mono text-sm
                transition-colors duration-150
                focus:bg-muted/30
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
        <h2 className="text-sm font-medium text-foreground">使い方</h2>
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
