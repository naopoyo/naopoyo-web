'use client'

import mermaid from 'mermaid'
import { useEffect, useRef, useState } from 'react'

export interface CodeBlockMermaidProps {
  code: string
}

export default function CodeBlockMermaid({ code }: CodeBlockMermaidProps) {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    if (mounted && ref.current) {
      mermaid.init({ theme: 'dark' }, ref.current)
    }
  }, [mounted, setMounted])

  if (!mounted)
    return (
      <div className="flex h-[400px] items-center justify-center rounded bg-[#1D1F21]">
        <div>Loading...</div>
      </div>
    )

  return (
    <div className="flex h-[400px] items-center justify-center overflow-auto rounded bg-[#1D1F21] text-[#1D1F21]">
      <div className="max-h-full max-w-full [&>svg]:w-[600px]" ref={ref}>
        {code}
      </div>
    </div>
  )
}
