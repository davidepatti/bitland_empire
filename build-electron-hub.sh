#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required to build the Bitland Empire Electron hub." >&2
  exit 1
fi

if [[ ! -x "node_modules/.bin/electron-builder" ]]; then
  echo "Installing shared Electron dependencies..."
  npm install
fi

DEFAULT_PUBLIC_KEY="$ROOT_DIR/private/qmc-public.pem"
if [[ -z "${BITLAND_UNLOCK_PUBLIC_KEY:-}" && -f "$DEFAULT_PUBLIC_KEY" ]]; then
  export BITLAND_UNLOCK_PUBLIC_KEY="$DEFAULT_PUBLIC_KEY"
fi

TARGET_ARGS=("$@")
if [[ "${#TARGET_ARGS[@]}" -eq 0 ]]; then
  TARGET_ARGS=(--mac --win --linux)
fi

echo "Building Bitland Empire Electron hub..."
node scripts/electron/package-hub.js "${TARGET_ARGS[@]}"

echo
echo "Bitland Empire hub build finished."
