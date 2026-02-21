# Linux Lateral Movement TTPs

This directory contains 10 Linux lateral movement TTPs in YAML format.

## Files Created

1. **001-ssh-pivot.yaml** - SSH Pivot
   - SSH lateral movement to remote hosts

2. **002-network-share-access.yaml** - Network Share Access via NFS
   - Access shares through NFS mounts

3. **003-docker-container-pivoting.yaml** - Docker Container Lateral Movement
   - Pivot via docker socket and container escape

4. **004-kubernetes-lateral-movement.yaml** - Kubernetes Lateral Movement
   - Exploit K8s misconfigurations

5. **005-ssh-key-reuse.yaml** - SSH Key Reuse
   - Leverage discovered SSH keys

6. **006-sudo-abuse.yaml** - Sudo Abuse
   - Exploit sudo misconfigurations

7. **007-shared-library-hijacking.yaml** - Shared Library Exploitation
   - LD_PRELOAD and library hijacking

8. **008-nfs-enumeration.yaml** - NFS Enumeration
   - Enumerate NFS exports

9. **009-smb-enumeration.yaml** - SMB Enumeration
   - Enumerate SMB shares

10. **010-ldap-enumeration.yaml** - LDAP Enumeration
    - Enumerate LDAP directory services

## YAML Structure

Each file follows the standard format with:
- api_version, id, name, description
- author, created, updated, uuid
- requirements (platform: linux)
- args (parameters with descriptions, types, defaults)
- steps (execution steps)
- checks (verification checks)
- tests (dry run tests)
- metadata (tactic, technique, references, severity)
