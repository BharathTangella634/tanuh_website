#!/usr/bin/env bash
# dc-rebuild.sh — Stop, remove, build, and start (up -d) a docker compose service
# Usage:
#   ./dc-rebuild.sh              # apply to all services in docker-compose.yml
#   ./dc-rebuild.sh web          # apply only to the "web" service
#   ./dc-rebuild.sh <service>    # apply to a specific service
#
# Notes:
# - Run from the repository root (where docker-compose.yml lives).
# - Requires Docker and docker compose (v2+) installed.
set -euo pipefail

# Ensure docker-compose.yml exists in current directory
if [[ ! -f "docker-compose.yml" ]]; then
  echo "Error: docker-compose.yml not found in current directory: $(pwd)" >&2
  exit 1
fi

# Verify docker compose availability
if ! command -v docker >/dev/null 2>&1; then
  echo "Error: docker CLI not found in PATH" >&2
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Error: 'docker compose' (v2) not available. Please install/update Docker." >&2
  exit 1
fi

SERVICE=${1:-}

set -x
# Stop containers (service-specific if provided)
if [[ -n "$SERVICE" ]]; then
  docker compose stop "$SERVICE" || true
else
  docker compose stop || true
fi

# Remove stopped containers
if [[ -n "$SERVICE" ]]; then
  docker compose rm -f "$SERVICE" || true
else
  docker compose rm -f || true
fi

# Build images
if [[ -n "$SERVICE" ]]; then
  docker compose build "$SERVICE"
else
  docker compose build
fi

# Start containers in detached mode
if [[ -n "$SERVICE" ]]; then
  docker compose up -d "$SERVICE"
else
  docker compose up -d
fi
set +x

echo "Done."