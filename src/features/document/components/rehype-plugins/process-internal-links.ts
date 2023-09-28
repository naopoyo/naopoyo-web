import * as path from 'path'

import { Element } from 'hast'
import Mustache from 'mustache'
import { Parent } from 'unist'
import { visit } from 'unist-util-visit'

import { Document } from '@/features/document/types'
import { isUrl } from '@/utils'

export interface ProcessInternalLinksArgs {
  document: Document
  permaLinkFormat: string
}

export default function processInternalLinks({
  document,
  permaLinkFormat,
}: ProcessInternalLinksArgs) {
  return (tree: Parent) => {
    visit(tree, 'element', (element: Element) => {
      const link = element.properties.href || element.properties.src
      const tagName = element.tagName

      if (!link || typeof link !== 'string' || isUrl(link) || !document.path) {
        return
      }

      const baseDirname = `/${path.dirname(document.path)}`
      const fullPath = path.resolve(baseDirname, decodeURI(link)).replace(/^\//, '')

      if (tagName === 'a') {
        const doc = document.outboundLinkDocuments.find((doc) => doc.path === fullPath)
        if (doc) {
          element.properties.href = Mustache.render(permaLinkFormat, doc)
        }
      }
    })
  }
}
