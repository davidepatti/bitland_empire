#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd -- "$SCRIPT_DIR/.." && pwd)"
BUILD_ROOT="$(mktemp -d "${TMPDIR:-/tmp}/mips64-pipeline-build.XXXXXX")"
STAGE_DIR="$BUILD_ROOT/source"

cleanup() {
  rm -rf "$BUILD_ROOT"
}
trap cleanup EXIT

mkdir -p "$STAGE_DIR"

copy_source() {
  cp -p "$PROJECT_DIR/index.html" "$STAGE_DIR/"
  cp -p "$PROJECT_DIR/styles.css" "$STAGE_DIR/"
  cp -p "$PROJECT_DIR/app.js" "$STAGE_DIR/"
  cp -p "$PROJECT_DIR/pipeline_diagram.png" "$STAGE_DIR/"
  cp -p "$PROJECT_DIR/electron-main.js" "$STAGE_DIR/"
  cp -p "$PROJECT_DIR/package.json" "$STAGE_DIR/"
  cp -p "$PROJECT_DIR/launch.sh" "$STAGE_DIR/"

  if [[ -f "$PROJECT_DIR/package-lock.json" ]]; then
    cp -p "$PROJECT_DIR/package-lock.json" "$STAGE_DIR/"
  fi

  mkdir -p "$STAGE_DIR/scripts"
  cp -p "$PROJECT_DIR/scripts/after-pack.js" "$STAGE_DIR/scripts/"
  cp -p "$PROJECT_DIR/scripts/package-electron.sh" "$STAGE_DIR/scripts/"
}

copy_source

cd "$STAGE_DIR"

export ELECTRON_CACHE="$BUILD_ROOT/cache/electron"
export ELECTRON_BUILDER_CACHE="$BUILD_ROOT/cache/electron-builder"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required to package the Electron app." >&2
  exit 1
fi

if [[ ! -f package-lock.json ]]; then
  npm install
elif [[ ! -d node_modules ]]; then
  npm ci
else
  npm install
fi

npm run check

if command -v xattr >/dev/null 2>&1; then
  xattr -cr "$STAGE_DIR"
fi

npm run dist

rm -rf "$PROJECT_DIR/release"
mkdir -p "$PROJECT_DIR/release"
find "$STAGE_DIR/release" -maxdepth 1 -type f -exec cp -p {} "$PROJECT_DIR/release/" \;

echo
echo "Packages written to:"
echo "$PROJECT_DIR/release"
