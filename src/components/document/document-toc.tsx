'use client'

import { useEffect } from 'react'
import tocbot from 'tocbot'

import { tocbotBaseOptions } from '@/constants'
import docContentStyles from '@/styles/document-content.module.scss'
import tocStyles from '@/styles/document-toc.module.scss'

export default function DocumentToc() {
  const init = () => {
    tocbot.init({
      ...tocbotBaseOptions,
      tocSelector: `.${tocStyles.main}`,
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

  return <nav className={tocStyles.main} />
}
