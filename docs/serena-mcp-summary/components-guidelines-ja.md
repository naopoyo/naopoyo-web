# コンポーネント コーディング規約（日本語）

このドキュメントは、`src/components` にある既存コンポーネント（例：`Avater`, `DocumentList`, `NavBar`, `Button`, `SmallTag`）の実装パターンを分析して作成したコーディング規則のガイドラインです。プロジェクトに合わせた一貫性のあるコンポーネント実装を促すための実践的な指針を日本語でまとめています。

## 目的

- 再利用しやすく、可読性の高いコンポーネントを作る
- Next.js / TypeScript / Tailwind（ユーティリティクラス）を使った実装規則を揃える
- Props 型定義、エクスポート方針、スタイル管理、アクセシビリティのベストプラクティスを示す

## 目次

1. ファイルとエクスポート
2. 型と Props の定義
3. JSX / レンダリングパターン
4. スタイル（Tailwind / CVA / ユーティリティ）
5. 画像・リンクの扱い
6. テスト・ドキュメント化の簡単な推奨
7. 例外と注意点

---

## 1. ファイルとエクスポート

- コンポーネントファイルは `src/components/<component>/<file>.tsx` に配置する。関連する小さなサブコンポーネント（例：`color-circle`）は同ディレクトリ内に置く。
- 可能ならデフォルトエクスポートを使用する（既存コードでは `export default function` がよく使われている）。ただし、ユーティリティ（例：`buttonVariants`）や複数エクスポートがある場合は名前付きエクスポートを併用する。
  - 例: `export default function Avater(...)` と `export { Button, buttonVariants }`。
- コンポーネントのファイル名は小文字ハイフン区切り（`small-tag.tsx`）など既存のスタイルに倣う。

## 2. 型と Props の定義

- 基本方針: `type` を優先して使用する。`interface` は、`type` だけでは表現できない特殊な拡張（宣言マージが必要なケースなど）がある場合に限り使用する。
  - 理由: `type` はユニオンや交差型、条件型など柔軟な型表現が可能で、既存のパターン（`React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>` や `Document` のような外部型の組み合わせ）と相性が良い。
- 具体例:
  - `export type AvaterProps = { size: 'xs' | 'sm' | 'base' | 'lg' }`
  - 汎用コンポーネントの型結合例: `type ButtonProps = React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>`
- 補足:
  - 外部の型（API レスポンスやライブラリの型）は引き続き `import type` を使って取り込む。
  - デフォルト値は関数内で設定するか、受け渡し側で行う。小さなユーティリティマップ（`sizeMap`）はコンポーネント内に定義して良い。
  - `interface` を使うのは、ライブラリ向けの公開 API で意図的に宣言マージを利用するなど、`type` で実現できないケースに限定する。

## 3. JSX / レンダリングパターン

- 必要な場合は非同期コンポーネント（`export default async function`）を使用してサーバーサイドのデータ取得を行う。例: `DocumentList` は `async` で props に受け取ったドキュメント配列を描画している。
- リストレンダリングでは `key` を必ず付ける（`document.id` のような安定 ID を使用）。
- 条件分岐（プレビュー画像の有無など）はテンプレート内でシンプルに分ける。難しいロジックは別関数に切り出す。
- ルーティングは `next/link` を利用し、`<Link href="...">` に `className` を直接指定してスタイルを付与する。

## 4. スタイル（Tailwind / CVA / ユーティリティ）

- プロジェクトは Tailwind CSS を中心にユーティリティクラスを使用している。クラス名はテンプレートリテラルで複数行に分けて整形するスタイルが採用されている。
- 共通のバリアントや複数クラスロジックには `class-variance-authority (cva)` と組み合わせたユーティリティを使う（`buttonVariants` の例）。
  - variants を定義して `cn(buttonVariants(...))` のように組み合わせて使用する。
- 小さな UI ルール:
  - コンポーネントは可能な限り `rounded`, `border`, `bg-*`, `text-*` を組み合わせて UI を作る。
  - ホバーやフォーカスのスタイルもクラスで明示（`hover:`, `focus-visible:`）する。
- 画像コンポーネントのクラス（例: `rounded-full border object-cover`）はアクセントやレスポンシブに配慮する。

## 5. 画像・リンクの扱い

- 画像は `next/image` を使用。ローカル画像は `import` して `src` に渡す。外部画像は適切な `width`/`height` と `loading="lazy"` を付ける。
- `alt` 属性は明確に指定する（`alt="Avater"` のように）。
- リンクには `next/link` を使用し、アクセシビリティを保つためにテキストコンテンツや適切な aria 属性を含める。

## 6. テスト・ドキュメント化の簡単な推奨

- 簡単なスナップショットテストやレンダリングのユニットテストを追加することを推奨。特に Props バリエーション（サイズ、variant）や条件分岐に対するテストを用意する。
- 各コンポーネントのトップに短い TSDoc（日本語で記載）を入れて、役割と主要 props を記載すると探索性が上がる。TSDoc を使うことでエディタの補完や型情報が充実し、ドキュメント化が容易になります。

## 7. 例外と注意点

