'use client'

import { KifuLite } from 'kifu-for-js'
import { useEffect } from 'react'

export interface KifuProps {
  kifu: string
}

export default function Kifu({ kifu }: KifuProps) {
  useEffect(() => {
    initKifuUserSettings()
  }, [])

  return (
    <div className="my-4 flex justify-center">
      <KifuLite kifu={kifu} />
    </div>
  )
}

/**
 * 棋譜プレーヤーのhapticFeedbackをオフにする
 */
function initKifuUserSettings() {
  const LOCALSTORAGE_KEY = 'kifuforjs'
  const defaultSettings = {
    hapticFeedback: false,
  }

  const settings = localStorage.getItem(LOCALSTORAGE_KEY)

  if (!settings) {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(defaultSettings))
  }
}
