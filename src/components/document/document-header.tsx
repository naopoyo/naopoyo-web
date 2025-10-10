import Image from 'next/image'

import { DocumentEmoji } from '@/components/document'
import { Link } from '@/components/link'
import { SmallTag } from '@/components/tag'
import { HACKERSHEET_GITHUB_REPO_URL } from '@/constants'
import { createDateFormat, timeAgo } from '@/utils'

import type { Document } from '@/lib/hackersheet'

export interface DocumentHeaderProps {
  document: Document
}

export default function DocumentHeader({ document }: DocumentHeaderProps) {
  const showModified = document.publishedAt !== document.modifiedAt
  const showTags = document.tags.length > 0
  const historyUrl = HACKERSHEET_GITHUB_REPO_URL
    ? HACKERSHEET_GITHUB_REPO_URL + '/commits/main/' + document.path
    : undefined
  const df = createDateFormat('yyyy-MM-dd')

  return (
    <div className="flex flex-col gap-10">
      <div className="flex w-full flex-col gap-16">
        <div className="text-7xl">
          <DocumentEmoji emoji={document.emoji} />
        </div>
        <h1 className="auto-phrase text-3xl leading-relaxed font-semibold">{document.title}</h1>
        <div className="flex flex-col gap-4">
          <div
            className={`
              flex gap-8 text-xs
              md:gap-16
            `}
          >
            <div className="flex flex-col gap-1">
              <div className="text-muted-foreground">公開日</div>
              <div>{timeAgo(document.publishedAt)}</div>
              <div className="text-muted-foreground">{df(document.publishedAt)}</div>
            </div>
            {showModified && (
              <div className="flex flex-col gap-1">
                <div className="text-muted-foreground">更新日</div>
                <div>{timeAgo(document.modifiedAt)}</div>
                <div className="text-muted-foreground">{df(document.modifiedAt)}</div>
              </div>
            )}
            {historyUrl && (
              <div className="flex flex-col gap-1">
                <div className="text-muted-foreground">更新履歴</div>
                <div>
                  <Link href={historyUrl} icon="external" iconSize={12}>
                    GitHubで見る
                  </Link>
                </div>
              </div>
            )}
          </div>
          {showTags && (
            <ul className="flex flex-row gap-4">
              {document.tags.map((tag) => (
                <li key={tag.id}>
                  <SmallTag tagName={tag.name} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {document.preview && (
        <picture className="mx-[-16px]">
          <Image
            src={document.preview.fileUrl}
            width={document.preview.width}
            height={document.preview.height}
            alt="preview"
            loading="lazy"
          />
        </picture>
      )}
    </div>
  )
}
