# テスト規約

テスト対象と同階層の `__tests__/` に配置。ファクトリーのみ `tests/factories/`。

| 種別 | 命名 | 用途 |
|------|------|------|
| ユニット | `<name>.unit.test.ts` | ロジック中心。Node 環境 |
| ブラウザ | `<name>.browser.test.tsx` | コンポーネント・Hooks。Playwright 環境 |
| ファクトリー | `<name>.ts` | テストデータ生成 |

```text
src/actions/
  get-picup-slugs.ts
  __tests__/get-picup-slugs.unit.test.ts
src/hooks/
  use-tocbot.ts
  __tests__/use-tocbot.browser.test.tsx
```
