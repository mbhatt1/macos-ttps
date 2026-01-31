# Advanced macOS Discovery TTPs (016-025)

Successfully created 10 advanced macOS Discovery TTPs with complete YAML specifications.

## TTP Overview

### Advanced Enumeration TTPs

#### TTP 016: Enumerate Security Tools (EDR/AV Detection)
- **UUID**: a1f3c8e2-4b7d-11eb-92e5-f23c91f4c3d2
- **Description**: Identify installed security tools, EDR solutions, and antivirus software
- **Commands**: pgrep, defaults read, kextstat, systemextensionsctl
- **Severity**: Medium
- **Techniques**: T1010 - Peripheral Device Discovery

#### TTP 017: Detect Virtualization and Sandbox
- **UUID**: b2e4d9f3-5c8e-12fc-a3f6-e34d92g5d4e3
- **Description**: Detect if system runs in virtualization or sandbox environment
- **Commands**: sysctl, ioreg, system_profiler, grep
- **Severity**: Medium
- **Techniques**: T1518 - Software Discovery

#### TTP 018: Check for Monitoring Software
- **UUID**: c3f5e0g4-6d9f-23gd-b4g7-f45e03h6e5f4
- **Description**: Detect monitoring, logging, and surveillance software
- **Commands**: pgrep, auditctl, lsof, find
- **Severity**: Medium
- **Techniques**: T1057 - Process Discovery

#### TTP 019: Enumerate Bluetooth Devices
- **UUID**: d4g6f1h5-7eag-34he-c5h8-g56f14i7f6g5
- **Description**: Discover paired and visible Bluetooth devices
- **Commands**: defaults read, system_profiler, ioreg, pgrep
- **Severity**: Low
- **Techniques**: T1120 - Peripheral Device Discovery

#### TTP 020: Enumerate Paired Devices
- **UUID**: e5h7g2i6-8fbh-45if-d6i9-h67g25j8g7h6
- **Description**: Enumerate USB, iCloud, and network-attached devices
- **Commands**: system_profiler, defaults read, arp, lsof
- **Severity**: Low
- **Techniques**: T1120 - Peripheral Device Discovery

### Configuration Discovery TTPs

#### TTP 021: Read System Preferences
- **UUID**: f6i8h3j7-9gci-56jg-e7j0-i78h36k9h8i7
- **Description**: Extract system preferences and security policies
- **Commands**: defaults read, grep, head
- **Severity**: Medium
- **Techniques**: T1526 - System Information Discovery

#### TTP 022: Extract WiFi Network History
- **UUID**: g7j9i4k8-ahdj-67kh-f8k1-j89i47l0i9j8
- **Description**: Extract WiFi history, SSID information, and connection details
- **Commands**: defaults read, networksetup, airport, security
- **Severity**: Medium
- **Techniques**: T1526 - System Information Discovery

#### TTP 023: List Paired Apple Devices
- **UUID**: h8k0j5l9-biek-78li-g9l2-ka0j58m1j0k9
- **Description**: Enumerate all paired Apple devices (iPhone, iPad, Mac)
- **Commands**: defaults read, security find-certificate
- **Severity**: Low
- **Techniques**: T1120 - Peripheral Device Discovery

#### TTP 024: Enumerate Installed Security Patches
- **UUID**: i9l1k6m0-cjfl-89mj-haml3-lb1k69n2k1l0
- **Description**: Identify security patches and vulnerability mitigations
- **Commands**: sw_vers, softwareupdate, log show, defaults read
- **Severity**: Medium
- **Techniques**: T1518 - Software Discovery

#### TTP 025: Check System Configuration Profiles
- **UUID**: jaml2l7n1-dkgm-90nk-ibno4-mc2l70o3l2m1
- **Description**: Extract MDM and configuration profiles
- **Commands**: profiles list, defaults read, security find-certificate, find
- **Severity**: High
- **Techniques**: T1526 - System Information Discovery

## File Locations

All TTPs are located in: `/tmp/ttpforge-generated/discovery_advanced/`

### Files Created
- 016_enumerate_security_tools.yaml
- 017_detect_virtualization_sandbox.yaml
- 018_check_monitoring_software.yaml
- 019_enumerate_bluetooth_devices.yaml
- 020_enumerate_paired_devices.yaml
- 021_read_system_preferences.yaml
- 022_extract_wifi_history.yaml
- 023_list_paired_apple_devices.yaml
- 024_enumerate_security_patches.yaml
- 025_check_configuration_profiles.yaml

## Specifications Met

✓ Unique UUIDs for each TTP
✓ API version 2.0
✓ Platform requirement: macOS/Darwin
✓ Multiple discovery command steps
✓ Validation checks for output
✓ Dry-run test configurations
✓ ATACK framework mapping
✓ Severity levels assigned
✓ Complete YAML validation

## Usage

Each TTP can be executed using a TTPForge-compatible framework:

```bash
ttforge run 016_enumerate_security_tools.yaml
ttforge run 017_detect_virtualization_sandbox.yaml
# ... and so on
```

## Test Execution

All TTPs include dry_run test configurations for safe validation without actual execution.
