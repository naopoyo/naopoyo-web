'use client'

import { ComputerIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

/**
 * ThemeSwitcher コンポーネント - ユーザーがテーマ（dark/system/light）を切り替えられる UI を提供します。
 *
 * クライアントコンポーネントで、マウント確認後に現在のテーマ値を表示します。
 */
export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted || theme === undefined) {
    return null
  }

  return (
    <ToggleGroup
      className="rounded-full border p-1"
      size="sm"
      type="single"
      value={theme}
      onValueChange={(value) => setTheme(value)}
    >
      <ToggleGroupItem className="rounded-full" value="dark" aria-label="Toggle dark">
        <MoonIcon size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem className="rounded-full" value="system" aria-label="Toggle system">
        <ComputerIcon size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem className="rounded-full" value="light" aria-label="Toggle light">
        <SunIcon size={16} />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
