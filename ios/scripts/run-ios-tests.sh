#!/bin/sh
# Run the native tests on this session's own simulator and DerivedData, so parallel sessions
# never install over each other's app, share personal records, or rebuild the same products.
# Usage: ios/scripts/run-ios-tests.sh [xcodebuild test options…]
#   With no options every test in the Fanggu scheme runs; pass -only-testing:… to narrow it.
#   FANGGU_SIM_NAME         simulator to create or reuse (default: "Fanggu <checkout directory name>")
#   FANGGU_DERIVED_DATA     build directory (default: ios/build/DerivedData, ignored by Git)
# UI tests launch the app with FANGGU_LIBRARY_SCOPE, so records written by tests never reach
# the simulator's real library. Latency assertions may still fail while other builds run.
set -eu
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
UDID=$(sh "$ROOT/ios/scripts/test-device.sh" ensure "${FANGGU_SIM_NAME:-}")
DERIVED=${FANGGU_DERIVED_DATA:-$ROOT/ios/build/DerivedData}
OTHERS=$(pgrep -f '/xcodebuild .* test' | wc -l | tr -d ' ')
if [ "$OTHERS" -gt 0 ]; then
  echo "Note: $OTHERS other xcodebuild test run(s) are active; timing assertions may fail under load." >&2
fi
echo "Testing on simulator $UDID with DerivedData at $DERIVED" >&2
exec xcodebuild -project "$ROOT/ios/Fanggu.xcodeproj" -scheme Fanggu \
  -destination "platform=iOS Simulator,id=$UDID" -derivedDataPath "$DERIVED" \
  -parallel-testing-enabled NO "$@" test
