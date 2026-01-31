import { notFound } from 'next/navigation'

import { GoogleAds } from '@/components/misc/google-ads'
import { GOOGLE_ADS_SLOT_BANNER } from '@/constants'
import { DocumentHeader } from '@/features/document'
import { client, DocumentContent } from '@/lib/hackersheet'

/**
 * DocumentArticle コンポーネントの Props
 */
export interface DocumentArticleProps {
  /** ドキュメントのスラッグ */
  documentSlug: string
}

/**
 * DocumentArticle コンポーネント - ドキュメントのヘッダーと本文を表示します
 *
 * async Server Component として実装されており、Suspense でラップすることで
 * ストリーミング表示が可能です。
 *
 * @param props - DocumentArticleProps
 * @returns ドキュメントのヘッダーと本文を表示する JSX 要素
 */
export default async function DocumentArticle({ documentSlug }: DocumentArticleProps) {
  const { document } = await client.getDocument({ slug: documentSlug })

  if (!document || document.draft) {
    return notFound()
  }

  return (
    <>
      <DocumentHeader document={document} />
      <main className="space-y-20">
        <DocumentContent document={document} />
        <GoogleAds slot={GOOGLE_ADS_SLOT_BANNER} />
      </main>
    </>
  )
}
