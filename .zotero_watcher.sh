#!/usr/bin/env bash

# Configuration
SCRIPT_DIR=$(dirname "$0")
LIBRARY_FILE="$SCRIPT_DIR/.library.json"
SYNC_SCRIPT="$SCRIPT_DIR/.zotero_sync.py" # Ensure this filename matches your Python script

# Dependency Check
if ! command -v inotifywait &>/dev/null; then
  echo "❌ Error: 'inotifywait' not found. Please install 'inotify-tools'."
  echo "   Arch Linux: sudo pacman -S inotify-tools"
  exit 1
fi

if [ ! -f "$SYNC_SCRIPT" ]; then
  echo "❌ Error: Sync script '$SYNC_SCRIPT' not found."
  exit 1
fi

echo "👀 Zotero Watcher started."
echo "📂 Watching file: $LIBRARY_FILE"
echo "🚀 Triggering on change: $SYNC_SCRIPT"
echo "---------------------------------------------------"

# Infinite monitoring loop
while true; do
  # Wait for file close_write event (avoids triggering on partial writes)
  inotifywait -q -e close_write "$LIBRARY_FILE"

  echo "🔄 Changes detected! Starting synchronization..."

  # Run the Python script
  python3 "$SYNC_SCRIPT"

  echo "---------------------------------------------------"
  echo "✅ Synchronization complete. Waiting for new changes..."
done
