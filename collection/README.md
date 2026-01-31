# macOS Collection TTPs (001-012)

This directory contains 12 Tactics, Techniques & Procedures (TTPs) for collecting data on macOS systems. These TTPs are organized into three categories.

## Category 1: Data Collection (001-005)

### TTP-001: Collect Screen Captures
- **Description**: Collect screenshots and screen recording artifacts from macOS system
- **UUID**: 8f4e2a9c-1b3d-4e6f-a8b2-7c5d9e1f3a4b
- **Methods**: Screenshot cache collection, screen recording artifact gathering
- **Key Tools**: find, cp, mkdir

### TTP-002: Collect Clipboard Contents
- **Description**: Collect clipboard data and clipboard history from macOS system
- **UUID**: 7c3e1a9f-2b4d-5f7g-8h9i-0j1k2l3m4n5o
- **Methods**: pbpaste command, clipboard history extraction, clipboard sync data
- **Key Tools**: pbpaste, cp, mkdir

### TTP-003: Collect Webcam and Microphone Access Logs
- **Description**: Collect logs of webcam and microphone access attempts
- **UUID**: 6b2d8f7e-3c5e-6g8h-9i0j-1k2l3m4n5o6p
- **Methods**: Codesign entitlements parsing, privacy database query, access logs
- **Key Tools**: codesign, sqlite3, grep, cp

### TTP-004: Collect Keyboard Input Monitoring
- **Description**: Collect keyboard input logs and keystroke monitoring artifacts
- **UUID**: 5a1c7b6e-4d6f-7h9i-0j1k-2l3m4n5o6p7q
- **Methods**: Accessibility framework inspection, keystroke logger detection, input history
- **Key Tools**: sqlite3, find, defaults, cp

### TTP-005: Collect Application Data
- **Description**: Collect data from user applications including caches, preferences, and databases
- **UUID**: 4e0b6a5d-5e7g-8i0j-1k2l-3m4n5o6p7q8r
- **Methods**: Browser data extraction, application database collection, preference collection
- **Key Tools**: cp, find, sqlite3, xargs

## Category 2: Email and Messages (006-010)

### TTP-006: Access Mail Application Data
- **Description**: Extract and collect data from the macOS Mail application
- **UUID**: 3d9a5c4b-6f8h-0i1j-2k3l-4m5n6o7p8q9r
- **Methods**: Mail database extraction, mailbox collection, envelope index copying
- **Key Tools**: cp, find, sqlite3, mkdir

### TTP-007: Extract Messages Database
- **Description**: Extract and collect data from the macOS Messages application
- **UUID**: 2c8b4a3d-7g9h-1i2j-3k4l-5m6n7o8p9q0r
- **Methods**: Chat database extraction, attachment collection, message querying
- **Key Tools**: cp, find, sqlite3, mkdir

### TTP-008: Collect Slack Chat History
- **Description**: Extract and collect chat history and data from Slack application
- **UUID**: 1b7a2c0e-8h0i-2j3k-4l5m-6n7o8p9q0r1s
- **Methods**: Slack database extraction, cache collection, workspace metadata gathering
- **Key Tools**: cp, find, mkdir, sqlite3

### TTP-009: Browser History Collection
- **Description**: Extract and collect browser history from major browsers on macOS
- **UUID**: 0a6d1b1f-9i1j-3k4l-5m6n-7o8p9q0r1s2t
- **Methods**: Chrome, Firefox, Safari, and Edge history extraction, cache collection
- **Key Tools**: cp, sqlite3, find, xargs

### TTP-010: Collect DNS Query Logs
- **Description**: Collect DNS query logs and DNS cache information from macOS system
- **UUID**: 9e5c0f2a-0j2k-4l5m-6n7o-8p9q0r1s2t3u
- **Methods**: DNS cache dumping, mDNSResponder log analysis, resolver configuration
- **Key Tools**: dscacheutil, grep, networksetup, cat, log

## Category 3: Archive and Forensics (011-012)

### TTP-011: Archive Collected Data
- **Description**: Archive and compress collected data from all collection TTPs
- **UUID**: 8d4b9e0f-1k3l-5m6n-7o8p-9q0r1s2t3u4v
- **Methods**: tar compression, archive integrity verification, manifest creation
- **Key Tools**: tar, gzip, md5sum, shasum

### TTP-012: Create Forensic Image
- **Description**: Create forensic disk image of system data for preservation and analysis
- **UUID**: 7c3a1d2e-2l4m-6n7o-8p9q-0r1s2t3u4v5w
- **Methods**: hdiutil imaging, image verification, hash generation
- **Key Tools**: hdiutil, shasum, md5sum, du

## Common Features

All TTPs include:
- **api_version**: 2.0
- **requirements**: Darwin/macOS platform requirement
- **args**: Customizable parameters for targeting specific data
- **steps**: Sequential collection procedures
- **checks**: Validation of collected data
- **tests**: Default test with dry_run option
- **cleanup**: Safe removal of collected files

## Usage

1. **List all TTPs**:
   ```bash
   ls -la /tmp/ttpforge-generated/collection/
   ```

2. **View specific TTP**:
   ```bash
   cat /tmp/ttpforge-generated/collection/001-collect-screen-captures.yaml
   ```

3. **Run with TTPForge**:
   ```bash
   ttpforge run /tmp/ttpforge-generated/collection/001-collect-screen-captures.yaml
   ```

4. **Dry run mode**:
   ```bash
   ttpforge run --dry-run /tmp/ttpforge-generated/collection/001-collect-screen-captures.yaml
   ```

## Safety Considerations

- All TTPs include cleanup steps to remove collected data
- Tests use dry_run by default for safety
- Verify system permissions before running on sensitive systems
- Ensure proper authorization before collecting user data
- Archive TTPs include integrity verification via checksums

## File Structure

```
/tmp/ttpforge-generated/collection/
├── 001-collect-screen-captures.yaml
├── 002-collect-clipboard-contents.yaml
├── 003-collect-webcam-microphone-access.yaml
├── 004-collect-keyboard-input-monitoring.yaml
├── 005-collect-application-data.yaml
├── 006-access-mail-application-data.yaml
├── 007-extract-messages-database.yaml
├── 008-collect-slack-chat-history.yaml
├── 009-browser-history-collection.yaml
├── 010-collect-dns-query-logs.yaml
├── 011-archive-collected-data.yaml
├── 012-create-forensic-image.yaml
└── README.md (this file)
```

## Technical Details

- **Platform**: macOS (Darwin)
- **Python API Version**: 2.0
- **Total TTPs**: 12
- **Categories**: 3
- **Primary Tools**: find, cp, sqlite3, tar, hdiutil, dscacheutil

## Notes

- Some TTPs may require elevated privileges (sudo) for full functionality
- Collection behavior depends on system configuration and installed applications
- Empty results are expected on systems without certain applications
- Compressed archives use UDZO format (read-only, compressed)
- Forensic images preserve timestamps and metadata
