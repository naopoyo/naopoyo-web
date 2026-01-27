'use client'

import { ClipboardCopyIcon, ClipboardListIcon, HistoryIcon, SparklesIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { FlowingGlow } from '@/components/effects'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/shadcn-utils'

import useMakeRandomEmoji from './use-make-random-emoji'

/**
 * 絵文字の最大履歴数
 * @internal
 */
const MAX_HISTORY_LENGTH = 200

/**
 * アニメーション状態を表す型
 * @internal
 */
type AnimationState = 'idle' | 'spinning' | 'bouncing'

/**
 * コピー成功時のフィードバック状態を表す型
 * @internal
 */
type CopyFeedback = {
  show: boolean
  emoji: string
}

/**
 * メインディスプレイコンテナの CSS クラス
 * @internal
 */
const DISPLAY_CONTAINER_CLASS = `
  group relative flex size-40 cursor-pointer items-center justify-center overflow-hidden rounded-2xl
  border border-border/50 bg-card/80 shadow-lg backdrop-blur-sm transition-all duration-300
  hover:border-foreground/20 hover:shadow-xl hover:shadow-foreground/5
  active:scale-95
`

/**
 * 絵文字表示の CSS クラス
 * @internal
 */
const EMOJI_DISPLAY_CLASS = `text-8xl transition-transform duration-500 select-none`

/**
 * スピンアニメーションの CSS クラス
 * @internal
 */
const SPIN_ANIMATION_CLASS = `animate-[emoji-spin_0.4s_cubic-bezier(0.34,1.56,0.64,1)]`

/**
 * バウンスアニメーションの CSS クラス
 * @internal
 */
const BOUNCE_ANIMATION_CLASS = `animate-[emoji-bounce_0.3s_ease-out]`

/**
 * 履歴アイテムの CSS クラス
 * @internal
 */
const HISTORY_ITEM_CLASS = `
  flex size-10 cursor-pointer items-center justify-center rounded-lg border border-transparent
  bg-card/60 text-2xl backdrop-blur-sm transition-all duration-200
  hover:scale-110 hover:border-foreground/15 hover:bg-card hover:shadow-md
  active:scale-95
`

/**
 * 履歴セクションのヘッダーの CSS クラス
 * @internal
 */
const HISTORY_HEADER_CLASS = `flex items-center gap-2 text-sm font-medium text-muted-foreground`

/**
 * ボタンコンテナの CSS クラス
 * @internal
 */
const BUTTON_CONTAINER_CLASS = `flex flex-col gap-3`

/**
 * RandomEmoji コンポーネント
 *
 * ランダムに絵文字を生成してクリップボードにコピーするツールです。
 * 生成した絵文字の履歴を保持し、過去の絵文字を再度コピーすることもできます。
 * FlowingGlow エフェクトとスムーズなアニメーションで視覚的なフィードバックを提供します。
 */
export default function RandomEmoji() {
  const makeRandomEmoji = useMakeRandomEmoji()
  const [emoji, setEmoji] = useState('🎲')
  const [mounted, setMounted] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [animationState, setAnimationState] = useState<AnimationState>('idle')
  const [copyFeedback, setCopyFeedback] = useState<CopyFeedback>({ show: false, emoji: '' })

  /**
   * クリップボードにテキストをコピーします
   */
  const copyToClipBoard = useCallback((value: string) => {
    if (navigator.clipboard) navigator.clipboard.writeText(value)
  }, [])

  /**
   * コピー成功のフィードバックを表示します
   */
  const showCopyFeedback = useCallback((emoji: string) => {
    setCopyFeedback({ show: true, emoji })
    setTimeout(() => setCopyFeedback({ show: false, emoji: '' }), 2500)
  }, [])

  /**
   * メインボタンクリック時のハンドラー
   * 新しい絵文字を生成し、履歴に追加してクリップボードにコピーします
   */
  const handleGenerateClick = useCallback(() => {
    if (animationState === 'spinning') return

    setAnimationState('spinning')
    const newEmoji = makeRandomEmoji()

    setTimeout(() => {
      setEmoji(newEmoji)
      setHistory((prev) => [newEmoji, ...prev].slice(0, MAX_HISTORY_LENGTH))
      copyToClipBoard(newEmoji)
      showCopyFeedback(newEmoji)
      setAnimationState('bouncing')
      setTimeout(() => setAnimationState('idle'), 300)
    }, 200)
  }, [makeRandomEmoji, copyToClipBoard, showCopyFeedback, animationState])

  /**
   * 履歴アイテムクリック時のハンドラー
   * 選択した絵文字をクリップボードにコピーします
   */
  const handleHistoryClick = useCallback(
    (selectedEmoji: string) => {
      setEmoji(selectedEmoji)
      copyToClipBoard(selectedEmoji)
      showCopyFeedback(selectedEmoji)
      setAnimationState('bouncing')
      setTimeout(() => setAnimationState('idle'), 300)
    },
    [copyToClipBoard, showCopyFeedback]
  )

  /**
   * 履歴一括コピー時のハンドラー
   * すべての履歴絵文字をクリップボードにコピーします
   */
  const handleAllHistoriesCopyClick = useCallback(() => {
    if (history.length === 0) return
    copyToClipBoard(history.join(''))
    showCopyFeedback(history.slice(0, 3).join(''))
  }, [copyToClipBoard, history, showCopyFeedback])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col gap-10">
      {/* メインエリア */}
      <div
        className={`
          flex flex-col items-center gap-8
          lg:flex-row lg:items-start lg:justify-center lg:gap-12
        `}
      >
        {/* 絵文字ディスプレイエリア */}
        <FlowingGlow className="relative">
          <div className="relative flex flex-col items-center">
            {/* コピーフィードバック - 上部に固定表示 */}
            <div
              className={cn(
                `
                  pointer-events-none absolute -top-10 left-1/2 flex -translate-x-1/2 items-center
                  gap-2 rounded-full border border-border/50 bg-card/90 px-3 py-1.5 text-sm
                  font-medium whitespace-nowrap text-foreground/70 shadow-sm backdrop-blur-sm
                  transition-all duration-300
                `,
                copyFeedback.show
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-2 opacity-0'
              )}
              aria-live="polite"
            >
              <ClipboardCopyIcon size={14} className="text-muted-foreground" />
              <span>コピーしました</span>
            </div>

            {/* 絵文字表示 */}
            <button
              type="button"
              onClick={handleGenerateClick}
              className={DISPLAY_CONTAINER_CLASS}
              aria-label="新しい絵文字を生成"
            >
              {/* グローエフェクト */}
              <div
                className={`
                  pointer-events-none absolute inset-0 bg-linear-to-br from-foreground/5
                  via-transparent to-foreground/5 opacity-0 transition-opacity duration-300
                  group-hover:opacity-100
                `}
                aria-hidden="true"
              />

              {/* 絵文字 */}
              <span
                className={cn(
                  EMOJI_DISPLAY_CLASS,
                  animationState === 'spinning' && SPIN_ANIMATION_CLASS,
                  animationState === 'bouncing' && BOUNCE_ANIMATION_CLASS
                )}
              >
                {emoji}
              </span>

              {/* ホバーヒント */}
              <div
                className={`
                  absolute bottom-3 flex items-center gap-1.5 text-xs text-muted-foreground
                  opacity-0 transition-opacity duration-200
                  group-hover:opacity-100
                `}
                aria-hidden="true"
              >
                <SparklesIcon size={12} />
                <span>クリックで生成</span>
              </div>
            </button>
          </div>
        </FlowingGlow>

        {/* 履歴セクション */}
        <section
          className={`
            flex w-full max-w-sm flex-col gap-4
            lg:w-80
          `}
        >
          <header className={HISTORY_HEADER_CLASS}>
            <HistoryIcon size={14} />
            <span>履歴</span>
            <span className="text-muted-foreground/60 tabular-nums">({history.length})</span>
          </header>

          {history.length > 0 ? (
            <>
              <ul className="grid grid-cols-8 gap-2">
                {history.map((item, index) => (
                  <li key={`${item}-${index}`}>
                    <button
                      type="button"
                      onClick={() => handleHistoryClick(item)}
                      className={HISTORY_ITEM_CLASS}
                      aria-label={`${item} をコピー`}
                      style={{
                        animationDelay: `${index * 20}ms`,
                      }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>

              <div className={BUTTON_CONTAINER_CLASS}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAllHistoriesCopyClick}
                  className="gap-2"
                >
                  <ClipboardListIcon size={14} />
                  履歴をまとめてコピー
                </Button>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground/60">生成した絵文字がここに表示されます</p>
          )}
        </section>
      </div>

      {/* 使い方セクション */}
      <section
        className={`
          mx-auto flex max-w-md flex-col gap-3 rounded-xl border border-border/30 bg-card/40 p-5
          backdrop-blur-sm
        `}
      >
        <h2 className="flex items-center gap-2 text-sm font-medium text-foreground/80">
          <SparklesIcon size={14} className="text-muted-foreground" />
          使い方
        </h2>
        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50">•</span>
            <span>
              絵文字をクリックすると、ランダムな絵文字が生成されクリップボードにコピーされます
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50">•</span>
            <span>履歴の絵文字をクリックすると、再度コピーできます</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50">•</span>
            <span>履歴は画面をリロードするとリセットされます</span>
          </li>
        </ul>
      </section>
    </div>
  )
}
