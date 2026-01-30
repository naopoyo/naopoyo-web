# Components リファレンス

このドキュメントは `src/components` 以下に存在する共通 React コンポーネントの一覧です。
新しいコンポーネントを作成する前に、既存の実装がないか確認してください。

## ディレクトリ構造

コンポーネントは**カテゴリ/機能グループ**の 2 階層で配置します。
機能グループは単一のコンポーネントではなく、関連するコンポーネントをまとめた意味のある単位です。

```text
src/components/
├── brands/
│   └── opengraph-image/       # OGP画像生成
├── controls/
│   ├── pagination/             # ページネーション制御
│   └── search-controls/        # 検索コントロール
├── decorations/
│   ├── motion-effects/         # モーション・視覚効果
│   └── scroll-shadow/          # スクロールシャドウ
├── displays/
│   ├── document-details/       # ドキュメント詳細表示
│   └── document-list/          # ドキュメントリスト表示
├── feedback/
│   └── messages/               # メッセージ表示
├── forms/
│   ├── document-controls/      # ドキュメント操作フォーム
│   └── search-controls/        # 検索入力フォーム
├── layouts/
│   ├── app-bars/               # グローバルナビゲーションバー
│   ├── containers/             # ページコンテナ
│   ├── footers/                # フッター
│   └── page-headers/           # ページヘッダー
├── misc/
│   ├── google-analytics/       # Google広告・アナリティクス
│   └── theme-switcher/         # テーマ切り替え
├── navigation/
│   └── links/                  # リンク関連コンポーネント
├── prefabs/
│   ├── bookmark-lists/         # ブックマークリスト
│   ├── site-profiles/          # サイトプロフィール
│   └── tags/                   # タグコンポーネント
├── typography/
│   ├── headings/               # 見出し
│   └── paragraphs/             # 段落
└── ui/                         # shadcn/ui ベースの基本 UI パーツ（直下にファイルを配置）
    ├── button.tsx
    ├── input.tsx
    ├── select.tsx
    └── ...
```

### index.ts の配置ルール

- **カテゴリ直下には index.ts を置かない**
- **機能グループごとに index.ts を作成**し、そこから export する
- インポート時は機能グループから直接インポートする

```tsx
// ✅ Good: 機能グループから直接インポート
import { Pagination } from '@/components/controls/pagination'
import { DocumentList } from '@/components/displays/document-list'
import { ThemeSwitcher } from '@/components/misc/theme-switcher'

// ❌ Bad: カテゴリからインポート（カテゴリ直下に index.ts を置かない）
import { Pagination } from '@/components/controls'
```

### 機能グループの命名規則

- **機能グループ名は基本的に複数形**を使用する（例: `cards`, `containers`, `footers`）
- 将来的にコンポーネントが追加される可能性を考慮した命名とする
- 既存のコードベースには例外もあるが、新規作成時は複数形を優先する

新しいコンポーネントを追加する際は、下記のカテゴリ一覧を参照して適切なカテゴリを選択してください。

## カテゴリ一覧

| カテゴリ      | 配置すべきコンポーネント                                                               |
| ------------- | -------------------------------------------------------------------------------------- |
| `brands`      | OGP画像など、ブランドアイデンティティに関わるコンポーネント                            |
| `controls`    | ページネーション、検索コントロールなど、リストやテーブルを操作する UI                  |
| `decorations` | モーション効果、スクロール影など、視覚的な装飾効果                                     |
| `displays`    | ドキュメント表示、リスト表示など、データを表示するコンポーネント                       |
| `feedback`    | メッセージ表示など、状態やフィードバックを伝える UI                                    |
| `forms`       | フィルタ、ソート、検索入力など、ユーザー入力を受け付ける UI                            |
| `layouts`     | ナビゲーションバー、コンテナ、フッターなど、ページの骨格・構造を定義するコンポーネント |
| `misc`        | Google Analytics、テーマ切替など、特定カテゴリに属さないサイト機能                     |
| `navigation`  | リンク、ナビゲーションなど、ページ間・ページ内の移動を担う UI                          |
| `prefabs`     | ブックマークリスト、タグ、サイトプロフィールなど、特定用途向けに構成した再利用パターン |
| `typography`  | 見出し、段落など、テキスト表示のためのコンポーネント                                   |
| `ui`          | shadcn/ui ベースの基本 UI パーツ。他のコンポーネントの構成要素として使用               |

---

## brands

| ディレクトリ             | 説明                                                                                                                       |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `brands/opengraph-image` | OGP 用動的画像生成。Next.js ImageResponse でソーシャルメディア共有用画像を生成。主なエクスポート: `DocumentOpengraphImage` |

## controls

