'use client'

import { useEffect } from 'react'
import tocbot from 'tocbot'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { tocbotBaseOptions } from '@/constants'
import docContentStyles from '@/styles/document-content.module.scss'
import tocStyles from '@/styles/document-toc.module.scss'

export default function DropdownToc() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          目次
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[70vh] w-screen overflow-auto p-2" align="end">
        <Toc />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Toc() {
  const init = () => {
    tocbot.init({
      ...tocbotBaseOptions,
      tocSelector: `.${tocStyles['dropdown']}`,
      contentSelector: `.${docContentStyles['main']}`,
    })
  }

  useEffect(() => {
    init()

    window.addEventListener('resize', init)

    return () => {
      window.removeEventListener('resize', init)
      tocbot.destroy()
    }
  }, [])

  return <nav className={tocStyles['dropdown']} />
}
