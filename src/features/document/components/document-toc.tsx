import { toc } from 'mdast-util-toc'
import Markdown, { Options } from 'react-markdown'

import { Document } from '@/features/document/types'
import styles from '@/styles/markdown.module.scss'

import type { Root } from 'mdast'
import type { Plugin } from 'unified'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      customComponent: { test: string }
    }
  }
}

export interface DocumentTocProps {
  document: Document
}

export default function DocumentToc({ document }: DocumentTocProps) {
  const options: Options = {
    children: document.content,
    remarkPlugins: [mdToToc],
  }

  return <Markdown className={styles.toc} {...options} />
}

const mdToToc: Plugin<void[], Root, Root> = () => {
  return (tree) => {
    const tocMap = toc(tree, { ordered: false, tight: true }).map
    if (tocMap) {
      tree.children = [tocMap]
    } else {
      tree.children = []
    }
    return tree
  }
}
