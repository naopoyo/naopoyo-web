# naopoyo-web

App Routerを使ったNext.jsで構築したブログサイトのリポジトリです。[naopoyo.com](https://naopoyo.com/)で実際に動作しているものを見ることができます。

## ローカル環境で実行する

ローカル環境で動かしてみたい場合は、以下の手順で環境構築を行なってください。

### インストール

```bash
pnpm install
```

### ローカル環境セットアップスクリプトの実行

```bash
pnpm local:setup
```

コマンドの実行後に以下のファイルが生成されます。

- `/.vscode/settings.json`
- `/.env.development.local`
- `/.env.production.local`

### 環境変数の設定

`.env.development.local` に以下の例ように値を設定します。

```ini
HACKERSHEET_API_ENDPOINT=https://api.hackersheet.com/example/v1/graphql
HACKERSHEET_API_ACCESS_KEY=hsws_TVZ6MjdnMUNrWXdyRjZ5SEZSOFp3OWVXS0ZiR3lHSFE6akdzVzQ5WlRhc0RwRm1ZWGRpZWl5aHZpM2ZtSlhSOG42ZExEbWZMQXd1c2dwdXZ0
HACKERSHEET_GITHUB_REPO_URL=https://github.com/hackersheet/hackersheet-example-contents
HACKERSHEET_GITHUB_REPO_FULL_NAME=hackersheet/hackersheet-example-contents
GOOGLE_TAG_ID=
NEXT_PUBLIC_DOMAIN=localhost:3000
```

| キー                                | 説明                                                                                                |
| ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| `HACKERSHEET_API_ENDPOINT`          | コンテンツデータAPIのエンドポイントです。例の値はデモ用なのでそのまま使用可能です。                 |
| `HACKERSHEET_API_ACCESS_KEY`        | コンテンツデータAPIのアクセスキーです。例の値はデモ用なのでそのまま使用可能です。                   |
| `HACKERSHEET_GITHUB_REPO_URL`       | コンテンツデータを管理しているGitHubリポジトリのURLです。例の値はデモ用なのでそのまま使用可能です。 |
| `HACKERSHEET_GITHUB_REPO_FULL_NAME` | コンテンツデータを管理しているGitHubリポジトリ名です。例の値はデモ用なのでそのまま使用可能です。    |
| `GOOGLE_TAG_ID`                     | Google AnalyticsのためのGoogle Tag IDです。                                                         |
| `NEXT_PUBLIC_DOMAIN`                | ローカル環境を localhost:3000 で動作させる場合は変更不要です。                                      |

### ローカルサーバーを起動

```bash
pnpm dev
```

[localhost:3000](http://localhost:3000)で実行されます。
