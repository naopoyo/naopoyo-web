import { Element } from 'hast'
import { Parent } from 'unist'
import { visit } from 'unist-util-visit'

export interface Options {
  clobberPrefix?: string
}

export default function rehypeClobberUrlDecode(options?: Options) {
  return (tree: Parent) => {
    visit(tree, 'element', (element: Element) => {
      const id = element.properties.id
      const clobberPrefix =
        options && typeof options.clobberPrefix === 'string'
          ? options.clobberPrefix
          : 'user-content-'

      if (typeof id !== 'string') return
      if (!id.startsWith(clobberPrefix)) return

      element.properties.id = decodeURI(id)
    })
  }
}
