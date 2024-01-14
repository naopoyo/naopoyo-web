import { ReactNode } from 'react'
import Markdown, { ExtraProps, Options } from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import styles from '@/styles/document-content.module.scss'

import 'katex/dist/katex.min.css'

import CustomImg from './document-content/custom-img'
import CustomLink from './document-content/custom-link'
import CustomPre from './document-content/custom-pre'
import { LinkCardDirective } from './document-content/link-card-directive'
import XPostDirective from './document-content/x-post-directive'
import YoutubeDirective from './document-content/youtube-directive'
import processInternalLinks from './rehype-plugins/process-internal-links'

import type { Document } from '@/lib/hackersheet/types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'link-card': { children: ReactNode } & ExtraProps
      'x-post': { children: ReactNode } & ExtraProps
      youtube: { children: ReactNode } & ExtraProps
    }
  }
}

export interface DocumentContentProps {
  document: Document
  permaLinkFormat: string
}

export default function DocumentContent({ document, permaLinkFormat }: DocumentContentProps) {
  const options: Options = {
    children: document.content,
    remarkPlugins: [remarkGfm, remarkMath, remarkDirective, remarkDirectiveRehype],
    rehypePlugins: [
      rehypeRaw,
      rehypeSlug,
      [processInternalLinks, { document, permaLinkFormat }],
      rehypeKatex,
      rehypeSanitize,
    ],
    components: {
      a: CustomLink,
      img: CustomImg,
      pre: CustomPre,
      'link-card': (props) => LinkCardDirective(props, document),
      'x-post': XPostDirective,
      youtube: YoutubeDirective,
    },
  }

  return <Markdown className={styles['document-content']} {...options} />
}
