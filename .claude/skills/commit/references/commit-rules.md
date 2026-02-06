# コミットメッセージルール

Conventional Commits 形式。

```text
<type>(<scope>): <説明>
```

## プロジェクト固有ルール

### タイプ

- タイプは変更の性質ではなく**変更対象**で判断する。テストファイルの変更は内容に関わらず `test`、プロダクトコードのリファクタリングのみ `refactor`

### スコープ

- kebab-case の英単語（例: `commit-skill`, `user-profile`）
- ファイルパスではなく意味のある名前を使う
- 可能な限り一つ

### 本文

- **原則として本文を含める**
- 変更の理由・影響範囲、変更したファイルと具体的な変更内容を記述
- 省略可能: サマリーで変更内容が完全に説明できている場合のみ（例: 単純な誤字修正）

## 例

```text
feat(tools): rem / px 変換ツールを追加

- src/components/RemPxConverter.tsx: 変換UIコンポーネントを新規作成
- src/lib/convert.ts: rem/px相互変換のユーティリティを追加
```

```text
fix(typo): README.mdの誤字を修正
```
