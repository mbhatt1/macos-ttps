# TTPForge macOS Defense Evasion TTPs - Quick Reference Index

Generated: 2026-01-30 | API Version: 2.0 | Platform: darwin | Total TTPs: 15

## Quick Navigation

### By Category

#### Security Bypass (TTPs 001-005)
| # | Name | Command | Requires | Reversible |
|---|------|---------|----------|-----------|
| 001 | Disable Gatekeeper | `spctl --master-disable` | sudo | Yes |
| 002 | Disable XProtect | `chmod 000 /System/Library/CoreServices/XProtect.bundle/XProtect` | sudo | Yes |
| 003 | Disable FileVault | `fdesetup disable` | sudo | Partial |
| 004 | Disable SIP | `csrutil disable` (Recovery Mode) | sudo | Yes |
| 005 | Disable Spotlight | `mdutil -i off /` | sudo | Yes |

#### File/Process Hiding (TTPs 006-010)
| # | Name | Command | Requires | Reversible |
|---|------|---------|----------|-----------|
| 006 | Hide Files (chflags) | `chflags hidden <file>` | user | Yes |
| 007 | Hide Files (Attributes) | `xattr -w com.apple.finder.hidden 1 <file>` | user | Yes |
| 008 | Hide Process | `ps aux` & `proc_pidpath` | user | N/A |
| 009 | Hide Files in Library | `mv <file> ~/Library/Application Support/.hidden` | user | Yes |
| 010 | Create Hidden Directories | `mkdir -p /path/.hidden_dir` | user | Yes |

#### Log Evasion (TTPs 011-015)
| # | Name | Command | Requires | Reversible |
|---|------|---------|----------|-----------|
| 011 | Clear System Logs | `find /var/log -type f -delete` | sudo | No |
| 012 | Clear Unified Log | `log erase --all` | sudo | Partial |
| 013 | Disable Audit Logging | `audit -i off` | sudo | Yes |
| 014 | Clear Bash History | `rm ~/.bash_history` | user | Partial |
| 015 | Clear Application Cache | `rm -rf ~/Library/Caches/*` | user | Partial |

## By Privilege Level

### No Sudo Required (Standard User)
- 006: Hide Files with chflags
- 007: Hide Files with Attributes
- 008: Hide Process
- 009: Hide Files in Library
- 010: Create Hidden Directories
- 014: Clear Bash History

### Sudo Required (Administrator)
- 001: Disable Gatekeeper
- 002: Disable XProtect
- 003: Disable FileVault
- 004: Disable SIP
- 005: Disable Spotlight
- 011: Clear System Logs
- 012: Clear Unified Log
- 013: Disable Audit Logging
- 015: Clear Application Cache (optional sudo)

## By Reversibility

### Fully Reversible
- 001, 002, 004, 005, 006, 007, 009, 010, 013

### Partially Reversible (Backup Available)
- 011, 012, 014, 015

### Non-Reversible
- 003 (FileVault encryption deletion)

## File Locations

```
/tmp/ttpforge-generated/defense_evasion/
├── 001_disable_gatekeeper.yaml         [65 lines]
├── 002_disable_xprotect.yaml           [65 lines]
├── 003_disable_filevault.yaml          [60 lines]
├── 004_disable_sip.yaml                [52 lines]
├── 005_disable_spotlight.yaml          [69 lines]
├── 006_hide_files_chflags.yaml         [70 lines]
├── 007_hide_files_attributes.yaml      [72 lines]
├── 008_hide_process.yaml               [70 lines]
├── 009_hide_files_library.yaml         [82 lines]
├── 010_create_hidden_directories.yaml  [84 lines]
├── 011_clear_system_logs.yaml          [79 lines]
├── 012_clear_unified_log.yaml          [78 lines]
├── 013_disable_audit_logging.yaml      [80 lines]
├── 014_clear_bash_history.yaml         [89 lines]
├── 015_clear_application_cache.yaml    [99 lines]
├── README.md                            [Comprehensive documentation]
├── SUMMARY.txt                          [Detailed summary report]
├── INDEX.md                             [This file]
└── Total Size: 84K (1,114 lines of code)
```

## Parameter Reference

### Common Parameters

#### File/Directory Operations
- `file_path` (string, required): Full path to target file
- `directory_name` (string): Hidden directory name (without dot)
- `base_path` (string): Base path for operations (default: ~)
- `source_path` (string): Source file/directory
- `new_name` (string): New hidden name

#### Boolean Flags
- `disable` (bool): Enable destructive operations (default: false)
- `unhide` (bool): Reverse hiding operations (default: false)
- `status_only` (bool): Check status without executing (default: true)
- `clear_memory` (bool): Clear history from memory too (default: true)

#### Filter Parameters
- `log_type` (string): Type of logs to target (all, system, kernel, auth)
- `level` (string): Log level filter (debug, info, notice, warning, error, fault)
- `cache_type` (string): Cache category (all, browser, app, system)
- `application` (string): Specific application name filter
- `predicate` (string): Log filtering predicate

#### Numeric Parameters
- `pid` (int): Process ID to target
- `days_old` (int): Age threshold for log deletion
- `nested_depth` (int): Nesting level for directories

