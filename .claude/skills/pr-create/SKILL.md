---
name: pr-create
description: GitHub プルリクエスト作成スキル。ユーザーが「プルリクエスト作成して」「PR を作成して」と言った時に、現在のブランチの git コミット履歴を分析して PR タイトルと説明文を自動生成し、gh pr create コマンドを実行します。
---

# GitHub プルリクエスト作成

## ワークフロー

### 1. 事前確認

コミットされていない変更がないかを確認：

```bash
git status
git diff
git diff --stat
```

**コミットされていない場合の対応**:

1. **main ブランチにいる場合**: 初めにブランチを作成する

   **複数の機能が混在している場合**

   - 機能ごとにブランチを分け、それぞれ PR を作成する

   **ブランチ名の命名規則**:

   - 記号は `-` と `/` のみ使用可（例: `feat/add-login-form`）
   - アルファベット小文字と数字で構成
   - 内容がわかる簡潔な名前をつける

2. 作成したブランチに commit スキルを使用してコミットする

### 2. PR コンテンツを生成

git ログからコミット情報を取得し、以下を生成：

```bash
git log --oneline origin/main..HEAD
```

- **タイトル**: 最初のコミットメッセージの 1 行目（Conventional Commits に従う）
- **説明文**: `references/pr-template.md` に従い、Summary、Changes、Type of Change を含める

### 3. gh pr create を実行

コマンド実行前にブランチが push されているか確認する:

```bash
git branch -vv
```

生成した PR コンテンツで gh pr create コマンドを実行:

```bash
gh pr create --title "タイトル" --body "説明文" --label "ラベル"
```

**ラベルの判定**:

- `client/` 配下のファイルを含む → `--label client`
- `server/` 配下のファイルを含む → `--label server`
- それ以外 → ラベルなし

成功時の出力を確認し、PR URL をユーザーに返す。

### 4. main ブランチに戻る

PR 作成後、特別な指示がない限り main ブランチに戻る：

```bash
git checkout main
```

## PR 説明文の生成

詳細は `references/pr-template.md` を参照。以下のセクションを含める：

- **Summary**: 変更内容の簡潔な説明（1-2 行）
- **Changes**: 変更内容の箇条書き
- **Type of Change**: 変更の種類（例: New Feature, Bug Fix, Refactoring）
- **Related Issues**: 関連する Issue があれば記載

## 重要な注意点

- **PR タイトル・本文は日本語で記述する**（タイトルの type 部分は英語: `feat:`, `fix:` など）
- ベースブランチは自動で `origin/main` を使用
- タイトルは Conventional Commits 形式を維持する
- **Claude Code で生成した旨の記述は追加しない**（例: 「🤖 Generated with Claude Code」などは不要）
