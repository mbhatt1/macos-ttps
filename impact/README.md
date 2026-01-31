# macOS Impact TTPs (001-008)

This directory contains 8 macOS Impact Tactical Techniques & Procedures (TTPs) for testing defensive capabilities against system disruption, data destruction, and ransomware-style attacks.

## TTP Summary

### System Disruption (001-005)

**001 - Disable Network Interfaces**
- Description: Disables all active network interfaces on macOS to simulate network isolation attack
- Requirements: darwin, superuser: true
- UUID: 550e8400-e29b-41d4-a716-446655440001
- Severity: high
- Commands: networksetup, ifconfig
- Cleanup: Re-enable network interfaces

**002 - Shutdown System**
- Description: Gracefully shuts down the macOS system to simulate denial of service
- Requirements: darwin, superuser: true
- UUID: 550e8400-e29b-41d4-a716-446655440002
- Severity: critical
- Commands: shutdown
- Cleanup: Cancel scheduled shutdown

**003 - Reboot System**
- Description: Forces macOS system reboot to simulate denial of service and disrupt operations
- Requirements: darwin, superuser: true
- UUID: 550e8400-e29b-41d4-a716-446655440003
- Severity: critical
- Commands: reboot, launchctl
- Cleanup: Verify system recovery from reboot

**004 - Lock Screen**
- Description: Locks the macOS screen to deny user access and force authentication
- Requirements: darwin, superuser: false
- UUID: 550e8400-e29b-41d4-a716-446655440004
- Severity: medium
- Commands: osascript, defaults write, launchctl
- Cleanup: Kill screensaver, restore preferences

**005 - Empty Trash and Disk Cleanup**
- Description: Empties Trash and performs aggressive disk cleanup to destroy user data
- Requirements: darwin, superuser: true
- UUID: 550e8400-e29b-41d4-a716-446655440005
- Severity: high
- Commands: rm, find, defaults
- Cleanup: Restore system directories

### Data Destruction (006-008)

**006 - Secure File Deletion**
- Description: Securely deletes files using overwrite methods to prevent recovery
- Requirements: darwin, superuser: true
- UUID: 550e8400-e29b-41d4-a716-446655440006
- Severity: high
- Commands: srm, rm -P, dd, shred
- Parameters: target_path, passes, method
- Cleanup: Remove residual files

**007 - Volume Encryption and Erasure Simulation**
- Description: Simulates volume encryption and erasure operations on macOS storage
- Requirements: darwin, superuser: true
- UUID: 550e8400-e29b-41d4-a716-446655440007
- Severity: critical
- Commands: diskutil, hdiutil, launchctl
- Parameters: target_volume, encryption_type, erase_method
- Cleanup: Remove test disk images

**008 - Ransom Note Display**
- Description: Displays ransom-style message to user simulating ransomware impact
- Requirements: darwin, superuser: false
- UUID: 550e8400-e29b-41d4-a716-446655440008
- Severity: high
- Commands: osascript, defaults, killall
- Parameters: message, title, persistent
- Cleanup: Remove scripts, reset preferences

## Common Features

All TTPs include:
- api_version: 2.0
- Unique UUIDs for tracking
- Platform requirement: darwin (macOS)
- steps: Sequential commands to perform action
- checks: Verification that action occurred
- tests: dry_run: true for safe testing
- cleanup: Commands to undo disruptions
- metadata: Creation date, severity level, technique mappings

## MITRE ATT&CK Mappings

- T1529: Service Stop (TTPs 001, 002, 003)
- T1531: Account Access Removal (TTPs 001, 004, 005, 008)
- T1561: Disk Wipe (TTPs 002, 003, 005, 006, 007)
- T1485: Data Destruction (TTP 006)
- T1486: Data Encrypted for Impact (TTP 007)
- T1491: Defacement (TTP 008)

## Safety Notes

- All TTPs with potential system impact use dry_run: true in tests
- Cleanup steps should be reviewed before execution
- Some TTPs require superuser/root privileges
- Test in controlled environment first
- Backup critical data before execution

## File Structure

```
/tmp/ttpforge-generated/impact/
├── 001-disable-network-interfaces.yaml
├── 002-shutdown-system.yaml
├── 003-reboot-system.yaml
├── 004-lock-screen.yaml
├── 005-empty-trash-disk-cleanup.yaml
├── 006-secure-file-deletion.yaml
├── 007-volume-encryption-erasure.yaml
├── 008-ransom-note-display.yaml
└── README.md
```

Generated: 2026-01-30
