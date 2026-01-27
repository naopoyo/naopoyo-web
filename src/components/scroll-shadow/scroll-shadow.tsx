'use client'

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/shadcn-utils'

/**
 * 影のサイズ
 */
export type ShadowSize = 'sm' | 'md' | 'lg' | 'xl'

/**
 * ScrollShadow コンポーネントの Props
 */
export type ScrollShadowProps = {
  /** 子要素 */
  children: React.ReactNode
  /** 追加の CSS クラス */
  className?: string
  /** スクロール方向 */
  orientation?: 'horizontal' | 'vertical'
  /** 影のサイズ */
  shadowSize?: ShadowSize
}

/**
 * 影サイズに対応する CSS クラス（横方向）
 * @internal
 */
const SHADOW_SIZE_HORIZONTAL: Record<ShadowSize, string> = {
  sm: 'w-4',
  md: 'w-8',
  lg: 'w-12',
  xl: 'w-16',
}

/**
 * 影サイズに対応する CSS クラス（縦方向）
 * @internal
 */
const SHADOW_SIZE_VERTICAL: Record<ShadowSize, string> = {
  sm: 'h-4',
  md: 'h-8',
  lg: 'h-12',
  xl: 'h-16',
}

/**
 * 影の基本スタイル
 * @internal
 */
const SHADOW_BASE_CLASS = 'pointer-events-none absolute z-20 transition-opacity duration-200'

/**
 * 横方向の開始側（左）の影スタイル
 * @internal
 */
const SHADOW_HORIZONTAL_START_CLASS =
  'inset-y-0 left-0 bg-linear-to-r from-background to-transparent'

/**
 * 横方向の終了側（右）の影スタイル
 * @internal
 */
const SHADOW_HORIZONTAL_END_CLASS =
  'inset-y-0 right-0 bg-linear-to-l from-background to-transparent'

/**
 * 縦方向の開始側（上）の影スタイル
 * @internal
 */
const SHADOW_VERTICAL_START_CLASS = 'inset-x-0 top-0 bg-linear-to-b from-background to-transparent'

/**
 * 縦方向の終了側（下）の影スタイル
 * @internal
 */
const SHADOW_VERTICAL_END_CLASS = 'inset-x-0 bottom-0 bg-linear-to-t from-background to-transparent'

/**
 * ScrollShadow コンポーネント
 *
 * スクロール可能な領域に影を表示し、
 * スクロールできる方向があることを視覚的に示します。
 *
 * @param props - ScrollShadowProps
 * @returns スクロール影付きコンテナの JSX
 */
const ScrollShadow = forwardRef<HTMLDivElement, ScrollShadowProps>(
  ({ children, className, orientation = 'horizontal', shadowSize = 'md' }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null)
    const [showStartShadow, setShowStartShadow] = useState(false)
    const [showEndShadow, setShowEndShadow] = useState(false)

    // 外から渡されたrefを内部refに同期
    useEffect(() => {
      if (!ref) return
      if (typeof ref === 'function') {
        ref(internalRef.current)
      } else {
        ref.current = internalRef.current
      }
    }, [ref])

    /**
     * 影の表示状態を更新
     */
    const updateShadows = useCallback(() => {
      const container = internalRef.current
      if (!container) return

      if (orientation === 'horizontal') {
        const { scrollLeft, scrollWidth, clientWidth } = container
        setShowStartShadow(scrollLeft > 0)
        setShowEndShadow(scrollLeft < scrollWidth - clientWidth - 1)
      } else {
        const { scrollTop, scrollHeight, clientHeight } = container
        setShowStartShadow(scrollTop > 0)
        setShowEndShadow(scrollTop < scrollHeight - clientHeight - 1)
      }
    }, [orientation])

    useEffect(() => {
      const container = internalRef.current
      if (!container) return

      // 初期チェック
      updateShadows()

      // スクロールイベント
      container.addEventListener('scroll', updateShadows, { passive: true })

      // リサイズ監視
      const resizeObserver = new ResizeObserver(updateShadows)
      resizeObserver.observe(container)

      // scrollLeft/scrollTop のプログラム的な変更を検知するための定期チェック
      // （scroll イベントが発火しないケースに対応）
      const intervalId = setInterval(updateShadows, 100)

      // 初期化後の遅延チェック（外部からの scrollLeft 設定を検知）
      const timeoutId = setTimeout(updateShadows, 50)

      return () => {
        container.removeEventListener('scroll', updateShadows)
        resizeObserver.disconnect()
        clearInterval(intervalId)
        clearTimeout(timeoutId)
      }
    }, [updateShadows])

    const isHorizontal = orientation === 'horizontal'
    const sizeClass = isHorizontal
      ? SHADOW_SIZE_HORIZONTAL[shadowSize]
      : SHADOW_SIZE_VERTICAL[shadowSize]

    const startShadowClass = isHorizontal
      ? SHADOW_HORIZONTAL_START_CLASS
      : SHADOW_VERTICAL_START_CLASS
    const endShadowClass = isHorizontal ? SHADOW_HORIZONTAL_END_CLASS : SHADOW_VERTICAL_END_CLASS

    return (
      <div className={cn('relative', className)}>
        {/* 開始側の影（左 or 上） */}
        <div
          className={cn(
            SHADOW_BASE_CLASS,
            startShadowClass,
            sizeClass,
            showStartShadow ? 'opacity-100' : 'opacity-0'
          )}
        />

        {/* スクロール可能なコンテンツ */}
        <div
          ref={internalRef}
          className={cn(
            isHorizontal ? 'overflow-x-auto' : 'overflow-y-auto',
            isHorizontal ? 'w-full' : 'h-full'
          )}
        >
          {children}
        </div>

        {/* 終了側の影（右 or 下） */}
        <div
          className={cn(
            SHADOW_BASE_CLASS,
            endShadowClass,
            sizeClass,
            showEndShadow ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>
    )
  }
)

ScrollShadow.displayName = 'ScrollShadow'

export default ScrollShadow
