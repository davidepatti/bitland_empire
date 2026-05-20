#!/bin/zsh

set -euo pipefail

APP_DIR="${0:A:h}"
cd "$APP_DIR"

if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3 is required to launch qmc-sim."
  echo "Install Python 3, then run this launcher again."
  read -r "?Press Enter to close..."
  exit 1
fi

START_PORT="${QMC_SIM_PORT:-8000}"
PORT="$START_PORT"

while lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; do
  PORT=$((PORT + 1))
  if [ "$PORT" -gt $((START_PORT + 99)) ]; then
    echo "Could not find a free port from $START_PORT to $((START_PORT + 99))."
    read -r "?Press Enter to close..."
    exit 1
  fi
done

URL="http://127.0.0.1:${PORT}/index.html"

echo "Launching qmc-sim"
echo "Folder: $APP_DIR"
echo "URL:    $URL"
echo
echo "Keep this window open while using the app."
echo "Press Ctrl-C here to stop the local server."
echo

if command -v open >/dev/null 2>&1; then
  open "$URL"
fi

python3 -m http.server "$PORT" --bind 127.0.0.1
