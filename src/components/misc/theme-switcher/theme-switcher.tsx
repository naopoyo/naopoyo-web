'use client'

import { ComputerIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

import { useClientOnly } from '@/hooks'
import { cn } from '@/lib/shadcn-utils'

/**
 * テーマの選択肢
 * @internal
 */
const THEME_OPTIONS = [
  { value: 'dark', icon: MoonIcon, label: 'ダークモード' },
  { value: 'system', icon: ComputerIcon, label: 'システム設定' },
  { value: 'light', icon: SunIcon, label: 'ライトモード' },
] as const

/**
 * インジケーターのスタイル型
 * @internal
 */
type IndicatorStyle = {
  left: number
  width: number
  opacity: number
}

/**
 * コンテナの CSS クラス
 * @internal
 */
const CONTAINER_CLASS = `
  relative flex items-center gap-0.5 rounded-full border border-border/50 bg-card/80 p-1 shadow-sm
  backdrop-blur-sm
`

/**
 * スライディングインジケーターの CSS クラス
 * @internal
 */
const INDICATOR_CLASS = `
  pointer-events-none absolute top-1 h-8 rounded-full bg-foreground shadow-lg transition-all
  duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
`

/**
 * ボタンの基本 CSS クラス
 * @internal
 */
const BUTTON_BASE_CLASS = `
  relative z-10 flex size-8 cursor-pointer items-center justify-center rounded-full text-sm
  transition-colors duration-200 ease-out
  focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none
`

/**
 * 非アクティブなボタンの CSS クラス
 * @internal
 */
const BUTTON_INACTIVE_CLASS = `
  text-muted-foreground/60
  hover:text-foreground
`

/**
 * インジケーター上のボタンの CSS クラス
 * @internal
 */
const BUTTON_ON_INDICATOR_CLASS = `text-background`

/**
 * インジケーターの状態型（ホバー中のテーマを含む）
 * @internal
 */
type IndicatorState = IndicatorStyle & {
  hoveredTheme: string | null
}

/**
 * ThemeSwitcher コンポーネント
 *
 * ユーザーがテーマ（dark/system/light）を切り替えられる UI を提供します。
 * スライディングインジケーターが選択中のテーマをスムーズにハイライトします。
 * クライアントコンポーネントで、マウント確認後に現在のテーマ値を表示します。
 */
export default function ThemeSwitcher() {
  const { mounted } = useClientOnly()
  const { theme, setTheme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  const [indicatorState, setIndicatorState] = useState<IndicatorState>({
    left: 0,
    width: 0,
    opacity: 0,
    hoveredTheme: null,
  })

  // 派生状態: ホバー中はホバー先、それ以外はアクティブなテーマ
  const indicatorOnTheme = indicatorState.hoveredTheme ?? theme

  /**
   * 指定した要素の位置にインジケーターを移動
   */
  const updateIndicatorPosition = useCallback(
    (element: HTMLElement, hoveredTheme: string | null) => {
      setIndicatorState({
        left: element.offsetLeft,
        width: element.offsetWidth,
        opacity: 1,
        hoveredTheme,
      })
    },
    []
  )

  /**
   * アクティブなテーマの位置にインジケーターを設定
   */
  const resetToActiveTheme = useCallback(() => {
    if (!theme) return
    const activeItem = itemRefs.current.get(theme)
    if (activeItem) {
      updateIndicatorPosition(activeItem, null)
    }
  }, [theme, updateIndicatorPosition])

  /**
   * ホバー時のハンドラー（data属性からテーマ値を取得）
   */
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const themeValue = e.currentTarget.dataset.theme
      if (themeValue) {
        updateIndicatorPosition(e.currentTarget, themeValue)
      }
    },
    [updateIndicatorPosition]
  )

  /**
   * ホバー解除時のハンドラー
   */
  const handleMouseLeave = useCallback(() => {
    resetToActiveTheme()
  }, [resetToActiveTheme])

  /**
   * テーマ変更時のハンドラー（data属性からテーマ値を取得）
   */
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const themeValue = e.currentTarget.dataset.theme
      if (themeValue) {
        setTheme(themeValue)
      }
    },
    [setTheme]
  )

  // マウント時とテーマ変更時にインジケーター位置を更新
  useLayoutEffect(() => {
    if (mounted) {
      resetToActiveTheme()
    }
  }, [mounted, resetToActiveTheme])

  if (!mounted || theme === undefined) {
    return null
  }

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label="テーマ切り替え"
      className={CONTAINER_CLASS}
      onMouseLeave={handleMouseLeave}
    >
      {/* スライディングインジケーター */}
      <div
        aria-hidden="true"
        className={INDICATOR_CLASS}
        style={{
          left: indicatorState.left,
          width: indicatorState.width,
          opacity: indicatorState.opacity,
        }}
      />

      {THEME_OPTIONS.map((option) => {
        const isActive = option.value === theme
        const hasIndicator = option.value === indicatorOnTheme
        const Icon = option.icon

        return (
          <button
            key={option.value}
            ref={(el) => {
              if (el) {
                itemRefs.current.set(option.value, el)
              } else {
                itemRefs.current.delete(option.value)
              }
            }}
            type="button"
            role="radio"
            data-theme={option.value}
            aria-checked={isActive}
            aria-label={option.label}
            className={cn(
              BUTTON_BASE_CLASS,
              hasIndicator ? BUTTON_ON_INDICATOR_CLASS : BUTTON_INACTIVE_CLASS
            )}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
          >
            <Icon size={16} strokeWidth={2} />
          </button>
        )
      })}
    </div>
  )
}
