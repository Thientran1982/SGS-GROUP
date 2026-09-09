#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

# Keep the merge hook deterministic and non-interactive.
npm ci --no-audit --no-fund
npm run build