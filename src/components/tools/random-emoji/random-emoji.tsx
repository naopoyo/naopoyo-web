'use client'

import { ChangeEvent, useEffect, useState } from 'react'

import useMakeRandomEmoji from './use-make-random-emoji'

export default function RandomEmoji() {
  const makeRandomEmoji = useMakeRandomEmoji()
  const [emoji, setEmoji] = useState('?')
  const [mounted, setMounted] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [isNotoColorEmoji, setIsNotoColorEmoji] = useState(true)

  const handleClick = () => {
    const emoji = makeRandomEmoji()
    setEmoji(emoji)
    setHistory([emoji, ...history])
    copyToClipBoard(emoji)
  }

  const handleHistoryClick = (emoji: string) => {
    setEmoji(emoji)
    copyToClipBoard(emoji)
  }

  const handleAllHistoriesCopyClick = () => {
    copyToClipBoard(history.join(''))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsNotoColorEmoji(event.target.checked)
  }

  const copyToClipBoard = (value: string) => {
    navigator.clipboard && navigator.clipboard.writeText(value)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-center'>
        ランダムに選ばれた絵文字をクリップボードにコピーします。コピーした絵文字が表示されます。
      </p>
      <div className='flex items-center justify-center'>
        <div className='flex h-32 w-32 items-center justify-center rounded-lg border'>
          <div
            className='text-7xl'
            style={{ fontFamily: isNotoColorEmoji ? "'Noto Color Emoji" : 'sans-serif' }}
          >
            {emoji}
          </div>
        </div>
      </div>
      <div className='text-center'>
        <input
          id='is-noto-color-emoji'
          type='checkbox'
          checked={isNotoColorEmoji}
          onChange={handleChange}
        />{' '}
        <label htmlFor='is-noto-color-emoji'>Noto Color Emoji</label>
      </div>
      <div className='text-center'>
        <button
          className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
          onClick={handleClick}
        >
          絵文字をクリップボードにコピー
        </button>
      </div>

      <section className='mt-8 flex flex-col gap-4 text-center'>
        <h2 className='text-2xl font-bold'>履歴 ({history.length})</h2>
        <div className='text-center'>
          <button
            className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
            onClick={handleAllHistoriesCopyClick}
          >
            履歴をまとめてクリップボードにコピー
          </button>
        </div>
        <p>
          履歴の絵文字をクリックするとクリップボードにコピーされます。履歴は画面をリロードするとリセットされます。
        </p>
        {history.length > 0 ? (
          <ul className='mx-auto grid max-w-sm grid-cols-12 gap-4'>
            {history.map((item, index) => (
              <li
                key={index}
                style={{ fontFamily: isNotoColorEmoji ? "'Noto Color Emoji" : 'sans-serif' }}
              >
                <button onClick={() => handleHistoryClick(item)}>{item}</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>生成した絵文字の履歴が表示されます。</p>
        )}
      </section>
    </div>
  )
}
