# naopoyo-web

Next.js（App Router）で構築したブログサイトのリポジトリ。公開サイト: [https://naopoyo.com/](https://naopoyo.com/)

## ローカル実行

依存をインストール:

```bash
pnpm install
```

初期設定（ローカル）:

```bash
pnpm local:setup
```

このコマンドで以下が生成されます:

- `.vscode/settings.json`
- `.env.development.local`
- `.env.production.local`

開発用環境変数の例（`.env.development.local`）:

```ini:.env.development.local
HACKERSHEET_API_ENDPOINT=https://api.hackersheet.com/example/v1/graphql
HACKERSHEET_API_ACCESS_KEY=hsws_TVZ6MjdnMUNrWXdyRjZ5SEZSOFp3OWVXS0ZiR3lHSFE6akdzVzQ5WlRhc0RwRm1ZWGRpZWl5aHZpM2ZtSlhSOG42ZExEbWZMQXd1c2dwdXZ0
HACKERSHEET_GITHUB_REPO_FULL_NAME=hackersheet/hackersheet-example-contents
GOOGLE_TAG_ID=
NEXT_PUBLIC_DOMAIN=localhost:3000
```

主な変数:

- `HACKERSHEET_API_ENDPOINT` — コンテンツAPIのエンドポイント（例を使用可）
- `HACKERSHEET_API_ACCESS_KEY` — APIアクセスキー（例を使用可）
- `HACKERSHEET_GITHUB_REPO_FULL_NAME` — コンテンツを管理するGitHubリポジトリ名
- `GOOGLE_TAG_ID` — GoogleタグID（任意）
- `NEXT_PUBLIC_DOMAIN` — 公開ドメイン（開発時は `localhost:3000`）

開発サーバー起動:

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。
