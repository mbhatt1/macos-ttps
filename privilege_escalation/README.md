# macOS Privilege Escalation TTPs (001-012)

This directory contains 12 macOS privilege escalation Tactics, Techniques, and Procedures (TTPs) in YAML format, organized by category.

## Enumeration TTPs (001-005)

### 001: Check Sudo Privileges
- **UUID**: 550e8400-e29b-41d4-a716-446655440001
- **Description**: Enumerate sudo privileges available to current user using `sudo -l`
- **Commands**: Check passwordless commands, identify escalation paths
- **Test Type**: default (safe enumeration)

### 002: Identify SUID Binaries
- **UUID**: 550e8400-e29b-41d4-a716-446655440002
- **Description**: Find all binaries with SUID bit set on the system
- **Commands**: `find / -perm -4000 -type f`, filter SUID binaries owned by root
- **Test Type**: default (read-only enumeration)

### 003: Find World-Writable Directories
- **UUID**: 550e8400-e29b-41d4-a716-446655440003
- **Description**: Locate world-writable directories that could be exploited
- **Commands**: Search `/tmp`, `/var/tmp`, identify missing sticky bits
- **Test Type**: default (safe enumeration)

### 004: Check Group Membership for Admin
- **UUID**: 550e8400-e29b-41d4-a716-446655440004
- **Description**: Enumerate group membership to identify administrative privileges
- **Commands**: `groups`, check admin/wheel/sudo groups, `dscl` queries
- **Test Type**: default (read-only enumeration)

### 005: Enumerate Authorization Policies
- **UUID**: 550e8400-e29b-41d4-a716-446655440005
- **Description**: Check macOS authorization framework policies and rights
- **Commands**: `security authorizationdb read`, check admin authentication policies
- **Test Type**: default (safe enumeration)

## Exploitation TTPs (006-012)

### 006: Exploit Insecure Sudo Configuration
- **UUID**: 550e8400-e29b-41d4-a716-446655440006
- **Description**: Attempt to exploit sudo misconfiguration for privilege escalation
- **Commands**: Detect NOPASSWD entries, check for ALL privileges, identify command injection vectors
- **Test Type**: dry_run (detection without exploitation)

### 007: Abuse of Auth Plugins
- **UUID**: 550e8400-e29b-41d4-a716-446655440007
- **Description**: Exploit weaknesses in macOS authentication plugins
- **Commands**: Enumerate PAM modules, check plugin directory permissions
- **Test Type**: dry_run (safe enumeration without modification)

### 008: Dylib Hijacking via DYLD_INSERT_LIBRARIES
- **UUID**: 550e8400-e29b-41d4-a716-446655440008
- **Description**: Exploit dylib hijacking through DYLD_INSERT_LIBRARIES environment variable
- **Commands**: Test DYLD environment variable injection, identify vulnerable SUID binaries
- **Test Type**: dry_run (detection without creating malicious dylibs)

### 009: Passwordless Sudo Detection
- **UUID**: 550e8400-e29b-41d4-a716-446655440009
- **Description**: Detect and exploit passwordless sudo entries
- **Commands**: `sudo -l`, extract NOPASSWD commands, test with `sudo -n`
- **Test Type**: dry_run (detection without actual escalation)

### 010: Keychain Access Without Password
- **UUID**: 550e8400-e29b-41d4-a716-446655440010
- **Description**: Attempt to access macOS Keychain without user password
- **Commands**: Enumerate keychains, check lock status, attempt credential extraction
- **Test Type**: dry_run (enumeration without decryption)

### 011: IOKit Privilege Escalation
- **UUID**: 550e8400-e29b-41d4-a716-446655440011
- **Description**: Exploit IOKit framework vulnerabilities for privilege escalation
- **Commands**: Enumerate IOKit services, check kernel extensions, list hardware services
- **Test Type**: dry_run (enumeration without exploitation)

### 012: Authorization Framework Abuse
- **UUID**: 550e8400-e29b-41d4-a716-446655440012
- **Description**: Exploit macOS authorization framework for privilege escalation
- **Commands**: Dump authorization database, check admin rights, enumerate mechanisms
- **Test Type**: dry_run (detection without modification)

## Common Features

All TTPs include:
- **api_version**: 2.0
- **requirements**: 
  - Platform: darwin (macOS)
  - Superuser: false (all can run as unprivileged user)
- **steps**: Inline commands to check/exploit vulnerabilities
- **checks**: Verify privilege levels before/after exploitation
- **tests**: Either `default` for safe enumeration or `dry_run` for dangerous operations
- **cleanup**: Restore system state and remove artifacts

## Usage

Each YAML file can be executed by TTPForge to:
1. Enumerate privilege escalation opportunities
2. Test for specific vulnerabilities
3. Perform privilege escalation attempts (in dry_run mode for safety)
4. Clean up any artifacts created during testing

## Safety Notes

- Enumeration TTPs (001-005) are safe to run on any macOS system
- Exploitation TTPs (006-012) use `dry_run` test mode for safe detection
- All cleanup steps remove any artifacts created during testing
- No permanent system modifications are made

## Requirements

- macOS operating system (darwin platform)
- Unprivileged user account (sudo/admin access not required for enumeration)
- TTPForge framework for execution
