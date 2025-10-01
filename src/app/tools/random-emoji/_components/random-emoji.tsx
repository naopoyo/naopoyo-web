'use client'

import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

import useMakeRandomEmoji from './use-make-random-emoji'

export default function RandomEmoji() {
  const makeRandomEmoji = useMakeRandomEmoji()
  const [emoji, setEmoji] = useState('?')
  const [mounted, setMounted] = useState(false)
  const [history, setHistory] = useState<string[]>([])

  const copyToClipBoard = useCallback((value: string) => {
    if (navigator.clipboard) navigator.clipboard.writeText(value)
  }, [])

  const handleCopyButtonClick = useCallback(() => {
    const emoji = makeRandomEmoji()
    setEmoji(emoji)
    setHistory([emoji, ...history])
    copyToClipBoard(emoji)
  }, [makeRandomEmoji, history, copyToClipBoard])

  const handleHistoryClick = useCallback(
    (emoji: string) => {
      setEmoji(emoji)
      copyToClipBoard(emoji)
    },
    [copyToClipBoard]
  )

  const handleAllHistoriesCopyClick = useCallback(() => {
    copyToClipBoard(history.join(''))
  }, [copyToClipBoard, history])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-center gap-8 md:flex-row">
        <section className="flex flex-col gap-4">
          <div className="flex flex-col items-center">
            <div className="flex size-32 items-center justify-center rounded-lg border text-7xl">
              <div>{emoji}</div>
            </div>
          </div>

          <Button onClick={handleCopyButtonClick}>絵文字をクリップボードにコピー</Button>

          <Button variant="outline" onClick={handleAllHistoriesCopyClick}>
            履歴をまとめてクリップボードにコピー
          </Button>
        </section>

        <section className="flex flex-col gap-4 md:w-96">
          <h2 className="text-2xl font-bold">履歴 ({history.length})</h2>
          {history.length > 0 ? (
            <ul className="grid max-w-sm grid-cols-12 gap-4">
              {history.map((item, index) => (
                <li key={index}>
                  <button onClick={() => handleHistoryClick(item)}>{item}</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>生成した絵文字の履歴が表示されます。</p>
          )}
        </section>
      </div>

      <section className="mx-auto flex flex-col gap-4 text-muted-foreground md:w-96">
        <h2 className="text-2xl font-bold text-primary">使い方</h2>
        <p>
          ランダムに選ばれた絵文字をクリップボードにコピーします。コピーした絵文字が表示されます。
        </p>
        <p>
          履歴の絵文字をクリックするとクリップボードにコピーされます。履歴は画面をリロードするとリセットされます。
        </p>
      </section>
    </div>
  )
}
