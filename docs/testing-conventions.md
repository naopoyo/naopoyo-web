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

## `@/constants` / `@/env` モック

`@/constants` には静的な値のみ（`SITE_NAME`, `SITE_DESC`, `RECENT_DOCS_COUNT`, `TOCBOT_BASE_OPTIONS`）が含まれ、`process.env` を参照しない。そのためブラウザテストでも基本的にモック不要。

テストデータを固定値で制御したい場合のみモックする:

```typescript
vi.mock('@/constants', () => ({
  RECENT_DOCS_COUNT: 10,
}))
```

`@/env` には環境変数由来の値（`isProduction`, `BASE_URL`, `GOOGLE_ADS_CLIENT` 等）が含まれる。これらを使うコンポーネントのテストでは `@/env` をモックする:

```typescript
vi.mock('@/env', () => ({
  isProduction: true,
  GOOGLE_ADS_CLIENT: 'pub-test-client-id',
}))
```

テストで使う定数のみ含めればよい。
