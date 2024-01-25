'use client'

import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

import useMakeRandomEmoji from './use-make-random-emoji'

export default function RandomEmoji() {
  const makeRandomEmoji = useMakeRandomEmoji()
  const [emoji, setEmoji] = useState('?')
  const [mounted, setMounted] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [isNotoColorEmoji, setIsNotoColorEmoji] = useState(true)

  const copyToClipBoard = useCallback((value: string) => {
    navigator.clipboard && navigator.clipboard.writeText(value)
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

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setIsNotoColorEmoji(event.target.checked)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-center gap-8 md:flex-row">
        <section className="flex flex-col gap-4">
          <div className="flex flex-col items-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-lg border text-7xl">
              <div className={isNotoColorEmoji ? 'font-noto-color-emoji' : ''}>{emoji}</div>
            </div>
          </div>

          <div>
            <input
              id="is-noto-color-emoji"
              type="checkbox"
              checked={isNotoColorEmoji}
              onChange={handleChange}
            />{' '}
            <label htmlFor="is-noto-color-emoji">Noto Color Emoji</label>
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
                <li key={index} className={isNotoColorEmoji ? 'font-noto-color-emoji' : ''}>
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
