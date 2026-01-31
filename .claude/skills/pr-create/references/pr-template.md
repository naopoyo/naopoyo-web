# PR 説明文テンプレート

## テンプレート構造

PR 説明文は以下のセクションで構成します：

```markdown
## Summary

変更内容の概要を1-2行で説明します。

## Changes

- 変更内容1
- 変更内容2
- 変更内容3

## Type of Change

該当する項目にチェックをつけます：

- [ ] New Feature
- [ ] Bug Fix
- [ ] Refactoring
- [ ] Documentation
- [ ] Performance Improvement

## Related Issues

関連する Issue がある場合は記載します（例: Closes #123）
```

## 生成のポイント

1. **Summary**: コミットメッセージの本文から抽出するか、変更内容から簡潔に作成
2. **Changes**: コミット履歴から変更したファイルと内容を抽出
3. **Type of Change**: Conventional Commits の type から判定（feat → New Feature、fix → Bug Fix など）
4. **Related Issues**: コミットメッセージに記載されていたら含める

## タイプのマッピング

Conventional Commits の type から自動判定：

- `feat` → New Feature
- `fix` → Bug Fix
- `refactor` → Refactoring
- `docs` → Documentation
- `perf` → Performance Improvement

## 例

```markdown
## Summary

ユーザー認証機能を追加し、ログイン画面の UX を改善しました。

## Changes

- src/auth/login.ts: ログイン認証ロジックを実装
- src/components/LoginForm.tsx: ログインフォームコンポーネントを新規作成
- src/hooks/useAuth.ts: 認証状態管理フックを追加
- src/styles/auth.css: ログイン画面のスタイルを定義

## Type of Change

- [x] New Feature
- [x] Refactoring

## Related Issues

Closes #42
```
