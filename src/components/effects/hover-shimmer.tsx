'use client'

import { type PropsWithChildren, useState } from 'react'

/**
 * HoverShimmer コンポーネントの Props
 */
export type HoverShimmerProps = PropsWithChildren<{
  /** 追加のCSSクラス */
  className?: string
}>

/**
 * HoverShimmer コンポーネント - ホバー時にキラッと光が走るエフェクトを提供します
 *
 * 子要素の上にシマー（光の帯）レイヤーを配置し、
 * ホバー時に左から右へ光が走るアニメーションを実行します。
 *
 * @param props - HoverShimmerProps
 * @returns シマーエフェクトを持つ JSX 要素
 *
 * @example
 * ```tsx
 * <HoverShimmer className="rounded-xl">
 *   <div className="p-4">コンテンツ</div>
 * </HoverShimmer>
 * ```
 */
export default function HoverShimmer({ children, className }: HoverShimmerProps) {
  const [isShimmering, setIsShimmering] = useState(false)

  return (
    <div
      className={`
        relative overflow-hidden
        ${className ?? ''}
      `}
      onMouseEnter={() => setIsShimmering(true)}
    >
      {/* シマーエフェクト */}
      {isShimmering && (
        <div
          className="
            pointer-events-none absolute inset-0 animate-[shimmer_0.6s_ease-in-out_forwards]
          "
          aria-hidden="true"
          onAnimationEnd={() => setIsShimmering(false)}
        >
          <div className="
            h-full w-1/2 bg-linear-to-r from-transparent via-white/60 to-transparent
            dark:via-white/30
          " />
        </div>
      )}
      {children}
    </div>
  )
}
