'use client'

import mermaid from 'mermaid'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'

export interface CodeBlockMermaidProps {
  code: string
}

export default function CodeBlockMermaid({ code }: CodeBlockMermaidProps) {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { theme, systemTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    setMounted(true)
    if (mounted && ref.current) {
      mermaid.init({ theme: currentTheme }, ref.current)
    }
  }, [mounted, currentTheme, setMounted])

  if (!mounted)
    return (
      <div className="my-4 flex h-[400px] items-center justify-center rounded bg-background">
        <div>Loading...</div>
      </div>
    )

  return (
    <div className="my-4 flex items-center justify-center overflow-auto rounded text-[#1D1F21]">
      <div className="max-h-full max-w-full [&>svg]:w-[600px]" ref={ref}>
        {code}
      </div>
    </div>
  )
}
