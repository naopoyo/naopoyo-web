'use client'

import { KifuLite, KifuStore } from 'kifu-for-js'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export interface KifuProps {
  kifu: string
  filename?: string
}

export default function CodeBlockKifu({ kifu, filename }: KifuProps) {
  const getCurrentHash = useMemo(
    () => () => (typeof window !== 'undefined' ? window.location.hash.replace(/^#!?/, '') : ''),
    []
  )
  const searchParams = useSearchParams()
  const id = filename ? `user-content-${filename}` : undefined
  const [hash, setHash] = useState<string>(getCurrentHash())
  const [kifuStore] = useState(() => new KifuStore({ kifu: kifu }))

  useEffect(() => {
    initKifuUserSettings()
  }, [])

  useEffect(() => {
    const newPly = Number(searchParams.get('ply') ?? 0)
    if (hash === id) {
      kifuStore.player.goto(newPly)
    }
  }, [searchParams, kifuStore, hash, id])

  const handleHashChange = useMemo(
    () => () => {
      const currentHash = getCurrentHash()
      setHash(currentHash)
    },
    [getCurrentHash]
  )

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [handleHashChange])

  if (!kifuStore) {
    return null
  }

  return (
    <div className="my-4 flex justify-center" id={id}>
      <KifuLite kifuStore={kifuStore} />
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
