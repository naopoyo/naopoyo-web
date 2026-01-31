import { type PropsWithChildren } from 'react'

/**
 * FlowingGlow コンポーネントの Props
 */
export interface FlowingGlowProps extends PropsWithChildren {
  /** 追加のCSSクラス */
  className?: string
}

/**
 * FlowingGlow コンポーネント - 風のように流れる光のエフェクトを提供します
 *
 * 子要素の背後に複数のぼかしレイヤーを配置し、
 * 風のように流れるアニメーションで視覚効果を演出します。
 * 最初は控えめに始まり、徐々に盛り上がるエレガントな表現です。
 *
 * @param props - FlowingGlowProps
 * @returns 流れる光のエフェクトを持つ JSX 要素
 *
 * @example
 * ```tsx
 * <FlowingGlow className="relative">
 *   <span className="text-7xl">📝</span>
 *   <h1>タイトル</h1>
 * </FlowingGlow>
 * ```
 */
export default function FlowingGlow({ children, className }: FlowingGlowProps) {
  return (
    <div className={className}>
      {/* Elegant wind-like flowing layers */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Soft ambient base */}
        <div
          className={`
            absolute -top-8 -left-8 h-48 w-[110%] animate-[wind_12s_ease-in-out_infinite]
            rounded-full bg-primary/8 blur-[100px]
          `}
        />
        {/* Primary wind stream */}
        <div
          className={`
            absolute -top-4 left-0 h-20 w-72 -skew-x-12 animate-[wind_10s_ease-in-out_infinite]
            rounded-full bg-violet-400/12 blur-[60px]
            dark:bg-violet-400/8
          `}
        />
        {/* Secondary flowing stream */}
        <div
          className={`
            absolute top-16 -left-8 h-16 w-96 skew-x-[-8deg]
            animate-[wind_8s_ease-in-out_infinite_1s] rounded-full bg-sky-400/10 blur-[50px]
            dark:bg-sky-400/6
          `}
        />
        {/* Gentle trailing wisp */}
        <div
          className={`
            absolute top-28 left-4 h-12 w-80 skew-x-[-15deg]
            animate-[wind_14s_ease-in-out_infinite_2s] rounded-full bg-primary/6 blur-2xl
          `}
        />
      </div>
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  )
}
