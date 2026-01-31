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
  /** アクセントカラー（Tailwindクラス） */
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
    accentColor: 'from-amber-500/20 to-orange-500/20',
  },
  {
    href: '/tools/rem-px-converter',
    title: 'rem / px 変換',
    description: 'CSSの単位をリアルタイムで相互変換',
    emoji: '📐',
    accentColor: 'from-violet-500/20 to-indigo-500/20',
  },
  {
    href: '/tools/english-vocabulary',
    title: '英単語クイズ',
    description: '英単語の意味を4択で学習',
    emoji: '📚',
    accentColor: 'from-emerald-500/20 to-teal-500/20',
  },
]

/**
 * ツールカードコンポーネント
 *
 * 各ツールへのリンクをカード形式で表示します。
 * ホバー時にアニメーション効果が適用されます。
 */
function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={tool.href} className="group block">
      <article
        className={`
          relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border/50
          bg-card/80 p-6 backdrop-blur-sm transition-all duration-300
          hover:border-foreground/15
        `}
      >
        {/* グラデーション背景エフェクト */}
        <div
          className={`
            pointer-events-none absolute inset-0 bg-linear-to-br
            ${tool.accentColor}
            opacity-0 transition-opacity duration-300
            group-hover:opacity-100
          `}
          aria-hidden="true"
        />

        {/* アイコン */}
        <div
          className={`
            relative flex size-14 items-center justify-center rounded-xl border border-border/30
            bg-background/50 text-3xl transition-transform duration-300
            group-hover:scale-110
          `}
        >
          {tool.emoji}
        </div>

        {/* コンテンツ */}
        <div className="relative flex flex-1 flex-col gap-2">
          <h2
            className={`
              text-lg font-semibold tracking-tight text-foreground transition-colors duration-300
              group-hover:text-foreground/90
            `}
          >
            {tool.title}
          </h2>
          <p className="text-sm/relaxed text-muted-foreground">{tool.description}</p>
        </div>

        {/* 矢印インジケーター */}
        <div
          className={`
            absolute top-4 right-4 text-muted-foreground/40 transition-all duration-300
            group-hover:translate-x-1 group-hover:text-foreground/60
          `}
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
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
        className={`
          grid w-full max-w-3xl gap-4
          sm:grid-cols-2
          lg:grid-cols-3
        `}
      >
        {tools.map((tool) => (
          <ToolCard key={tool.href} tool={tool} />
        ))}
      </div>
    </Container>
  )
}
