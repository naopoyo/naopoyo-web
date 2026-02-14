import { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/layouts/containers'
import { PageHeader } from '@/components/layouts/page-headers'

const title = 'Tools'
const description = '便利ツールをまとめた一覧ページです。'

export const metadata: Metadata = {
  title: title,
  description: description,
}

export const dynamic = 'force-static'
export const revalidate = 60

/**
 * ツール情報の型定義
 */
interface Tool {
  /** ツールのURL */
  href: string
  /** ツール名 */
  title: string
  /** ツールの説明 */
  description: string
  /** 絵文字アイコン */
  emoji: string
  /** アクセントカラー（Tailwindカラー） */
  accentColor: string
}

/**
 * ツール一覧データ
 */
const tools: Tool[] = [
  {
    href: '/tools/random-emoji',
    title: 'ランダム絵文字コピー',
    description: 'ランダムな絵文字を生成してワンクリックでコピー',
    emoji: '🎲',
    accentColor: 'amber',
  },
  {
    href: '/tools/rem-px-converter',
    title: 'rem / px 変換',
    description: 'CSSの単位をリアルタイムで相互変換',
    emoji: '📐',
    accentColor: 'violet',
  },
  {
    href: '/tools/english-vocabulary',
    title: '英単語クイズ',
    description: '英単語の意味を4択で学習',
    emoji: '📚',
    accentColor: 'emerald',
  },
  {
    href: '/tools/effort-estimator',
    title: '工数見積もりくん',
    description: '直感的な実装工数からチェックリストで現実的な見積もりを算出',
    emoji: '🧮',
    accentColor: 'amber',
  },
]

/**
 * ツールカードコンポーネント
 *
 * 各ツールへのリンクをカード形式で表示します。
 * シンプルで落ち着いたデザインで、ホバー時に微妙な背景色の変化を伴います。
 */
function ToolCard({ tool }: { tool: Tool }) {
  const accentColorMap: Record<string, string> = {
    amber: 'hover:bg-amber-50 dark:hover:bg-amber-950/20',
    violet: 'hover:bg-violet-50 dark:hover:bg-violet-950/20',
    emerald: 'hover:bg-emerald-50 dark:hover:bg-emerald-950/20',
  }

  const borderColorMap: Record<string, string> = {
    amber: 'group-hover:border-amber-200 dark:group-hover:border-amber-800',
    violet: 'group-hover:border-violet-200 dark:group-hover:border-violet-800',
    emerald: 'group-hover:border-emerald-200 dark:group-hover:border-emerald-800',
  }

  return (
    <Link href={tool.href} className="group block">
      <article
        className={`
          flex h-full flex-col gap-4 rounded-xl border border-border/30 bg-background p-6
          transition-colors duration-200
          ${accentColorMap[tool.accentColor]}
          ${borderColorMap[tool.accentColor]}
        `}
      >
        {/* アイコン */}
        <div className="flex size-12 items-center justify-center text-4xl">{tool.emoji}</div>

        {/* コンテンツ */}
        <div className="flex flex-1 flex-col gap-2">
          <h2 className="text-base font-semibold tracking-tight text-foreground">{tool.title}</h2>
          <p className="text-xs text-muted-foreground">{tool.description}</p>
        </div>
      </article>
    </Link>
  )
}

/**
 * ツール一覧ページ
 *
 * 利用可能なツールをカードグリッド形式で表示します。
 */
export default async function ToolsPage() {
  return (
    <Container className="flex flex-col items-center gap-12 pt-16">
      <PageHeader title={title} description={description} />

      <div
        className="
          grid w-full max-w-4xl gap-6
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {tools.map((tool) => (
          <ToolCard key={tool.href} tool={tool} />
        ))}
      </div>
    </Container>
  )
}