- デフォルトエクスポートと名前付きエクスポートが混在しているため、移行時は参照元を壊さないよう注意する。
- 大きなロジック（API 呼び出し、複雑な計算）はコンポーネント外に分離する（`/lib` や `/utils` に置く）。
- className の結合は `cn`（プロジェクトのユーティリティ）を使うと一貫性が出る。

---

## ドキュメンテーション：TSDoc コメントの必須化

- 目的: エディタ補完、API の探しやすさ、公開コンポーネントの安定した利用を確保するため、公開（export された）コンポーネントおよび `export` された `type` 定義には TSDoc による詳細なコメントを必須とします。
- 範囲: `src/components` 配下のコンポーネント（デフォルトエクスポート）と、外部に公開される/他モジュールで参照される `export type`。
- 最低限の必須タグ（推奨順）:
  - コンポーネント: 概要、`@param`（主要 props または `props`）、`@returns`（JSX の説明）、`@example`（簡単な使用例）
  - 型（type）: 概要、各フィールドの説明（型ごとに短い説明）

- 例（コンポーネント）:

  ```ts
  /**
   * Avatar コンポーネント - ユーザーのプロフィール画像を表示する
   *
   * @param props - AvatarProps
   * @param props.size - 表示サイズ ('xs' | 'sm' | 'base' | 'lg')
   * @returns ユーザーのアバターを表す JSX
   * @example
   * <Avatar size="sm" src={user.image} alt={user.name} />
   */
  export default function Avatar(props: AvatarProps) {
    /* ... */
  }
  ```

- 例（型）:

  ```ts
  /**
   * Avatar の Props
   *
   * size - 描画するアバターのサイズを指定する
   */
  export type AvatarProps = {
    size: 'xs' | 'sm' | 'base' | 'lg'
    src?: string
    alt?: string
  }
  ```

- 運用上の注意:
  - PR では、公開コンポーネントや exported type に TSDoc が揃っていることを確認すること。レビュー時に未記載のフィールドや不十分な説明を指摘してください。
  - 自動検出には `eslint`（`eslint-plugin-jsdoc`/`eslint-plugin-tsdoc` 等）や `TypeDoc` を導入することを検討すると良いです。

### 特記事項の扱い（TSDoc リスト化を標準とする）

- ルール: 重要な実装上の注意やコンポーネント固有の特記事項は、コード内の行コメント（// や `/* */`）ではなく、公開コンポーネントの TSDoc コメント内にリスト（箇条書き）として記載することを標準とします。

- 理由:
  - TSDoc に書くことでエディタ上で補完やインラインドキュメントとして表示され、利用者やレビュワーにとって参照しやすくなります。
  - 行コメントはファイルローカルに埋もれやすく、外部からの参照時に見落とされることがあります。
  - 自動生成ドキュメント（TypeDoc 等）に含める際、TSDoc にまとまっている方が出力整形やパースが容易です。

- 書き方ガイドライン:
  - TSDoc の本文中に「特記事項」セクションを作り、箇条書き（`-` または `*`）で列挙する。
  - 各項目は短く、何を問題にするのか、回避策や推奨される代替案を明示する。
  - 可能であれば `@note` や `@remarks` を使って意味付けを行う（プロジェクトの TSDoc ルールに合わせて選択）。

- 例:

```ts
/**
 * DocumentEmoji コンポーネント - Twemoji を使って絵文字を SVG 表示するコンポーネント
 *
 * @param props - DocumentEmojiProps
 * @returns 絵文字を表す JSX
 *
 * 特記事項:
 * - 表示サイズは design token の `size-18`（72px）を使用します。
 * - Twemoji の `toCodePoint` は複数コードポイントを返すことがあるため、ハイフン以降を切り捨てる処理を行っています。
 */
export default function DocumentEmoji(props: DocumentEmojiProps) {
  /* ... */
}
```

- 運用上のヒント:
  - PR レビュー時に「特記事項が TSDoc に記載されているか」をチェックリストに追加してください。

## 実装チェックリスト（PR に使える簡易チェック）

- [ ] Props に型が定義されている
- [ ] key に安定した ID を使っている（リスト）
- [ ] 画像に width/height/alt がある
- [ ] Tailwind クラスは冗長でないか（cva を使える箇所は cva を検討）
- [ ] アクセシビリティ（フォーカス、aria）が考慮されている
- [ ] テストまたは JSDoc がある

## 次の改善提案（任意）

- `components/README.md` にコンポーネント作成テンプレート（厳密なファイル雛形）を追加する。
- `lint` ルール（eslint-plugin-react, jsx-a11y）でアクセシビリティの自動検出を強化する。
- `storybook` を導入して UI を可視化し、バリアントを文書化する。

---

作成元コンポーネント（抜粋）:

- `src/components/avatar/avatar.tsx`
- `src/components/document/document-list.tsx`
- `src/components/nav-bar/nav-bar.tsx`
- `src/components/ui/button.tsx`
- `src/components/tag/small-tag.tsx`

このファイルは `docs/serena-mcp-summary` に配置されています。必要なら内容を調整して英語版やテンプレート化も作成できます。
