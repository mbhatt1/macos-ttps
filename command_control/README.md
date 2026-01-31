# macOS Command & Control (C2) TTPs

This directory contains 10 Technique Testing Procedures (TTPs) for macOS Command and Control scenarios.

## Overview

These TTPs simulate common C2 communication and remote access patterns used by adversaries:

### Network Communication TTPs (001-005)
1. **001 - DNS Resolution Testing**: Basic DNS query capabilities for C2 connectivity
2. **002 - DNS Tunneling Capability**: Detection of DNS tunneling for covert communications
3. **003 - HTTP Beacon Simulation**: HTTP beacon communication with C2 server
4. **004 - HTTPS Beacon with Custom Headers**: HTTPS beacon with authentication headers
5. **005 - Reverse Shell Setup Detection**: Reverse shell callback attempts

### Remote Access TTPs (006-008)
6. **006 - SSH Tunneling Capability**: SSH-based C2 communication and tunneling
7. **007 - VNC Connection Attempts**: Remote desktop access via VNC
8. **008 - Remote Desktop via ARD**: Apple Remote Desktop connectivity

### Data Exfiltration & Callbacks (009-010)
9. **009 - Slack Message Exfiltration**: Data exfiltration via Slack webhook
10. **010 - Webhook Callback Testing**: Generic webhook callback mechanisms

## TTP Structure

Each TTP includes:
- **api_version**: 2.0
- **id**: Unique identifier
- **name**: Human-readable name
- **description**: Detailed description
- **type**: command_and_control
- **requirements**: macOS (darwin) platform requirement
- **args**: Configurable parameters with defaults
- **steps**: Sequential testing commands
- **checks**: Validation criteria
- **test_type**: dry_run (safe testing) or default
- **cleanup**: Connection closure and cache clearing
- **metadata**: Creation date, severity, category

## Usage

To test a TTP:
```bash
# Example: Test DNS resolution
ttpforge run 001_dns_resolution_testing.yaml --target_domain example.com

# Example: Test HTTP beacon
ttpforge run 003_http_beacon_simulation.yaml --c2_url http://c2-server.local:8080

# Example: Test SSH tunneling
ttpforge run 006_ssh_tunneling_capability.yaml --ssh_host c2.example.com --ssh_user admin
```

## Safety Features

All TTPs include:
- Dry-run mode for safe testing
- Timeout parameters to prevent hanging
- Cleanup steps to close connections
- Optional administrative steps
- No actual payload delivery without explicit configuration

## Customization

Edit the `args` section in each YAML file to customize:
- Target hosts and ports
- Authentication tokens
- Timeouts and retry counts
- Endpoints and paths

## Security Considerations

These TTPs should only be used in authorized testing environments with proper approvals:
- Laboratory networks
- Red team exercises
- Authorized penetration testing
- Security awareness training

