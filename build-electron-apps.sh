#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required to build the Electron apps." >&2
  exit 1
fi

if [[ ! -x "node_modules/.bin/electron-builder" ]]; then
  echo "Installing shared Electron dependencies..."
  npm install
fi

TOOL_CONFIGS=()
while IFS= read -r config; do
  TOOL_CONFIGS+=("$config")
done < <(find "$ROOT_DIR/tools" -mindepth 2 -maxdepth 2 -name tool.json -print | sort)

if [[ "${#TOOL_CONFIGS[@]}" -eq 0 ]]; then
  echo "No Electron tool manifests found under tools/*/tool.json." >&2
  exit 1
fi

echo "Building Electron apps for macOS, Windows, and Linux..."

for config in "${TOOL_CONFIGS[@]}"; do
  tool_dir="$(dirname "$config")"
  tool_name="$(basename "$tool_dir")"
  echo
  echo "==> $tool_name"
  node scripts/electron/package-tool.js "$tool_dir" --mac --win --linux
done

echo
echo "All Electron app builds finished."
