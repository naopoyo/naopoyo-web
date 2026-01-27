import { CalendarIcon, ClockIcon, GitCommitHorizontalIcon, TagIcon } from 'lucide-react'

import { DocumentEmoji } from '@/components/document'
import { FlowingGlow } from '@/components/effects'
import { Link } from '@/components/link'
import { SmallTag } from '@/components/tag'
import { HACKERSHEET_GITHUB_REPO_URL } from '@/constants'
import { createDateFormat, timeAgo } from '@/utils'

import type { Document } from '@/lib/hackersheet'

/**
 * DocumentHeader コンポーネントの Props
 */
export interface DocumentHeaderProps {
  /** 表示するドキュメント */
  document: Document
}

/**
 * 日付フォーマッター
 * @internal
 */
const DATE_FORMAT = createDateFormat('yyyy-MM-dd')

/**
 * ドキュメント更新日が公開日と異なるかを判定します。
 *
 * @param document - ドキュメント
 * @returns 更新日が公開日と異なる場合は true
 * @internal
 */
function shouldShowModifiedDate(document: Document): boolean {
  return document.publishedAt !== document.modifiedAt
}

/**
 * ドキュメントがタグを持つかを判定します。
 *
 * @param document - ドキュメント
 * @returns タグが存在する場合は true
 * @internal
 */
function shouldShowTags(document: Document): boolean {
  return document.tags.length > 0
}

/**
 * GitHub 履歴ページの URL を生成します。
 *
 * @param document - ドキュメント
 * @returns GitHub URL、または undefined（リポジトリ URL が未設定の場合）
 * @internal
 */
function generateHistoryUrl(document: Document): string | undefined {
  if (!HACKERSHEET_GITHUB_REPO_URL) {
    return undefined
  }
  return `${HACKERSHEET_GITHUB_REPO_URL}/commits/main/${document.path}`
}

/**
 * MetaItem コンポーネント - メタ情報を表示するアイテム
 *
 * @internal
 */
function MetaItem({
  icon: Icon,
  label,
  value,
  subValue,
  href,
}: {
  icon: React.ComponentType<{ className?: string; size?: number }>
  label: string
  value: React.ReactNode
  subValue?: string
  href?: string
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="text-muted-foreground/40" size={14} />
      <div className="flex items-baseline gap-2">
        <span className="text-xs text-muted-foreground">{label}</span>
        {href ? (
          <Link
            href={href}
            className={`
              text-sm text-foreground/80 no-underline transition-all duration-200
              hover:text-foreground hover:no-underline
            `}
          >
            {value}
          </Link>
        ) : (
          <span className="text-sm text-foreground">{value}</span>
        )}
        {subValue && (
          <span className="text-xs text-muted-foreground/50 tabular-nums">{subValue}</span>
        )}
      </div>
    </div>
  )
}

/**
 * DocumentHeader コンポーネント - ドキュメントのタイトルと基本情報を表示します
 *
 * ドキュメントのタイトル、絵文字、公開日、更新日、タグなどのメタデータを表示します。
 * プレビュー画像がある場合は表示し、GitHub の履歴ページへのリンクも提供します。
 *
 * @param props - DocumentHeaderProps
 * @returns ドキュメント情報とメタデータを表示する JSX 要素
 */
export default function DocumentHeader({ document }: DocumentHeaderProps) {
  const showModified = shouldShowModifiedDate(document)
  const showTags = shouldShowTags(document)
  const historyUrl = generateHistoryUrl(document)

  return (
    <header className="flex flex-col gap-8">
      {/* Emoji & Title Section with flowing glow effect */}
      <FlowingGlow className="relative">
        <div className="flex flex-col gap-4">
          <span className="text-7xl">
            <DocumentEmoji emoji={document.emoji} />
          </span>
          <h1
            className={`
              auto-phrase text-3xl/snug font-bold tracking-tight text-foreground
              md:text-4xl/snug
            `}
          >
            {document.title}
          </h1>
        </div>
      </FlowingGlow>

      {/* Meta Information */}
      <div
        className={`
          flex flex-col gap-2.5
          md:flex-row md:flex-wrap md:items-center md:gap-x-6 md:gap-y-2
        `}
      >
        <MetaItem
          icon={CalendarIcon}
          label="公開日"
          value={timeAgo(document.publishedAt)}
          subValue={DATE_FORMAT(document.publishedAt)}
        />

        {showModified && (
          <MetaItem
            icon={ClockIcon}
            label="更新日"
            value={timeAgo(document.modifiedAt)}
            subValue={DATE_FORMAT(document.modifiedAt)}
          />
        )}

        {historyUrl && (
          <MetaItem
            icon={GitCommitHorizontalIcon}
            label="履歴"
            value="GitHubで見る"
            href={historyUrl}
          />
        )}
      </div>

      {/* Tags Section */}
      {showTags && (
        <div className="flex items-center gap-2.5">
          <TagIcon className="text-muted-foreground/40" size={14} />
          <ul className="flex flex-wrap gap-2">
            {document.tags.map((tag) => (
              <li key={tag.id}>
                <SmallTag tagName={tag.name} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Preview Image */}
      {document.preview && (
        <picture className="-mx-4">
          <img
            src={document.preview.fileUrl}
            width={document.preview.width}
            height={document.preview.height}
            alt="preview"
            loading="lazy"
          />
        </picture>
      )}
    </header>
  )
}
