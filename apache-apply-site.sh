#!/usr/bin/env bash
# apache-apply-site.sh — Install an Apache vhost .conf, check syntax, and reload Apache
#
# Usage:
#   sudo ./apache-apply-site.sh                                   # uses default conf path below
#   sudo ./apache-apply-site.sh deploy/apache/bc-screener-research.conf
#   sudo ./apache-apply-site.sh /path/to/your-site.conf
#
# What it does (Ubuntu/Debian with apache2):
#   1) Copies the given .conf to /etc/apache2/sites-available/
#   2) Enables the site with a2ensite <name>
#   3) Validates Apache config: apache2ctl -t
#   4) Reloads Apache: systemctl reload apache2
#
# Notes:
# - Requires root privileges. Run with sudo or as root.
# - Designed for Debian/Ubuntu (apache2, a2ensite). For other distros, adapt as needed.
# - By default, it uses deploy/apache/bc-screener-research.conf from this repo.

set -euo pipefail

DEFAULT_SRC="deploy/apache/bc-screener-research.conf"
SRC_CONF_PATH="${1:-$DEFAULT_SRC}"

# Ensure source file exists
if [[ ! -f "$SRC_CONF_PATH" ]]; then
  echo "Error: Source conf not found: $SRC_CONF_PATH" >&2
  exit 1
fi

# Require root or sudo
if [[ ${EUID:-$(id -u)} -ne 0 ]]; then
  if command -v sudo >/dev/null 2>&1; then
    SUDO="sudo"
  else
    echo "Error: This script must run as root or with sudo." >&2
    exit 1
  fi
else
  SUDO=""
fi

# Check required commands
need_cmds=(apache2ctl a2ensite systemctl)
for c in "${need_cmds[@]}"; do
  if ! command -v "$c" >/dev/null 2>&1; then
    echo "Error: Required command not found: $c" >&2
    exit 1
  fi
done

SITE_BASENAME="$(basename "$SRC_CONF_PATH")"           # e.g., bc-screener-research.conf
SITE_NAME="${SITE_BASENAME%.conf}"                       # e.g., bc-screener-research
TARGET_DIR="/etc/apache2/sites-available"
TARGET_PATH="$TARGET_DIR/$SITE_BASENAME"

echo "Installing Apache site configuration"
echo "  Source : $SRC_CONF_PATH"
echo "  Target : $TARGET_PATH"
echo "  Sitename: $SITE_NAME"

# Create target dir if missing
$SUDO mkdir -p "$TARGET_DIR"

# Copy the file
$SUDO cp "$SRC_CONF_PATH" "$TARGET_PATH"

# Enable the site (idempotent)
echo "Enabling site: $SITE_NAME"
if ! $SUDO a2ensite "$SITE_NAME"; then
  echo "Warning: a2ensite reported a non-zero exit. Continuing to test config." >&2
fi

# Test Apache configuration before reloading
echo "Checking Apache configuration syntax (apache2ctl -t)"
$SUDO apache2ctl -t

# Reload Apache
echo "Reloading Apache (systemctl reload apache2)"
$SUDO systemctl reload apache2

echo "Done. Site '$SITE_NAME' is installed and Apache reloaded."