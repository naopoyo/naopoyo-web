'use client'

import { useEffect } from 'react'
import { init, destroy } from 'tocbot'

import { TOCBOT_BASE_OPTIONS } from '@/constants'
import { documentContentStyle } from '@/lib/hackersheet/style'
import tocStyles from '@/styles/document-toc.module.scss'

export default function DocumentToc() {
  const initTocbot = () => {
    init({
      ...TOCBOT_BASE_OPTIONS,
      tocSelector: `.${tocStyles.main}`,
      contentSelector: `.${documentContentStyle['main']}`,
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

  return <nav className={tocStyles.main} />
}
