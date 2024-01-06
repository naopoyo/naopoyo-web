'use client'

import { useEffect } from 'react'
import tocbot from 'tocbot'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import styles from '@/styles/document-content.module.scss'

export default function DropdownToc() {
  return (
    <div className="fixed bottom-4 right-4 md:hidden">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="secondary">
            目次
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <Toc />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function Toc() {
  const init = () => {
    tocbot.init({
      tocSelector: `.${styles.toc}.dropdown-toc`,
      contentSelector: `.${styles['document-content']}`,
      headingSelector: 'h2, h3, h4, h5, h6',
      scrollSmooth: false,
      headingsOffset: 65,
    })
  }

  useEffect(() => {
    init()

    window.addEventListener('resize', () => {
      init()
      return () => tocbot.destroy()
    })

    return () => tocbot.destroy()
  }, [])

  const className = `${styles.toc} dropdown-toc`

  return <nav className={className} />
}
