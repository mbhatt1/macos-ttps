#!/bin/bash

# TTPForge macOS TTP Batch Creator
# Usage: ./create-ttp-batch.sh <output_directory> <num_ttps>
# This script is idempotent - safe to run multiple times

set -e

if [ $# -lt 2 ]; then
    echo "Usage: $0 <output_directory> <num_ttps> [category]"
    echo ""
    echo "Examples:"
    echo "  $0 ./macos 100"
    echo "  $0 ./macos 50 discovery"
    exit 1
fi

OUTPUT_DIR="$1"
NUM_TTPS="$2"
CATEGORY="${3:-general}"

# Validate TTPForge is available
if ! command -v ttpforge &> /dev/null; then
    echo "Error: ttpforge not found in PATH"
    exit 1
fi

# Create directory if it doesn't exist
mkdir -p "$OUTPUT_DIR/$CATEGORY"

# Generate UUIDs in batch (more efficient than one at a time)
echo "Generating $NUM_TTPS UUIDs..."
UUIDS=()
for i in $(seq 1 $NUM_TTPS); do
    UUID=$(ttpforge create uuid)
    UUIDS+=("$UUID")
done

# Create TTPs
echo "Creating $NUM_TTPS macOS TTPs in $OUTPUT_DIR/$CATEGORY..."

TEMPLATE_ACTIONS=(
    "inline: system_profiler SPSoftwareDataType"
    "inline: ps aux"
    "inline: launchctl list"
    "inline: networksetup -listallnetworkservices"
    "inline: osascript -e 'tell app \"System Events\" to get name of every process where background only is false'"
    "inline: mdls -name kMDItemContentCreationDate /Library"
    "inline: find /Library/LaunchAgents -name '*.plist' 2>/dev/null | head -5"
    "inline: ls -la ~/Library/Safari/"
    "inline: dscl . list /Users | grep -v '^_'"
    "inline: softwareupdate -l"
    "inline: security dump-keychain -d login.keychain 2>&1 | head -5"
    "inline: ioreg -l -S -w 0 | head -20"
    "inline: defaults read /Library/Preferences/com.apple.loginwindow"
    "inline: sysctl -a | grep kern"
    "inline: log show --predicate 'eventMessage contains[cd] \"error\"' --last 24h | head -10"
)

TEMPLATE_DESCRIPTIONS=(
    "Enumerate macOS software version and system information"
    "List all running processes on the system"
    "Display all launchd services and daemons"
    "List all available network services"
    "Identify all user-facing applications currently running"
    "Query metadata about /Library directory"
    "Find all LaunchAgent plist files"
    "Enumerate Safari application directory"
    "List all non-system users on the system"
    "Check for available software updates"
    "Dump keychain contents (requires user interaction)"
    "Display hardware registry information"
    "Read login window preferences"
    "Show kernel parameters and configuration"
    "Query system logs for errors in last 24 hours"
)

CREATED_COUNT=0
SKIPPED_COUNT=0

for i in $(seq 0 $((NUM_TTPS - 1))); do
    UUID="${UUIDS[$i]}"

    # Cycle through templates
    TEMPLATE_IDX=$((i % ${#TEMPLATE_ACTIONS[@]}))
    ACTION="${TEMPLATE_ACTIONS[$TEMPLATE_IDX]}"
    DESCRIPTION="${TEMPLATE_DESCRIPTIONS[$TEMPLATE_IDX]}"

    # Generate unique name
    TTP_NUMBER=$((i + 1))
    TTP_NAME="${CATEGORY}_ttp_$(printf "%03d" $TTP_NUMBER)"
    TTP_FILE="$OUTPUT_DIR/$CATEGORY/${TTP_NAME}.yaml"

    # IDEMPOTENT: Check if file already exists
    if [ -f "$TTP_FILE" ]; then
        ((SKIPPED_COUNT++))
        if [ $((($TTP_NUMBER) % 10)) -eq 0 ]; then
            echo "  Skipped $TTP_NUMBER/$NUM_TTPS TTPs (already exist)..."
        fi
        continue
    fi

    # Create TTP file
    cat > "$TTP_FILE" << TTPEOF
---
api_version: 2.0
uuid: $UUID
name: "$TTP_NAME"
authors:
  - bulk-generated
description: |
  $DESCRIPTION

  This is TTP #$TTP_NUMBER in the $CATEGORY category.
requirements:
  platforms:
    - os: darwin
tests:
  - name: dry_run
    description: Validate TTP structure and syntax
    dry_run: true
  - name: default
    description: Execute and verify TTP behavior
steps:
  - name: execute_action
    description: Execute the main action
    $ACTION
    checks:
      - msg: "Command should complete successfully"
        expect_exit_code: 0
TTPEOF

    ((CREATED_COUNT++))

    if [ $((($TTP_NUMBER) % 10)) -eq 0 ]; then
        echo "  Created $TTP_NUMBER/$NUM_TTPS TTPs..."
    fi
done

echo ""
if [ $CREATED_COUNT -gt 0 ]; then
    echo "✓ Created $CREATED_COUNT new macOS TTPs"
fi
if [ $SKIPPED_COUNT -gt 0 ]; then
    echo "✓ Skipped $SKIPPED_COUNT existing TTPs"
fi
echo "✓ Total TTPs in $OUTPUT_DIR/$CATEGORY: $(find "$OUTPUT_DIR/$CATEGORY" -name "*.yaml" 2>/dev/null | wc -l)"
echo ""
echo "Next steps:"
echo "  1. Review generated TTPs: ls -la $OUTPUT_DIR/$CATEGORY/"
echo "  2. Validate all TTPs: ttpforge validate $OUTPUT_DIR/$CATEGORY/*.yaml"
echo "  3. Run full test suite: ./run-all-ttp-tests.sh \$(which ttpforge) $OUTPUT_DIR"
echo ""
