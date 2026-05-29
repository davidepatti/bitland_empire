#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

echo "build-electron-apps.sh is a compatibility wrapper; the exam build is the Bitland Empire hub."
exec "$ROOT_DIR/build-electron-hub.sh" "$@"
