'use client'

import { useEffect } from 'react'
import tocbot from 'tocbot'

import styles from '@/styles/document-content.module.scss'

export default function DocumentToc() {
  const init = () => {
    tocbot.init({
      tocSelector: `.${styles.toc}`,
      contentSelector: `.${styles['document-content']}`,
      headingSelector: 'h2, h3, h4, h5, h6',
      scrollSmooth: false,
      headingsOffset: 65,
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

  return <nav className={styles.toc} />
}
