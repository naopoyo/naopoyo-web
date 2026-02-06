# プロジェクトルール

## コード変更後の検証

プロダクトコード・テストコード（ドキュメント除く）を変更した場合、以下を実行:

- `pnpm prettier --write <file>` と `pnpm eslint --fix <file>` を同時に実行
- `pnpm test:run` で修正ファイルのテスト実行
- `pnpm lint` で lint チェック
- `pnpm tsc` で型チェック

## 言語

コミットメッセージ、TSDoc の記述は原則として日本語にする。

## スキル使用

- テストコードの作成・変更 → スキルを使用
- コミット → スキルを使用

## コーディング規約

- .ts、.tsx ファイルには TSDoc を記述する
- 共通コンポーネント・ユーティリティは以下を参照し、既存のものを使用する
  - @docs/components-reference.md
  - @docs/lib-utils-reference.md
- テストファイルの命名・配置は以下を参照
  - @docs/testing-conventions.md

## デザインコンセプト: Refined Minimalism

UI は装飾を排除し、機能と情報の伝達を最優先する。

- **エフェクト**: グロー、グラデーション背景、派手なシャドウ(`shadow-lg` 等)、`backdrop-blur` は使わない
- **ホバー**: `hover:bg-muted/50` + `transition-colors duration-150` のみ。scale/translate/rotate は使わない
- **アニメーション**: UI 操作時のアニメーションは廃止。機能的フィードバック（スピン、色変化等）のみ保持
- **空間**: `bg-background` / `bg-muted/30` を使用。枠線より余白と背景色で境界を表現
- **色彩**: ベースは白黒。アクセントに amber/violet/emerald を機能別に使い分け
