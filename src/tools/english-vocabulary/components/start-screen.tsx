/**
 * 英単語クイズ - スタート画面コンポーネント
 */

import { Loader2 } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/shadcn-utils'

import { CARD_CLASS } from '../constants'

interface StartScreenProps {
  /** クイズ開始ボタンのクリックハンドラー */
  onStart: () => void
  /** 読み込み中かどうか */
  isLoading: boolean
  /** エラーメッセージ */
  error: string | null
}

/**
 * スタート画面コンポーネント
 *
 * クイズ開始前に表示される画面です。
 * 説明文とクイズ開始ボタン、エラーメッセージを表示します
 */
export const StartScreen = React.memo(function StartScreen({
  onStart,
  isLoading,
  error,
}: StartScreenProps) {
  return (
    <div className="w-full max-w-lg">
      <div
        className={cn(
          CARD_CLASS,
          'flex w-full flex-col items-center justify-center gap-6 text-center'
        )}
      >
        <h1 className="text-3xl font-bold">英単語クイズ</h1>
        <p className="text-muted-foreground">
          英単語・イディオム・句動詞の
          <br />
          意味を4択から選んでください
        </p>

        {error && (
          <div className="rounded-lg bg-destructive/10 px-4 py-2 text-destructive">{error}</div>
        )}

        <Button
          size="lg"
          onClick={onStart}
          disabled={isLoading}
          className="gap-2 px-8 py-6 text-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              読み込み中...
            </>
          ) : (
            'クイズを開始'
          )}
        </Button>

        <div className="mt-4 space-y-2 text-left text-sm text-muted-foreground">
          <p className="font-medium text-foreground">使い方</p>
          <ul className="list-inside list-disc space-y-1">
            <li>問題は全10問です</li>
            <li>正解を一発で選ぶと10点獲得</li>
            <li>間違えるたびに1点減点</li>
            <li>正解するまで次に進めません</li>
          </ul>
        </div>
      </div>
    </div>
  )
})
