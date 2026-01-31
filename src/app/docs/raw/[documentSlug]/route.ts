import { NextResponse } from 'next/server'

import { client } from '@/lib/hackersheet'

type RouteParams = {
  params: Promise<{ documentSlug: string }>
}

/**
 * ドキュメントの raw markdown コンテンツを返す Route Handler
 *
 * @example
 * GET /docs/raw/rem-px → markdown コンテンツを返す
 * GET /docs/rem-px.md → rewrites により /docs/raw/rem-px にリダイレクトされる
 */
export async function GET(request: Request, { params }: RouteParams) {
  const { documentSlug } = await params
  const { document } = await client.getDocument({ slug: documentSlug })

  if (!document) {
    return new NextResponse('Not Found', { status: 404 })
  }

  return new NextResponse(document.content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  })
}
