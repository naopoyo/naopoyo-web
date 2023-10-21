'use client'

import { useState } from 'react'

export interface CodeBlockCopyButtonProps {
  code: string
}

export default function CodeBlockCopyButton({ code }: CodeBlockCopyButtonProps) {
  const [label, setLabel] = useState('COPY')

  const handleClick = () => {
    navigator.clipboard.writeText(code).then(() => {
      setLabel('COPIED')
      setTimeout(() => setLabel('COPY'), 1000)
    })
  }

  return <button onClick={handleClick}>{label}</button>
}