#### String Parameters
- `process_name` (string): Name of process to find
- `user` (string): User account to target
- `shell_type` (string): Shell type (bash, zsh, all)
- `attribute_name` (string): Extended attribute name
- `attribute_value` (string): Attribute value

## Common Usage Patterns

### Status Check (Non-Destructive)
```bash
ttpforge run 001_disable_gatekeeper.yaml --status true
```

### Dry Run Test
```bash
ttpforge run 005_disable_spotlight.yaml --test dry_run
```

### Execute with Cleanup
```bash
ttpforge run 014_clear_bash_history.yaml --shell_type bash
# Cleanup automatically executes after
```

### Hide Specific File
```bash
ttpforge run 006_hide_files_chflags.yaml --file_path ~/secret.txt
```

### Create Hidden Directory
```bash
ttpforge run 010_create_hidden_directories.yaml \
  --base_path /tmp \
  --directory_name payload \
  --nested_depth 2
```

### Clear Specific Cache
```bash
ttpforge run 015_clear_application_cache.yaml \
  --cache_type browser \
  --application Chrome
```

## Native Tools Reference

### Gatekeeper & Code Signing
- `spctl` - Gatekeeper control (security policy)
- `codesign` - Code signature operations

### Encryption & Security
- `fdesetup` - FileVault management
- `csrutil` - System Integrity Protection (SIP) control

### File System
- `chflags` - Change file flags (hidden, etc.)
- `xattr` - Extended file attributes
- `chmod` - File permissions
- `find` - Search files with conditions
- `mv` - Move/rename files
- `mkdir` - Create directories
- `rm` - Remove files/directories
- `ls` - List files with attributes

### Indexing & Search
- `mdutil` - Spotlight metadata utilities
- `mdfind` - Find files using Spotlight

### Logging & Audit
- `log` - Unified logging system (macOS 10.12+)
- `auditctl` - Audit daemon control
- `audit` - Audit logging control
- `history` - Shell history command
- `syslog` - System logging (legacy)

### Process Management
- `ps` - Process listing
- `launchctl` - Launch service control
- `pkill` - Kill processes by name
- `lsof` - List open files

## Exit Codes

Standard exit codes used across TTPs:
- `0` - Success
- `1` - General failure
- `2` - Misuse of command
- `127` - Command not found
- `255` - Exit status out of range

## Environment Variables

TTPs use these standard environment variables:
- `HOME` - User home directory
- `USER` - Current username
- `SUDO_USER` - User invoking sudo
- `PWD` - Current working directory

## Conditional Execution

All steps support conditional execution:
```yaml
condition: "{{ args.disable }}"           # True if disable=true
condition: "{{ args.file_path != '' }}"   # True if path provided
condition: "{{ args.log_type == 'all' }}" # String comparison
condition: "{{ args.nested_depth > 1 }}"  # Numeric comparison
```

## MITRE ATT&CK Mappings

### Techniques Covered
- **T1070.001** - Log Deletion (TTPs 011, 012, 014, 015)
- **T1562.001** - Clear System Logs (TTP 011, 012)
- **T1562.002** - Clear Bash History (TTP 014)
- **T1564.001** - Hidden File or Directory (TTPs 006, 007, 009, 010)
- **T1222.002** - macOS Permissions Modification (TTPs 006, 007)
- **T1211** - Exploitation for Defense Evasion (TTPs 001-005)

### Tactics
All TTPs map to **defense_evasion** tactic (TA0005)

## Detection & Monitoring

### What to Monitor

**Command Execution**
- `spctl`, `fdesetup`, `csrutil`, `mdutil`
- `chflags`, `xattr`, `chmod`
- `log`, `audit`, `auditctl`
- `history`, `rm`, `find`

**File Activity**
- FileVault status changes
- Gatekeeper modifications
- System file permission changes
- Log file deletions

**Process Activity**
- Privilege escalation attempts
- Daemon termination/restart
- Service configuration changes

**Log Indicators**
- Sudden log truncation
- Audit daemon stopping
- Unified log export operations

### Mitigation

1. **Immutable Logging**: Store logs to immutable storage
2. **EDR Solutions**: Deploy endpoint detection and response
3. **File Integrity**: Monitor critical files for changes
4. **Privilege Escalation**: Log and alert on sudo usage
5. **Offline Backups**: Maintain isolated log backups
6. **osquery**: Monitor security tool status
7. **Auditd**: Expand audit rules for detection
8. **Xprotect Rules**: Update XProtect definitions

## References

- TTPForge Docs: https://github.com/elastic/ttpforge
- macOS Security: https://support.apple.com/en-us/102149
- MITRE ATT&CK: https://attack.mitre.org/tactics/TA0005/
- Apple Security: https://developer.apple.com/security/
- macOS Hardening: https://github.com/drduh/macOS-Security-and-Privacy-Guide

## Version Information

- **TTPForge API**: 2.0
- **macOS Target**: 10.13+ (High Sierra and later)
- **Generated Date**: 2026-01-30
- **Total TTPs**: 15
- **Total Code**: 1,114 lines
- **Documentation**: README.md, SUMMARY.txt, INDEX.md

---

For detailed information on each TTP, see **README.md**
For statistical analysis, see **SUMMARY.txt**
For execution examples, see individual YAML files
