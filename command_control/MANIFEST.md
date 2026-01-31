# macOS C2 TTP Manifest

## Complete TTP Listing

### 001: DNS Resolution Testing
- **File**: `001_dns_resolution_testing.yaml`
- **Category**: Network Communication
- **Purpose**: Tests basic DNS resolution for C2 connectivity checks
- **Commands**: dig, nslookup
- **Risk Level**: Low
- **Customizable**: target_domain, dns_server
- **Cleanup**: DNS cache flush

### 002: DNS Tunneling Capability Check
- **File**: `002_dns_tunneling_capability.yaml`
- **Category**: Network Communication
- **Purpose**: Detects DNS tunneling capabilities for covert C2 communication
- **Commands**: dig TXT queries, zone transfer attempts
- **Risk Level**: Medium
- **Customizable**: c2_domain, test_payload, dns_server
- **Cleanup**: DNS cache flush

### 003: HTTP Beacon Simulation
- **File**: `003_http_beacon_simulation.yaml`
- **Category**: Network Communication
- **Purpose**: Simulates HTTP beacon to C2 server
- **Commands**: curl GET/POST requests
- **Risk Level**: Medium
- **Customizable**: c2_url, beacon_interval, user_agent, beacon_path
- **Cleanup**: curl cache cleanup

### 004: HTTPS Beacon with Custom Headers
- **File**: `004_https_beacon_custom_headers.yaml`
- **Category**: Network Communication
- **Purpose**: HTTPS beacon with authentication headers and system metadata
- **Commands**: curl with custom headers, JSON payloads
- **Risk Level**: Medium
- **Customizable**: c2_url, api_key, user_agent, beacon_path, timeout
- **Cleanup**: SSL session cache cleanup

### 005: Reverse Shell Setup Detection
- **File**: `005_reverse_shell_setup_detection.yaml`
- **Category**: Remote Access
- **Purpose**: Detects reverse shell capabilities and C2 callback connectivity
- **Commands**: bash /dev/tcp test, nc port scan
- **Risk Level**: High
- **Customizable**: c2_host, c2_port, timeout
- **Cleanup**: Process termination (nc, bash connections)

### 006: SSH Tunneling Capability
- **File**: `006_ssh_tunneling_capability.yaml`
- **Category**: Remote Access
- **Purpose**: Tests SSH tunneling for C2 command execution and exfiltration
- **Commands**: ssh connectivity, key validation, tunnel setup
- **Risk Level**: High
- **Customizable**: ssh_host, ssh_port, ssh_user, ssh_key_path, local_port, remote_port
- **Cleanup**: SSH tunnel process termination

### 007: VNC Connection Attempts
- **File**: `007_vnc_connection_attempts.yaml`
- **Category**: Remote Access
- **Purpose**: Tests VNC remote desktop access for C2 control
- **Commands**: port connectivity checks, nc/ncat scanning, VNC client launch
- **Risk Level**: High
- **Customizable**: vnc_host, vnc_port, vnc_password, timeout
- **Cleanup**: VNC process termination

### 008: Remote Desktop via ARD (Apple Remote Desktop)
- **File**: `008_remote_desktop_ard.yaml`
- **Category**: Remote Access
- **Purpose**: Tests Apple Remote Desktop connectivity for macOS-specific remote access
- **Commands**: Port scanning, ARD service discovery, ARD client testing
- **Risk Level**: High
- **Customizable**: ard_host, ard_port, ard_username, ard_password, timeout
- **Cleanup**: ARD connection termination

### 009: Slack Message Exfiltration
- **File**: `009_slack_message_exfiltration.yaml`
- **Category**: Data Exfiltration
- **Purpose**: Tests data exfiltration via Slack webhooks and API
- **Commands**: curl POST to Slack webhook, Slack API calls
- **Risk Level**: High
- **Customizable**: slack_webhook_url, slack_channel, slack_bot_token, timeout
- **Cleanup**: curl cache cleanup

### 010: Webhook Callback Testing
- **File**: `010_webhook_callback_testing.yaml`
- **Category**: Command & Control
- **Purpose**: Tests webhook callbacks for C2 command delivery and reporting
- **Commands**: curl GET/POST to webhook, retry logic implementation
- **Risk Level**: Medium
- **Customizable**: webhook_url, callback_secret, timeout, max_retries
- **Cleanup**: curl cache and webhook connection cleanup

## TTP Statistics

| Category | Count | Risk Level | Primary Commands |
|----------|-------|-----------|------------------|
| Network Communication | 5 | Low-Medium | dig, curl |
| Remote Access | 3 | High | ssh, nc, bash |
| Data Exfiltration | 1 | High | curl |
| Command & Control | 1 | Medium | curl |
| **TOTAL** | **10** | **Mixed** | **Multiple** |

## Common Parameters Across TTPs

- **Timeout**: Connection timeout (5-10 seconds)
- **Host/IP**: Target system address (domain or IP)
- **Port**: Service port number
- **Authentication**: API keys, tokens, passwords
- **User Agent**: Custom HTTP user agent strings
- **Retry Logic**: Configurable retry attempts

## Safety Features Summary

All TTPs include:
- Dry-run testing mode enabled by default
- Timeout parameters to prevent hanging
- Cleanup procedures for connection closure
- Optional elevated permission requirements
- No active payload execution
- Command templating for safe parameter substitution
- Output validation checks

## Testing Workflow

1. **Review**: Read the YAML file to understand the test
2. **Customize**: Update args with your test environment parameters
3. **Execute**: Run with ttpforge in an authorized testing environment
4. **Monitor**: Observe output and HTTP status responses
5. **Cleanup**: Automated cleanup procedures execute upon completion

## File Integrity

All 10 YAML files:
- Valid YAML syntax
- Complete required fields
- Proper parameter templating
- Consistent structure
- README and manifest documentation

## Version History

- Created: 2026-01-30
- API Version: 2.0
- Platform: macOS (darwin)
- Generated by: Claude Code

## Notes

- These TTPs are designed for authorized security testing only
- Use in controlled lab environments with proper approvals
- Customize parameters before execution in your environment
- Review cleanup procedures to ensure connection closure
- Monitor system logs during and after TTP execution
