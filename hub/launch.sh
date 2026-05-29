#!/usr/bin/env bash
set -euo pipefail

HUB_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd -- "$HUB_DIR/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -f "hub/index.html" ]]; then
  echo "hub/index.html not found in $ROOT_DIR" >&2
  exit 1
fi

if command -v python3 >/dev/null 2>&1; then
  PYTHON_BIN="python3"
elif command -v python >/dev/null 2>&1; then
  PYTHON_BIN="python"
else
  echo "Python is required to serve Bitland Empire locally." >&2
  exit 1
fi

PORT="${1:-${BITLAND_HUB_PORT:-4173}}"
HOST="127.0.0.1"

while ! "$PYTHON_BIN" - "$HOST" "$PORT" <<'PY' >/dev/null 2>&1
import socket
import sys

host = sys.argv[1]
port = int(sys.argv[2])
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
    sock.bind((host, port))
PY
do
  PORT=$((PORT + 1))
done

URL="http://${HOST}:${PORT}/hub/index.html"

echo "Starting Bitland Empire browser hub"
echo "URL: $URL"
echo "Press Ctrl-C to stop."

if command -v open >/dev/null 2>&1; then
  open "$URL" >/dev/null 2>&1 || true
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$URL" >/dev/null 2>&1 || true
fi

exec "$PYTHON_BIN" -m http.server "$PORT" --bind "$HOST"
