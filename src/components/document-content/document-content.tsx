import deepmerge from 'deepmerge'
import { ReactNode } from 'react'
import Markdown, { ExtraProps, Options } from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import docContentStyles from '@/styles/document-content.module.scss'

import 'katex/dist/katex.min.css'

import CustomImg from './custom-components/custom-img'
import CustomLink from './custom-components/custom-link'
import CustomPre from './custom-components/custom-pre'
import KifuToDirective from './directives/kifu-to-directive'
import { LinkCardDirective } from './directives/link-card-directive'
import XPostDirective from './directives/x-post-directive'
import YoutubeDirective from './directives/youtube-directive'
import processInternalLinks from './rehype-plugins/process-internal-links'
import rehypeClobberUrlDecode from './rehype-plugins/rehype-clobber-url-decode'
import rehypeFootnoteLinks from './rehype-plugins/rehype-footnote-links'

import type { Document } from '@/lib/hackersheet/types'

type DirectiveProps = { children: ReactNode } & ExtraProps

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'link-card': DirectiveProps
      'x-post': DirectiveProps
      youtube: DirectiveProps
      'kifu-to': DirectiveProps
    }
  }
}

export interface DocumentContentProps {
  document: Document
  permaLinkFormat: string
}

export default function DocumentContent({ document, permaLinkFormat }: DocumentContentProps) {
  const sanitizeSchema = deepmerge(defaultSchema, {
    attributes: { div: [['className', /^sr-only$/]] },
    tagNames: ['link-card', 'x-post', 'youtube', 'kifu-to'],
  })

  const options: Options = {
    remarkRehypeOptions: { footnoteLabelTagName: 'div', clobberPrefix: '' },
    remarkPlugins: [remarkGfm, remarkMath, remarkDirective, remarkDirectiveRehype],
    rehypePlugins: [
      rehypeRaw,
      [rehypeSanitize, sanitizeSchema],
      rehypeSlug,
      rehypeKatex,
      [processInternalLinks, { document, permaLinkFormat }],
      rehypeFootnoteLinks,
      rehypeClobberUrlDecode,
    ],
    components: {
      h1: 'h2',
      a: CustomLink,
      img: CustomImg,
      pre: CustomPre,
      'link-card': (props) => LinkCardDirective(props, document),
      'x-post': XPostDirective,
      youtube: YoutubeDirective,
      'kifu-to': KifuToDirective,
    },
  }

  return (
    <Markdown className={docContentStyles['main']} {...options}>
      {document.content}
    </Markdown>
  )
}
