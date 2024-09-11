'use client'

import { useEffect } from 'react'
import { init, destroy } from 'tocbot'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TOCBOT_BASE_OPTIONS } from '@/constants'
import { documentContentStyle } from '@/lib/hackersheet/style'
import tocStyles from '@/styles/document-toc.module.scss'

export default function DocumentDropdownToc() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          目次
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[70vh] w-screen bg-card" align="end">
        <Toc />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Toc() {
  const initTocbot = () => {
    init({
      ...TOCBOT_BASE_OPTIONS,
      tocSelector: `.${tocStyles['dropdown']}`,
      contentSelector: `.${documentContentStyle.main}`,
    })
  }

  useEffect(() => {
    initTocbot()

    window.addEventListener('resize', initTocbot)

    return () => {
      window.removeEventListener('resize', initTocbot)
      destroy()
    }
  }, [])

  return <nav className={tocStyles['dropdown']} />
}
