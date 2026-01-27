/**
 * SpeechBubble の Props
 */
export type SpeechBubbleProps = {
  /** 吹き出し内に表示するコンテンツ */
  children: React.ReactNode
}

/**
 * SpeechBubble コンポーネント - 吹き出し風のコンテナ
 *
 * 漫画のようにキャラクターが喋っているような吹き出しを描画します。
 * モバイルでは上向き、デスクトップでは左向きのしっぽになります。
 *
 * @param props - SpeechBubbleProps
 * @returns 吹き出し要素の JSX
 */
export default function SpeechBubble({ children }: SpeechBubbleProps) {
  return (
    <div className="relative flex-1">
      {/* 吹き出しのしっぽ（モバイル：上向き） */}
      <div
        className={`
          absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full border-x-8 border-b-8
          border-x-transparent border-b-border
          md:hidden
        `}
        aria-hidden="true"
      />
      <div
        className={`
          absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[calc(100%-1px)] border-x-8
          border-b-8 border-x-transparent border-b-background
          md:hidden
        `}
        aria-hidden="true"
      />

      {/* 吹き出しのしっぽ（デスクトップ：左向き） */}
      <div
        className={`
          absolute top-8 left-0 hidden -translate-x-full border-y-8 border-r-8 border-y-transparent
          border-r-border
          md:block
        `}
        aria-hidden="true"
      />
      <div
        className={`
          absolute top-8 left-0 hidden -translate-x-[calc(100%-1px)] border-y-8 border-r-8
          border-y-transparent border-r-background
          md:block
        `}
        aria-hidden="true"
      />

      {/* 吹き出し本体 */}
      <div className="rounded-2xl border border-border bg-background p-6">{children}</div>
    </div>
  )
}