| ディレクトリ               | 説明                                                               |
| -------------------------- | ------------------------------------------------------------------ |
| `controls/pagination`      | ページネーション UI。`Pagination` を提供。ページ番号と件数を表示。 |
| `controls/search-controls` | 検索コントロール。`SearchInput` を提供。                           |

## decorations

| ディレクトリ                 | 説明                                                                                                              |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `decorations/motion-effects` | モーション・視覚効果コンポーネント。`FlowingGlow`（流れるグロー効果）、`HoverShimmer`（ホバーシマー効果）を提供。 |
| `decorations/scroll-shadow`  | スクロール可能領域にグラデーション影を表示しスクロール方向を視覚化。主なエクスポート: `ScrollShadow`              |

## displays

| ディレクトリ                | 説明                                                                                                                                                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `displays/document-details` | ドキュメント詳細表示。`DocumentHeader`（ドキュメントヘッダー）、`DocumentToc`（目次）、`DocumentDropdownToc`（ドロップダウン目次）、`DocumentEmoji`（絵文字表示）、`DocumentTotalCount`（件数表示）で構成。                           |
| `displays/document-list`    | ドキュメントリスト表示。`DocumentList`（通常リスト）、`AllDocumentList`（全ドキュメント）、`RecentDocumentList`（最近のドキュメント）、`PickupDocumentList`（ピックアップドキュメント）、`DocumentListSkeleton`（スケルトン）で構成。 |

## feedback

| ディレクトリ        | 説明                                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| `feedback/messages` | メッセージ表示。`NotFoundMessage`（未検出メッセージ）を提供。データ0件時の状態フィードバック。 |

## forms

| ディレクトリ              | 説明                                                                                                                                   |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `forms/document-controls` | ドキュメント操作フォーム。`DocumentFilter`（フィルタ）、`SortBySelect`（ソート選択）、`BookmarkFilter`（ブックマークフィルタ）を提供。 |
| `forms/search-controls`   | 検索入力フォーム。`SearchInput`（検索入力フィールド）を提供。                                                                          |

## layouts

| ディレクトリ           | 説明                                                                                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `layouts/app-bars`     | グローバルナビゲーションバー。`NavBar`（メインナビゲーション）、`NavBarMenu`（メニュー）、`NavBarMenuFallback`（フォールバック）を含む。主なエクスポート: `NavBar` |
| `layouts/containers`   | ページレイアウト用コンテナ集。`Container`（基本コンテナ）、`Section`（セクションコンテナ）を提供。                                                                 |
| `layouts/footers`      | フッターコンポーネント。`Footer` を提供。                                                                                                                          |
| `layouts/page-headers` | ページヘッダー。`PageHeader` を提供。                                                                                                                              |

## misc

| ディレクトリ            | 説明                                                                 |
| ----------------------- | -------------------------------------------------------------------- |
| `misc/google-analytics` | Google 広告・アナリティクス。`GoogleAds`、`GoogleAdsScript` を提供。 |
| `misc/theme-switcher`   | テーマ切り替え UI（dark/system/light）。`ThemeSwitcher` を提供。     |

## navigation

| ディレクトリ       | 説明                                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| `navigation/links` | リンク関連コンポーネント。`Link`（Next.js Link ラッパー）、`NextLink`（シンプルな Link ラッパー）を提供。 |

## prefabs

| ディレクトリ             | 説明                                                                                                                                                                   |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prefabs/bookmark-lists` | ブックマークリスト。`BookmarkList`、`BookmarkFilter` で構成。ブックマーク機能の再利用パターン。                                                                        |
| `prefabs/site-profiles`  | サイトプロフィール関連。`Avatar`（アバター）、`Profile`（プロフィール）、`FullProfile`（フルプロフィール）、`SnsList`（SNSリンク）、`SpeechBubble`（吹き出し）で構成。 |
| `prefabs/tags`           | タグコンポーネント集。`SmallTag`（小タグ）、`TagList`（タグリスト）、`ColorCircle`（色サークル）で構成。                                                               |

## typography

| ディレクトリ            | 説明                                                              |
| ----------------------- | ----------------------------------------------------------------- |
| `typography/headings`   | 見出しコンポーネント。`Heading` を提供。h1/h2/h3 バリアント対応。 |
| `typography/paragraphs` | テキスト段落。`Paragraph` を提供。                                |

## ui

| ディレクトリ | 説明                                                                                                                                                                                    |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ui`         | shadcn/ui ベースの基本 UI コンポーネント集。`Button`、`Input`、`Select`、`Skeleton`、`Spinner`、`Pagination`、`ToggleGroup`、`Toggle`、`Tooltip`、`DropdownMenu` など基本パーツを提供。 |
