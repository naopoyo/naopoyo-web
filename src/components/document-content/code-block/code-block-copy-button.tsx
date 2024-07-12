'use client'

import { useState } from 'react'
import { HiOutlineClipboardDocumentList, HiCheck } from 'react-icons/hi2'

export interface CodeBlockCopyButtonProps {
  code: string
}

export default function CodeBlockCopyButton({ code }: CodeBlockCopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const removeShikiCode = (code: string) => code.replace(/ *\/\/.*\[!code[^\]]+\]/gm, '').trim()

  const handleClick = () => {
    navigator.clipboard.writeText(removeShikiCode(code)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1000)
    })
  }

  return (
    <button className="rounded p-1 hover:bg-foreground/10" onClick={handleClick}>
      {copied ? <HiCheck size={18} /> : <HiOutlineClipboardDocumentList size={18} />}
    </button>
  )
}
