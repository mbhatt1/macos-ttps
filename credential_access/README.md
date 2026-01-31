# macOS Credential Access TTPs (001-015)

This directory contains 15 YAML-formatted Tactics, Techniques, and Procedures (TTPs) for testing credential access on macOS systems.

## Keychain-Based TTPs (001-005)

### 001_keychain_dump_login.yaml
- **UUID**: 12345678-1234-1234-1234-000000000001
- **Technique**: T1555.001
- **Description**: Extract credentials from macOS login keychain using security command
- **Commands**: security default-keychain, security dump-keychain, security find-generic-password
- **Test Type**: Default (read-only queries)

### 002_extract_internet_passwords.yaml
- **UUID**: 12345678-1234-1234-1234-000000000002
- **Technique**: T1555.001
- **Description**: Extract internet passwords from macOS keychain
- **Commands**: security dump-keychain, security find-internet-password
- **Test Type**: Default (read-only queries)

### 003_export_certificates.yaml
- **UUID**: 12345678-1234-1234-1234-000000000003
- **Technique**: T1555.001
- **Description**: Export certificates and keys from macOS keychain
- **Commands**: security find-certificate, security find-identity
- **Test Type**: Default (certificate listing)
- **Cleanup**: Remove exported certificates

### 004_enumerate_keychain_items.yaml
- **UUID**: 12345678-1234-1234-1234-000000000004
- **Technique**: T1555
- **Description**: Enumerate all items stored in macOS keychain databases
- **Commands**: security list-keychains, security dump-keychain
- **Test Type**: Default (keychain enumeration)

### 005_keychain_database_access.yaml
- **UUID**: 12345678-1234-1234-1234-000000000005
- **Technique**: T1555.001
- **Description**: Direct database access to macOS keychain SQLite database
- **Commands**: sqlite3 queries on ~/Library/Keychains/login.keychain-db
- **Test Type**: Default (database schema inspection)
- **Database**: SQLite3 access to genp (generic passwords) table

## Browser-Based TTPs (006-010)

### 006_safari_history_extraction.yaml
- **UUID**: 12345678-1234-1234-1234-000000000006
- **Technique**: T1555.003
- **Description**: Extract browsing history from Safari application
- **Commands**: sqlite3 queries on ~/Library/Safari/History.db
- **Database**: SQLite3 query of history_items table
- **Test Type**: Default (history query)
- **Cleanup**: Remove extracted history file

### 007_safari_bookmarks_extraction.yaml
- **UUID**: 12345678-1234-1234-1234-000000000007
- **Technique**: T1555.003
- **Description**: Extract bookmarks from Safari application
- **Commands**: plutil, file copy operations
- **Files**: ~/Library/Safari/Bookmarks.plist
- **Test Type**: Default (file access)
- **Cleanup**: Remove bookmarks copy

### 008_chrome_cookie_extraction.yaml
- **UUID**: 12345678-1234-1234-1234-000000000008
- **Technique**: T1555.003
- **Description**: Extract cookies from Google Chrome browser
- **Commands**: sqlite3 queries on Chrome Cookies database
- **Database**: ~/Library/Application Support/Google/Chrome/[profile]/Cookies
- **Test Type**: Default (cookie database query)
- **Cleanup**: Remove copied database and output

### 009_firefox_password_extraction.yaml
- **UUID**: 12345678-1234-1234-1234-000000000009
- **Technique**: T1555.003
- **Description**: Extract stored passwords from Firefox browser
- **Commands**: sqlite3 queries on logins.sqlite
- **Database**: ~/Library/Application Support/Firefox/Profiles/*/logins.sqlite
- **Test Type**: Default (profile detection)
- **Cleanup**: Remove extracted password file

### 010_browser_cache_access.yaml
- **UUID**: 12345678-1234-1234-1234-000000000010
- **Technique**: T1555.003
- **Description**: Access and extract data from browser cache files
- **Commands**: File copy operations for cache directories
- **Locations**: Safari LocalStorage, Chrome Cache
- **Test Type**: Default (cache directory verification)
- **Cleanup**: Remove extracted cache directory

## File System-Based TTPs (011-015)

### 011_ssh_key_discovery.yaml
- **UUID**: 12345678-1234-1234-1234-000000000011
- **Technique**: T1555
- **Description**: Discover and access SSH private keys on the system
- **Commands**: find, ls operations on ~/.ssh directory
- **Key Types**: id_rsa, id_ed25519, id_ecdsa
- **Test Type**: Default (key discovery)
- **Cleanup**: Remove discovery results

### 012_git_credentials_extraction.yaml
- **UUID**: 12345678-1234-1234-1234-000000000012
- **Technique**: T1555
- **Description**: Extract stored git credentials and token configurations
- **Files**: ~/.gitconfig, ~/.config/git/credentials
- **Test Type**: Default (config file access)
- **Cleanup**: Remove extracted credentials

### 013_aws_credentials_extraction.yaml
- **UUID**: 12345678-1234-1234-1234-000000000013
- **Technique**: T1555
- **Description**: Extract AWS credentials from ~/.aws/ directory
- **Files**: ~/.aws/credentials, ~/.aws/config
- **Test Type**: Default (credentials directory access)
- **Cleanup**: Remove extracted credentials

### 014_api_keys_in_documents.yaml
- **UUID**: 12345678-1234-1234-1234-000000000014
- **Technique**: T1552.007
- **Description**: Search for API keys and credentials in common document locations
- **Directories**: ~/Documents, ~/Downloads, ~/.config
- **File Types**: .json, .yaml, .env, .conf, .txt
- **Test Type**: Default (document search)
- **Cleanup**: Remove found keys list

### 015_kubernetes_config_access.yaml
- **UUID**: 12345678-1234-1234-1234-000000000015
- **Technique**: T1555
- **Description**: Access and extract Kubernetes configuration files and credentials
- **Files**: ~/.kube/config, /etc/kubernetes/admin.conf
- **Commands**: kubectl config operations
- **Test Type**: Default (kubeconfig access)
- **Cleanup**: Remove extracted configuration

## Tactical Mapping

All TTPs map to the **Credential Access** MITRE ATT&CK tactic:
- **T1555**: Credentials from Password Stores
- **T1555.001**: Keychain
- **T1555.003**: Web Browser
- **T1552.007**: Unsecured Credentials (documents/files)

## Features

- **YAML Format**: api_version 2.0 compliant
- **Cross-Platform**: All configured for darwin (macOS)
- **Parameterized**: Customizable paths, output locations, and targets
- **Verification**: Built-in checks for output validation
- **Cleanup**: Automatic cleanup of extracted data
- **Dry-run Safe**: Destructive operations use dry_run test type

## Usage

Each TTP includes:
1. **args**: Customizable parameters with defaults
2. **steps**: Sequential commands to execute
3. **checks**: Verification of successful execution
4. **tests**: Pre-execution tests with dry_run or default modes
5. **cleanup**: Post-execution cleanup commands

## Security Considerations

- TTPs perform read-only operations where possible
- Destructive operations include cleanup steps
- File permissions are checked before access
- No permanent modifications to system state
- All extracted data is temporary unless specified
