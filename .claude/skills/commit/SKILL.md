---
name: commit
description: プロジェクトのコミットメッセージルールに従ってコミットを作成します。Conventional Commits 形式を使用し、ステージされた変更を分析して適切なメッセージを自動生成します。ユーザーが「コミットして」「変更をコミット」「ステージしたファイルをコミット」などと言った場合や、git の変更をコミットする必要がある状況で使用してください。
---

# コミット作成スキル

## 実行フロー

1. `git status` と `git diff --staged`（ステージされていない場合は `git diff`）で変更内容を確認する
2. 変更が複数のスコープにまたがる場合はコミットを分割する
3. [commit-rules.md](references/commit-rules.md) を読み、ルールに従ってコミットメッセージを作成する
4. 必要に応じて `git add` でファイルをステージし、`git commit` を実行する

## 注意事項

- 過去のコミット履歴ではなく、常に commit-rules.md のルールに従う
- Co-Authored-By は付けない
