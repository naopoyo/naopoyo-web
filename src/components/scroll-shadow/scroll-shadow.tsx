'use client'

import { forwardRef, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/shadcn-utils'

/**
 * ScrollShadow コンポーネントの Props
 */
export type ScrollShadowProps = {
  children: React.ReactNode
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

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
  ({ children, className, orientation = 'horizontal' }, ref) => {
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

    useEffect(() => {
      const container = internalRef.current
      if (!container) return

      const updateShadows = () => {
        if (orientation === 'horizontal') {
          const { scrollLeft, scrollWidth, clientWidth } = container
          setShowStartShadow(scrollLeft > 0)
          setShowEndShadow(scrollLeft < scrollWidth - clientWidth - 1)
        } else {
          const { scrollTop, scrollHeight, clientHeight } = container
          setShowStartShadow(scrollTop > 0)
          setShowEndShadow(scrollTop < scrollHeight - clientHeight - 1)
        }
      }

      // 初期チェック
      updateShadows()

      // スクロールイベント
      container.addEventListener('scroll', updateShadows, { passive: true })

      // リサイズ監視
      const resizeObserver = new ResizeObserver(updateShadows)
      resizeObserver.observe(container)

      return () => {
        container.removeEventListener('scroll', updateShadows)
        resizeObserver.disconnect()
      }
    }, [orientation])

    const isHorizontal = orientation === 'horizontal'

    return (
      <div className={cn('relative', className)}>
        {/* 開始側の影（左 or 上） */}
        <div
          className={cn(
            'pointer-events-none absolute z-10 transition-opacity duration-200',
            isHorizontal
              ? 'inset-y-0 left-0 w-8 bg-linear-to-r from-background to-transparent'
              : 'inset-x-0 top-0 h-8 bg-linear-to-b from-background to-transparent',
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
            'pointer-events-none absolute z-10 transition-opacity duration-200',
            isHorizontal
              ? 'inset-y-0 right-0 w-8 bg-linear-to-l from-background to-transparent'
              : 'inset-x-0 bottom-0 h-8 bg-linear-to-t from-background to-transparent',
            showEndShadow ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>
    )
  }
)

ScrollShadow.displayName = 'ScrollShadow'

export default ScrollShadow
