'use client'

import documentContentStyle from '@hackersheet/next-document-content-components/style'
import { useEffect } from 'react'
import tocbot from 'tocbot'

import { TOCBOT_BASE_OPTIONS } from '@/constants'
import tocStyles from '@/styles/document-toc.module.scss'

export default function DocumentToc() {
  const init = () => {
    tocbot.init({
      ...TOCBOT_BASE_OPTIONS,
      tocSelector: `.${tocStyles.main}`,
      contentSelector: `.${documentContentStyle['main']}`,
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
