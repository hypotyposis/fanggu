#!/bin/sh
# One disposable simulator per session: parallel test runs must never share an app container.
# Usage: ios/scripts/test-device.sh ensure|delete|list [NAME]
#   ensure  create the simulator if missing, boot it, and print its UDID on stdout
#   delete  shut down and delete every simulator with that name
#   list    show the Fanggu simulators and their states
# NAME defaults to $FANGGU_SIM_NAME, then "Fanggu <checkout directory name>", so each worktree
# gets its own device. FANGGU_SIM_DEVICE_TYPE (default "iPhone 16 Pro") picks the hardware;
# the newest installed iOS runtime is used.
set -eu
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
COMMAND=${1:-}
NAME=${2:-${FANGGU_SIM_NAME:-"Fanggu $(basename -- "$ROOT")"}}
DEVICE_TYPE=${FANGGU_SIM_DEVICE_TYPE:-iPhone 16 Pro}

matching_devices() {
  xcrun simctl list devices available -j | node -e '
const name = process.argv[1];
const { devices } = JSON.parse(require("node:fs").readFileSync(0, "utf8"));
for (const list of Object.values(devices)) for (const device of list) if (device.name === name) console.log(`${device.udid} ${device.state}`);
' "$NAME"
}

case "$COMMAND" in
  ensure)
    MATCHES=$(matching_devices)
    COUNT=$(printf '%s\n' "$MATCHES" | grep -c . || true)
    if [ "$COUNT" -gt 1 ]; then
      echo "Several simulators are named '$NAME'; a name destination would be ambiguous. Delete the extras:" >&2
      printf '%s\n' "$MATCHES" >&2
      exit 1
    fi
    if [ "$COUNT" -eq 0 ]; then
      UDID=$(xcrun simctl create "$NAME" "$DEVICE_TYPE")
      echo "Created simulator '$NAME' ($DEVICE_TYPE) $UDID" >&2
    else
      UDID=${MATCHES%% *}
    fi
    xcrun simctl bootstatus "$UDID" -b >/dev/null
    echo "$UDID"
    ;;
  delete)
    MATCHES=$(matching_devices)
    if [ -z "$MATCHES" ]; then
      echo "No simulator named '$NAME'" >&2
      exit 0
    fi
    printf '%s\n' "$MATCHES" | while read -r UDID STATE; do
      [ "$STATE" = "Shutdown" ] || xcrun simctl shutdown "$UDID" >/dev/null 2>&1 || true
      xcrun simctl delete "$UDID"
      echo "Deleted simulator '$NAME' $UDID" >&2
    done
    ;;
  list)
    xcrun simctl list devices available | grep -E "^\s+Fanggu " || echo "No Fanggu simulators" >&2
    ;;
  *)
    sed -n '2,9p' "$0" | sed 's/^# \{0,1\}//' >&2
    exit 2
    ;;
esac
