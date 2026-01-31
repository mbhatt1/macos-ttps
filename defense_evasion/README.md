# macOS Defense Evasion TTPs (001-015)

This directory contains 15 Tactical Technique Procedures (TTPs) for testing macOS Defense Evasion capabilities.

## TTP Categories

### Security Bypass (001-005)
- **001**: Disable Gatekeeper - Bypass application code signing verification
- **002**: Disable XProtect - Bypass malware detection engine
- **003**: Disable FileVault - Bypass full disk encryption
- **004**: Disable SIP - Bypass System Integrity Protection (Recovery Mode only)
- **005**: Disable Spotlight Indexing - Disable file indexing to evade search

### File/Process Hiding (006-010)
- **006**: Hide Files with chflags - Mark files as hidden using chflags
- **007**: Hide Files with Attributes - Use extended attributes for hiding
- **008**: Hide Process with proc_pidpath - Manipulate process visibility
- **009**: Hide Files in Library - Move files to hidden Library locations
- **010**: Create Hidden Directories - Create dot-prefixed hidden directories

### Log Evasion (011-015)
- **011**: Clear System Logs - Remove /var/log files
- **012**: Clear Unified Log - Clear unified logging system database
- **013**: Disable Audit Logging - Disable BSM audit trail
- **014**: Clear Bash History - Remove command history
- **015**: Clear Application Cache - Clear cached data and history

## File Structure

Each TTP includes:
- **id**: Unique identifier (XXX-technique-name)
- **name**: Human-readable technique name
- **description**: Detailed description of the technique
- **api_version**: 2.0 (TTPForge format)
- **platforms**: darwin (macOS)
- **tactics**: defense_evasion
- **techniques**: Specific MITRE ATT&CK techniques
- **requirements**: Platform and privilege requirements
- **args**: Parameterized inputs for technique execution
- **steps**: Inline shell commands using native macOS tools
- **checks**: Verification steps to confirm success
- **tests**: Test cases (default, dry_run)
- **cleanup**: Restoration procedures where applicable
- **notes**: Important implementation details

## Usage

### Running a TTP
```bash
ttpforge run /path/to/001_disable_gatekeeper.yaml --disable true
```

### Dry Run
```bash
ttpforge run /path/to/001_disable_gatekeeper.yaml --disable true --test dry_run
```

### Checking Status Only
```bash
ttpforge run /path/to/001_disable_gatekeeper.yaml --status true
```

## Key Features

- **Parameterized**: All TTPs accept arguments for flexible execution
- **Safe Defaults**: Non-destructive by default; requires explicit flags to enable
- **Reversible**: Most TTPs include cleanup steps to restore original state
- **Verified**: Each TTP includes checks to verify successful execution
- **Documented**: Extensive notes on limitations and detection indicators

## Requirements

- macOS (10.13+)
- Administrator/sudo access for security-related operations
- TTPForge execution environment

## Important Notes

### Security Considerations
- These TTPs demonstrate security features and their limitations
- Use only for authorized security testing and research
- Disabling security features leaves systems vulnerable
- Some operations require System Integrity Protection (SIP) to be disabled first

### Detection Indicators
- Disabling security features generates audit logs
- Clearing logs is itself a forensic indicator
- Most operations require elevated privileges
- Native tool usage may be monitored by EDR solutions

### Privilege Requirements
- **No sudo required**: TTPs 006, 007, 008, 009, 010, 014 (file/process hiding)
- **Sudo required**: TTPs 001, 002, 003, 004, 005, 011, 012, 013, 015 (system/security changes)

## MITRE ATT&CK Mappings

### Defense Evasion
- T1562.001 - Indicator Removal on Host: Clear System Logs
- T1562.002 - Indicator Removal on Host: Clear Bash History
- T1070.001 - Indicator Removal on Host: Log Deletion
- T1096.001 - Hide Artifacts: Hidden File or Directory
- T1197 - BITS Jobs (not applicable on macOS)
- T1211 - Exploitation for Defense Evasion
- T1222.002 - File and Directory Permissions Modification: macOS File and Folder Permissions Modification
- T1564.001 - Hide Artifacts: Hidden File or Directory
- T1564.003 - Hide Artifacts: Hidden Window
- T1564.012 - Hide Artifacts: Hidden Subscription
- T1599 - Network Boundary Bridging
- T1047 - Windows Management Instrumentation (not applicable on macOS)
- T1562.008 - Indicator Removal on Host: Disable or Modify Cloud Logs

## File Locations

```
/tmp/ttpforge-generated/defense_evasion/
├── 001_disable_gatekeeper.yaml
├── 002_disable_xprotect.yaml
├── 003_disable_filevault.yaml
├── 004_disable_sip.yaml
├── 005_disable_spotlight.yaml
├── 006_hide_files_chflags.yaml
├── 007_hide_files_attributes.yaml
├── 008_hide_process.yaml
├── 009_hide_files_library.yaml
├── 010_create_hidden_directories.yaml
├── 011_clear_system_logs.yaml
├── 012_clear_unified_log.yaml
├── 013_disable_audit_logging.yaml
├── 014_clear_bash_history.yaml
├── 015_clear_application_cache.yaml
└── README.md
```

## Technical Details

### Tools Used
- `spctl` - Gatekeeper management
- `fdesetup` - FileVault management
- `csrutil` - System Integrity Protection status
- `mdutil` - Spotlight indexing control
- `chflags` - File flag manipulation
- `xattr` - Extended attributes
- `log` - Unified logging system
- `auditctl` - Audit logging control
- `history` - Shell history management
- `rm`, `truncate`, `find` - File operations

### Environment Variables
- `HOME` - User home directory (for cache/history clearing)
- `USER` - Current user
- `SUDO_USER` - User running sudo

## References

- Apple macOS Security: https://support.apple.com/en-us/102149
- TTPForge Documentation: https://github.com/elastic/ttpforge
- MITRE ATT&CK Framework: https://attack.mitre.org/
- macOS Hardening Guide: https://github.com/drduh/macOS-Security-and-Privacy-Guide

## License

These TTPs are provided for authorized security testing and educational purposes only.

---
Generated: 2026-01-30
TTPForge API Version: 2.0
macOS Compatibility: 10.13+
