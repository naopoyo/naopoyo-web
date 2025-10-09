# naopoyo-web の依存パッケージ（要約）

以下は `package.json` に記載された依存パッケージの一覧と簡潔な日本語要約です（形式：- パッケージ名
  要約）。

## dependencies

- @hackersheet/core  
  Hackersheet 用のコアユーティリティ／コンポーネント群。ドキュメント描画や専用ツールの基盤になっている可能性が高いです。  
- @hackersheet/next-document-content-components  
  Next.js 向けのドキュメント表示コンポーネント群。ドキュメントページの構成に使われます。  
- @hackersheet/next-document-content-kifu  
  Kifu（棋譜）関連の表示コンポーネント。棋譜を含むドキュメントのレンダリングに利用される想定です。  
- @hackersheet/react-document-content  
  React 用のドキュメント表示コンポーネント群。ドキュメントページで使用されます。  
- @hackersheet/react-document-content-styles  
  Hackersheet コンポーネント向けのスタイル／スタイルユーティリティ。  
- @heroui/scroll-shadow  
  スクロール領域に影を付ける UI ユーティリティ。スクロール可能なコンテナ（サイドバー等）で使われます。  
- @heroui/theme  
  テーマ（トークンや CSS 変数）関連のユーティリティ。アプリ全体の一貫したテーマ管理に使用されます。  
- @next/third-parties  
  Next.js 側のサードパーティ連携用ヘルパー。互換性や最適化に関連する機能を含みます。  
- @radix-ui/react-dropdown-menu  
  アクセシブルなドロップダウンメニューのプリミティブ（ヘッドレスコンポーネント）。  
- @radix-ui/react-select  
  アクセシブルなセレクト（ドロップダウン）プリミティブ。  
- @radix-ui/react-slot  
  コンポーネント合成のための slot ユーティリティ。  
- @radix-ui/react-toggle  
  トグル（スイッチ）プリミティブ。  
- @radix-ui/react-toggle-group  
  トグル群をまとめるためのプリミティブ。  
- @twemoji/api  
  Twemoji（Twitter の絵文字）用のアセット／API ユーティリティ。  
- class-variance-authority  
  Tailwind 等のユーティリティクラスのバリアント管理を型安全に扱うライブラリ。  
- clsx  
  条件付きで CSS クラス名を結合する小さなユーティリティ。  
- date-fns  
  日付操作・フォーマット用の軽量ユーティリティライブラリ。  
- date-fns-tz  
  date-fns のタイムゾーン対応拡張ユーティリティ。  
- katex  
  LaTeX 数式を高速に HTML/SVG にレンダリングするライブラリ。  
- lucide-react  
  Lucide アイコンの React コンポーネント集合。  
- next  
  Next.js フレームワーク本体。  
- next-themes  
  Light / Dark 切替を簡単に実装するユーティリティ（localStorage と連携）。  
- react  
  React 本体。  
- react-dom  
  React の DOM レンダラー。  
- react-icons  
  複数アイコンセットを束ねた React 用アイコンコンポーネント集。  
- shiki  
  VS Code のテーマと文法を使ったシンタックスハイライトライブラリ。Markdown のコードブロック等で利用されることが多いです。  
- tailwind-merge  
  Tailwind のクラス名をマージして競合を解消するユーティリティ。  
- tailwindcss-animate  
  Tailwind 用のアニメーションユーティリティ群。  
- tocbot  
  HTML の見出しから自動で目次（TOC）を生成するライブラリ。  

## devDependencies

- @eslint/eslintrc  
  ESLint の設定読み込み・共有設定を扱うパッケージ。  
- @next/bundle-analyzer  
  Next.js のバンドル解析プラグイン（サイズ可視化に使用）。  
- @tailwindcss/postcss  
  Tailwind を PostCSS 経由で処理するためのプラグイン。  
- @types/node  
  Node.js の TypeScript 型定義。  
- @types/react  
  React の TypeScript 型定義。  
- @types/react-dom  
  React DOM の TypeScript 型定義。  
- dotenv  
  .env ファイルから環境変数を読み込むユーティリティ（ローカル開発時に便利）。  
- eslint  
  JavaScript/TypeScript の静的解析（リンティング）ツール。  
- eslint-config-next  
  Next.js 推奨の ESLint 設定。  
- eslint-config-prettier  
  Prettier と競合する ESLint ルールを無効化する設定。  
- eslint-plugin-better-tailwindcss  
  Tailwind の利用に関する ESLint ルールを提供するプラグイン。  
- eslint-plugin-import  
  import/export の検証やモジュール解決のチェック用プラグイン。  
- eslint-plugin-unused-imports  
  未使用の import を検出・自動削除するプラグイン。  
- npm-check-updates  
  package.json の依存を一括で更新チェックするツール。  
- postcss  
  CSS を処理するためのツールチェイン。Tailwind 等のビルドに利用される。  
- prettier  
  コード整形ツール。  
- sass  
  Sass/SCSS コンパイラ（スタイルの記述に使用）。  
- tailwindcss  
  ユーティリティファースト CSS フレームワーク。  
- tw-animate-css  
  Tailwind と組み合わせて使えるアニメーションユーティリティ集。  
- typescript  
  TypeScript コンパイラと言語ツール。  

---
