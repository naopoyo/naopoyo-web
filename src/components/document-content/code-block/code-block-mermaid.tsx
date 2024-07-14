'use client'

import { createHash } from 'crypto'

import mermaid from 'mermaid'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'

export interface CodeBlockMermaidProps {
  code: string
}

function createId(code: string) {
  const hash = createHash('sha256')
  hash.update(code)
  return 'id-' + hash.digest('hex')
}

export default function CodeBlockMermaid({ code }: CodeBlockMermaidProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [svg, setSvg] = useState('')
  const { theme, systemTheme } = useTheme()
  const id = createId(code)

  useEffect(() => {
    const renderMermaid = async () => {
      if (!mounted) {
        setMounted(true)
      }
      const currentTheme = theme === 'system' ? systemTheme : theme
      if (mounted && ref.current) {
        mermaid.initialize({ theme: currentTheme })
        try {
          const result = await mermaid.render(id, code, ref.current)
          setSvg(result.svg)
        } catch {
          setSvg('Mermaid Syntax Error')
        }
      }
    }
    renderMermaid()
  }, [mounted, code, id, theme, systemTheme, setSvg, setMounted])

  if (!mounted)
    return (
      <div className="my-4 flex h-[400px] items-center justify-center rounded bg-background">
        <div>Loading...</div>
      </div>
    )

  return (
    <div className="my-4 flex items-center justify-center overflow-auto rounded text-foreground">
      <div
        className="max-h-full max-w-full [&>svg]:w-[600px]"
        dangerouslySetInnerHTML={{ __html: svg }}
        ref={ref}
      />
    </div>
  )
}
