# Quick Reference Guide: TTPs 041-050

## Attack Categories

### Physical Access Attacks
- **TTP-041**: USB Device Injection
- **TTP-042**: Malicious Peripheral Connection  
- **TTP-050**: Bluetooth Device Pairing

### Web-Based Attacks
- **TTP-043**: Watering Hole Attack
- **TTP-044**: Drive-by Download
- **TTP-045**: Malvertising Campaign

### Supply Chain & Relationships
- **TTP-046**: Trusted Relationship Abuse

### Credential-Based
- **TTP-047**: Service Account Compromise

### Network Attacks
- **TTP-048**: Insecure Wireless Network
- **TTP-049**: Man-in-the-Middle Attack

---

## Key Arguments by TTP

| TTP | Primary Arguments |
|-----|-------------------|
| 041 | target_device, injection_type, malware_payload, usb_label |
| 042 | target_device, peripheral_type, peripheral_id, command_payload |
| 043 | target_website, malware_url, injection_point, payload_type |
| 044 | malicious_url, download_destination, file_type, browser_user_agent |
| 045 | advertising_network, malware_url, target_website, ad_type, payload_type |
| 046 | trusted_entity, target_organization, delivery_vector, malware_url |
| 047 | service_name, target_system, access_type, credential_source |
| 048 | network_ssid, network_security, target_device, malware_url |
| 049 | target_ip, gateway_ip, attack_type, malicious_ip |
| 050 | target_device, bluetooth_device, device_type, pairing_method |

---

## Standard Structure

Each TTP includes:
- **5 Attack Steps**: Detection/Enumeration → Preparation → Staging → Execution → Verification
- **3 Verification Checks**: Resource validation → Delivery confirmation → Impact verification
- **Dry-run Tests**: All tests set to dry_run: true for safe simulation
- **Cleanup Functions**: Automatic artifact removal

---

## File Locations

All files located in: `/tmp/ttpforge-generated/initial_access/`

- TTP-041: `041_usb_device_injection.yaml`
- TTP-042: `042_malicious_peripheral_connection.yaml`
- TTP-043: `043_watering_hole_attack.yaml`
- TTP-044: `044_drive_by_download.yaml`
- TTP-045: `045_malvertising_campaign.yaml`
- TTP-046: `046_trusted_relationship_abuse.yaml`
- TTP-047: `047_service_account_compromise.yaml`
- TTP-048: `048_insecure_wireless_network.yaml`
- TTP-049: `049_man_in_the_middle_attack.yaml`
- TTP-050: `050_bluetooth_device_pairing.yaml`

---

## Usage Pattern

Each TTP follows:
1. **Arguments**: Configure attack parameters
2. **Steps**: Execute attack simulation sequence
3. **Checks**: Verify each phase completed
4. **Tests**: Safe dry-run validation
5. **Cleanup**: Remove all artifacts

---

## Validation Status

All 10 TTPs: **PASSED** (100% validation success)

- YAML Syntax: Valid
- Structure: Compliant
- Fields: Complete
- Ready for: Purple team exercises

---

Generated: 2026-01-30  
Format: ttpforge YAML v2.0
