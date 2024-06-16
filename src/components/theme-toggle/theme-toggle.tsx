'use client'

import { ComputerIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export default function ThemeToggle() {
  const [isClient, setIsClient] = useState(false)

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || theme === undefined) {
    return <></>
  }

  return (
    <ToggleGroup
      className="rounded-xl border"
      size="sm"
      type="single"
      value={theme}
      onValueChange={(value) => setTheme(value)}
    >
      <ToggleGroupItem className="rounded-xl" value="dark" aria-label="Toggle dark">
        <MoonIcon size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem className="rounded-xl" value="system" aria-label="Toggle system">
        <ComputerIcon size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem className="rounded-xl" value="light" aria-label="Toggle light">
        <SunIcon size={16} />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
