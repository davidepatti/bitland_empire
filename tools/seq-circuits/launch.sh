#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [[ ! -f "index.html" ]]; then
  echo "index.html not found in $SCRIPT_DIR" >&2
  exit 1
fi

if command -v python3 >/dev/null 2>&1; then
  PYTHON_BIN="python3"
elif command -v python >/dev/null 2>&1; then
  PYTHON_BIN="python"
else
  echo "Python is required to serve Sequential Circuits locally." >&2
  exit 1
fi

PORT="${1:-4176}"
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

URL="http://${HOST}:${PORT}/index.html"

echo "Starting Sequential Circuits"
echo "URL: $URL"
echo "Press Ctrl-C to stop."

if command -v open >/dev/null 2>&1; then
  open "$URL" >/dev/null 2>&1 || true
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$URL" >/dev/null 2>&1 || true
fi

exec "$PYTHON_BIN" -m http.server "$PORT" --bind "$HOST"
