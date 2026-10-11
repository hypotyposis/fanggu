#!/bin/sh
# Run the native tests on this session's own simulator and DerivedData, so parallel sessions
# never install over each other's app, share personal records, or rebuild the same products.
# Usage: ios/scripts/run-ios-tests.sh [xcodebuild test options…]
#   With no options every test in the Fanggu scheme runs; pass -only-testing:… to narrow it.
#   FANGGU_SIM_NAME         simulator to create or reuse (default: "Fanggu <checkout directory name>")
#   FANGGU_DERIVED_DATA     build directory (default: ios/build/DerivedData, ignored by Git)
#   FANGGU_TEST_ACTION      test (default) | build-for-testing | test-without-building, to compile
#                           once and then pick test cases without rebuilding
#   FANGGU_PARALLEL_TESTS   1 runs UI test classes in parallel on clones of the simulator;
#                           FANGGU_PARALLEL_WORKERS (default 2) caps the number of clones
# UI tests launch the app with FANGGU_LIBRARY_SCOPE, so records written by tests never reach
# the simulator's real library. Latency assertions may still fail while other builds run.
set -eu
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
UDID=$(sh "$ROOT/ios/scripts/test-device.sh" ensure "${FANGGU_SIM_NAME:-}")
DERIVED=${FANGGU_DERIVED_DATA:-$ROOT/ios/build/DerivedData}
ACTION=${FANGGU_TEST_ACTION:-test}
case "$ACTION" in
  test|build-for-testing|test-without-building) ;;
  *) echo "FANGGU_TEST_ACTION must be test, build-for-testing or test-without-building (got '$ACTION')" >&2; exit 2 ;;
esac
if [ "${FANGGU_PARALLEL_TESTS:-0}" = "1" ]; then
  PARALLEL="-parallel-testing-enabled YES -parallel-testing-worker-count ${FANGGU_PARALLEL_WORKERS:-2}"
else
  PARALLEL="-parallel-testing-enabled NO"
fi
OTHERS=$(pgrep -f '/xcodebuild .* test' | wc -l | tr -d ' ')
if [ "$OTHERS" -gt 0 ]; then
  echo "Note: $OTHERS other xcodebuild test run(s) are active; timing assertions may fail under load." >&2
fi
echo "Running $ACTION on simulator $UDID with DerivedData at $DERIVED ($PARALLEL)" >&2
# $PARALLEL is deliberately unquoted: it holds two or four separate xcodebuild options.
# shellcheck disable=SC2086
exec xcodebuild -project "$ROOT/ios/Fanggu.xcodeproj" -scheme Fanggu \
  -destination "platform=iOS Simulator,id=$UDID" -derivedDataPath "$DERIVED" \
  $PARALLEL "$@" "$ACTION"
