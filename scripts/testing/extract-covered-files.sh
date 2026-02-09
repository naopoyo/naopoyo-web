#!/usr/bin/env bash
#
# coverage-summary.json からカバレッジ対象ファイルの相対パスを抽出する
#
# Usage:
#   scripts/testing/extract-covered-files.sh [coverage-summary.json のパス]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

COVERAGE_FILE="${1:-coverage/coverage-summary.json}"
COVERAGE_PATH="$PROJECT_ROOT/$COVERAGE_FILE"

if [[ ! -f "$COVERAGE_PATH" ]]; then
  echo "Error: $COVERAGE_PATH が見つかりません" >&2
  echo "先に pnpm test:run --coverage を実行してください" >&2
  exit 1
fi

jq -r "keys[] | select(. != \"total\" and . != \"$PROJECT_ROOT\")" "$COVERAGE_PATH" \
  | sed "s|^$PROJECT_ROOT/||"
