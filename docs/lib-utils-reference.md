# lib / utils リファレンス

このドキュメントは `src/lib` および `src/utils` 以下に存在するユーティリティモジュールの一覧です。

## lib と utils の使い分け

| 配置先  | 基準                                                                             |
| ------- | -------------------------------------------------------------------------------- |
| `lib`   | 外部サービス連携、設定済みライブラリインスタンス、複雑なロジックを含むモジュール |
| `utils` | 単純なヘルパー関数。外部依存が少なく、単一の責務を持つ純粋関数                   |

---

## lib

| ファイル                                           | 説明                                                   |
| -------------------------------------------------- | ------------------------------------------------------ |
| `hackersheet/client.ts`                            | Hackersheet API クライアントのシングルトンインスタンス |
| `hackersheet/index.ts`                             | hackersheet モジュールのエントリポイント               |
| `hackersheet/style.ts`                             | Hackersheet 関連のスタイル定義                         |
| `hackersheet/components/document-content.tsx`      | ドキュメントコンテンツを表示するコンポーネント         |
| `hackersheet/utils/make-website-query.ts`          | ウェブサイト検索クエリを構築するヘルパー関数           |
| `hackersheet/utils/make-after-cursor-from-page.ts` | ページ番号からカーソル文字列を生成するヘルパー関数     |
| `shadcn-utils.ts`                                  | Tailwind CSS クラス名を結合・マージするユーティリティ  |
| `string-to-color-with-frame.ts`                    | 文字列から安定したカラーコードと枠色を生成             |

---

## utils

| ファイル                | 説明                                           |
| ----------------------- | ---------------------------------------------- |
| `index.ts`              | utils モジュールのエントリポイント             |
| `create-date-format.ts` | 日付フォーマット関数を生成（タイムゾーン対応） |
| `get-favicon-url.ts`    | ドメインから favicon URL を生成                |
| `is-url.ts`             | 文字列が有効な URL かどうかを判定              |
| `time-ago.tsx`          | 日付文字列を相対時間（「〜前」形式）に変換     |
