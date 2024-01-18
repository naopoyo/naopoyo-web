'use client'

import { useEffect } from 'react'
import tocbot from 'tocbot'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { tocbotHeadingOffset } from '@/constants'
import docContentStyles from '@/styles/document-content.module.scss'
import tocStyles from '@/styles/document-toc.module.scss'

export default function DropdownToc() {
  return (
    <div className="fixed bottom-4 right-4 md:hidden">
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
    </div>
  )
}

function Toc() {
  const init = () => {
    tocbot.init({
      tocSelector: `.${tocStyles['dropdown']}`,
      contentSelector: `.${docContentStyles['main']}`,
      headingSelector: 'h2, h3, h4, h5, h6',
      scrollSmooth: false,
      headingsOffset: tocbotHeadingOffset,
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
