#!/bin/bash

# TTPForge macOS TTP Validation Script
# Validates syntax, runs tests, and generates report

set -e

if [ $# -lt 1 ]; then
    echo "Usage: $0 <ttp_directory> [--run-tests] [--timeout-seconds 10]"
    echo ""
    echo "Examples:"
    echo "  $0 ./macos --run-tests"
    echo "  $0 ./macos --run-tests --timeout-seconds 30"
    exit 1
fi

TTP_DIR="$1"
RUN_TESTS=false
TIMEOUT_SECONDS=10

# Parse optional arguments
shift
while [ $# -gt 0 ]; do
    case "$1" in
        --run-tests)
            RUN_TESTS=true
            shift
            ;;
        --timeout-seconds)
            TIMEOUT_SECONDS="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Validate TTPForge is available
if ! command -v ttpforge &> /dev/null; then
    echo "Error: ttpforge not found in PATH"
    exit 1
fi

# Validate directory exists
if [ ! -d "$TTP_DIR" ]; then
    echo "Error: Directory not found: $TTP_DIR"
    exit 1
fi

# Find all YAML files
TTP_FILES=($(find "$TTP_DIR" -type f -name "*.yaml" | sort))
TOTAL=${#TTP_FILES[@]}

if [ $TOTAL -eq 0 ]; then
    echo "Error: No YAML files found in $TTP_DIR"
    exit 1
fi

echo "======================================"
echo "TTPForge macOS TTP Validation Report"
echo "======================================"
echo "Directory: $TTP_DIR"
echo "Total TTPs found: $TOTAL"
echo "Run tests: $RUN_TESTS"
if [ "$RUN_TESTS" = true ]; then
    echo "Test timeout: ${TIMEOUT_SECONDS}s"
fi
echo ""

# Initialize counters
PASSED=0
FAILED=0
WARNINGS=0
ERRORS=0
PARSE_FAILED=0

# Create temp files for reporting
PASSED_FILE=$(mktemp)
FAILED_FILE=$(mktemp)
WARNINGS_FILE=$(mktemp)

trap "rm -f $PASSED_FILE $FAILED_FILE $WARNINGS_FILE" EXIT

# Process each TTP
echo "Validating TTPs..."
echo ""

for i in "${!TTP_FILES[@]}"; do
    TTP_FILE="${TTP_FILES[$i]}"
    TTP_NUM=$((i + 1))
    FILENAME=$(basename "$TTP_FILE")

    # Validate syntax
    if ! ttpforge validate "$TTP_FILE" > /tmp/ttp_validate.log 2>&1; then
        FAILED=$((FAILED + 1))
        echo "  [$TTP_NUM/$TOTAL] ✗ $FILENAME (validation failed)"
        echo "$FILENAME: $(cat /tmp/ttp_validate.log | head -1)" >> "$FAILED_FILE"
        continue
    fi

    # Count warnings
    if grep -q "WARNING" /tmp/ttp_validate.log 2>/dev/null; then
        WARNINGS=$((WARNINGS + 1))
    fi

    # Run tests if requested
    if [ "$RUN_TESTS" = true ]; then
        if ! timeout $TIMEOUT_SECONDS ttpforge validate "$TTP_FILE" --run-tests > /tmp/ttp_test.log 2>&1; then
            FAILED=$((FAILED + 1))
            echo "  [$TTP_NUM/$TOTAL] ✗ $FILENAME (test failed)"
            echo "$FILENAME: Tests failed" >> "$FAILED_FILE"
            continue
        fi
    fi

    PASSED=$((PASSED + 1))
    if [ $((TTP_NUM % 10)) -eq 0 ] || [ $TTP_NUM -eq 1 ]; then
        PERCENT=$((PASSED * 100 / TOTAL))
        echo "  [$TTP_NUM/$TOTAL] Progress: $PERCENT% complete..."
    fi
    echo "$FILENAME" >> "$PASSED_FILE"
done

# Generate report
echo ""
echo "======================================"
echo "Validation Results"
echo "======================================"
echo "Total TTPs:        $TOTAL"
echo "Passed:            $PASSED ✓"
echo "Failed:            $FAILED ✗"
echo "With Warnings:     $WARNINGS ⚠"
echo ""

if [ $FAILED -gt 0 ]; then
    echo "Failed TTPs:"
    head -20 "$FAILED_FILE" | sed 's/^/  - /'
    if [ $(wc -l < "$FAILED_FILE") -gt 20 ]; then
        echo "  ... and $(($(wc -l < "$FAILED_FILE") - 20)) more"
    fi
    echo ""
fi

# Calculate statistics
PASS_RATE=$((PASSED * 100 / TOTAL))
echo "Pass Rate: $PASS_RATE%"
echo ""

# Generate summary by category
echo "======================================"
echo "Summary by Category"
echo "======================================"

for category_dir in $(find "$TTP_DIR" -mindepth 1 -maxdepth 1 -type d | sort); do
    category=$(basename "$category_dir")
    count=$(find "$category_dir" -name "*.yaml" | wc -l)
    if [ $count -gt 0 ]; then
        echo "$category: $count TTPs"
    fi
done

echo ""

# Recommendations
echo "======================================"
echo "Recommendations"
echo "======================================"

if [ $FAILED -eq 0 ]; then
    echo "✓ All TTPs validated successfully!"
else
    echo "⚠ $FAILED TTPs failed validation. Review the errors above."
fi

if [ $WARNINGS -gt 0 ]; then
    echo "⚠ $WARNINGS TTPs have warnings. Consider reviewing them."
fi

echo ""
echo "Next Steps:"
if [ "$RUN_TESTS" = false ]; then
    echo "  - Run with tests: $0 '$TTP_DIR' --run-tests"
fi
echo "  - Deploy to repository: ttpforge list repos"
echo "  - Run specific TTP: ttpforge run <repo>//path/to/ttp.yaml"
echo ""

# Exit with appropriate code
if [ $FAILED -gt 0 ]; then
    exit 1
fi

exit 0
