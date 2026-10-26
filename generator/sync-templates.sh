#!/bin/bash
# Auto-sync templates-lib with GitHub origin/main.
# Triggered by cron every 2 min. Hard reset to discard any local drift.
set -e
cd /home/USER/automation/templates-lib
NEW=$(git fetch origin 2>&1 | head -3)
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)
if [ "$LOCAL" != "$REMOTE" ]; then
  echo "[$(date -u +%FT%TZ)] sync: $LOCAL -> $REMOTE"
  git reset --hard origin/main
  echo "[$(date -u +%FT%TZ)] done"
fi
