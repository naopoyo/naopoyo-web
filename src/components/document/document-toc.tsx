'use client'

import { useEffect } from 'react'
import tocbot from 'tocbot'

import { tocbotHeadingOffset } from '@/constants'
import docContentStyles from '@/styles/document-content.module.scss'
import tocStyles from '@/styles/document-toc.module.scss'

export default function DocumentToc() {
  const init = () => {
    tocbot.init({
      tocSelector: `.${tocStyles.main}`,
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

  return <nav className={tocStyles.main} />
}
