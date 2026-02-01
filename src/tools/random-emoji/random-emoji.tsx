'use client'

import { ClipboardCopyIcon, ClipboardListIcon, HistoryIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/shadcn-utils'

import {
  BOUNCE_ANIMATION_CLASS,
  BUTTON_CONTAINER_CLASS,
  DISPLAY_CONTAINER_CLASS,
  EMOJI_DISPLAY_CLASS,
  HISTORY_HEADER_CLASS,
  HISTORY_ITEM_CLASS,
  MAX_HISTORY_LENGTH,
  SPIN_ANIMATION_CLASS,
} from './constants'
import useMakeRandomEmoji from './use-make-random-emoji'
import { copyToClipboard } from './utils'

import type { AnimationState, CopyFeedback } from './types'

type HistoryItem = {
  emoji: string
  id: string
}

/**
 * RandomEmoji コンポーネント
 *
 * ランダムに絵文字を生成してクリップボードにコピーするツールです。
 * 生成した絵文字の履歴を保持し、過去の絵文字を再度コピーすることもできます。
 * スピン・バウンスアニメーションで生成を視覚化します
 */
export default function RandomEmoji() {
  const makeRandomEmoji = useMakeRandomEmoji()
  const [emoji, setEmoji] = useState('🎲')
  const [mounted, setMounted] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [animationState, setAnimationState] = useState<AnimationState>('idle')
  const [copyFeedback, setCopyFeedback] = useState<CopyFeedback>({ show: false, emoji: '' })

  /**
   * コピー成功のフィードバックを表示します
   */
  const showCopyFeedback = useCallback((selectedEmoji: string) => {
    setCopyFeedback({ show: true, emoji: selectedEmoji })
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
      const newItem: HistoryItem = {
        emoji: newEmoji,
        id: `${newEmoji}-${Date.now()}-${Math.random()}`,
      }
      setHistory((prev) => [newItem, ...prev].slice(0, MAX_HISTORY_LENGTH))
      copyToClipboard(newEmoji)
      showCopyFeedback(newEmoji)
      setAnimationState('bouncing')
      setTimeout(() => setAnimationState('idle'), 300)
    }, 200)
  }, [makeRandomEmoji, showCopyFeedback, animationState])

  /**
   * 履歴アイテムクリック時のハンドラー
   * 選択した絵文字をクリップボードにコピーします
   */
  const handleHistoryClick = useCallback(
    (selectedEmoji: string) => {
      setEmoji(selectedEmoji)
      copyToClipboard(selectedEmoji)
      showCopyFeedback(selectedEmoji)
      setAnimationState('bouncing')
      setTimeout(() => setAnimationState('idle'), 300)
    },
    [showCopyFeedback]
  )

  /**
   * 履歴一括コピー時のハンドラー
   * すべての履歴絵文字をクリップボードにコピーします
   */
  const handleAllHistoriesCopyClick = useCallback(() => {
    if (history.length === 0) return
    const allEmojis = history.map((item) => item.emoji).join('')
    copyToClipboard(allEmojis)
    const previewEmojis = history
      .slice(0, 3)
      .map((item) => item.emoji)
      .join('')
    showCopyFeedback(previewEmojis)
  }, [history, showCopyFeedback])

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
        <div className="relative flex flex-col items-center gap-6">
          {/* コピーフィードバック - 上部に固定表示 */}
          <div
            className={cn(
              `
                pointer-events-none absolute -top-12 left-1/2 flex -translate-x-1/2 items-center
                gap-2 rounded-lg border border-border/30 bg-muted px-3 py-2 text-sm font-medium
                whitespace-nowrap transition-opacity duration-200
              `,
              copyFeedback.show ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
            aria-live="polite"
          >
            <ClipboardCopyIcon size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">コピーしました</span>
          </div>

          {/* 絵文字表示 */}
          <button
            type="button"
            onClick={handleGenerateClick}
            className={DISPLAY_CONTAINER_CLASS}
            aria-label="新しい絵文字を生成"
          >
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
          </button>

          {/* ヒントテキスト */}
          <p className="text-xs text-muted-foreground">クリックで生成・コピー</p>
        </div>

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
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleHistoryClick(item.emoji)}
                      className={HISTORY_ITEM_CLASS}
                      aria-label={`${item.emoji} をコピー`}
                      style={{
                        animationDelay: `${index * 20}ms`,
                      }}
                    >
                      {item.emoji}
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
          mx-auto flex max-w-md flex-col gap-3 rounded-xl border border-border/30 bg-muted/30 p-5
        `}
      >
        <h2 className="text-sm font-medium text-foreground">使い方</h2>
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
