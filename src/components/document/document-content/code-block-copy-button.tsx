'use client'

import { useState } from 'react'
import { HiOutlineClipboardDocumentList, HiCheck } from 'react-icons/hi2'

export interface CodeBlockCopyButtonProps {
  code: string
}

export default function CodeBlockCopyButton({ code }: CodeBlockCopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1000)
    })
  }

  return (
    <button className="rounded p-1 hover:bg-white/30" onClick={handleClick}>
      {copied ? <HiCheck size={18} /> : <HiOutlineClipboardDocumentList size={18} />}
    </button>
  )
}
