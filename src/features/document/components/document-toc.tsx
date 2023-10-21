'use client'

import { useEffect } from 'react'
import tocbot from 'tocbot'

import styles from '@/styles/document-content.module.scss'

export default function DocumentToc() {
  useEffect(() => {
    tocbot.init({
      tocSelector: `.${styles.toc}`,
      contentSelector: `.${styles['document-content']}`,
      headingSelector: 'h2, h3, h4, h5, h6',
      scrollSmooth: false,
      headingsOffset: 65,
    })

    return () => tocbot.destroy()
  }, [])

  return <nav className={styles.toc} />
}
