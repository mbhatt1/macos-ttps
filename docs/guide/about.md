---
title: About
---

# About

## What is this project?

This is a collection of 203 Tactics, Techniques, and Procedures (TTPs) for macOS and Linux security testing. All TTPs are written in the [TTPForge](https://github.com/facebookincubator/TTPForge) API 2.0 YAML format for automated execution.

## What is TTPForge?

TTPForge is an open-source framework by Meta (Facebook Incubator) for executing and managing security testing procedures. It provides:

- YAML-based TTP definitions
- Automated step execution with cleanup
- Dry-run testing capability
- MITRE ATT&CK mapping
- Argument parameterization

## What is MITRE ATT&CK?

[MITRE ATT&CK](https://attack.mitre.org/) is a knowledge base of adversary tactics and techniques based on real-world observations. This project maps each TTP to specific:

- **Tactics** - The adversary's goal (e.g., Initial Access, Persistence)
- **Techniques** - How the goal is achieved (e.g., Phishing, LaunchAgent)
- **Subtechniques** - Specific variations of a technique

## Schema Reference

### Top-Level Fields

| Field | Required | Description |
|-------|----------|-------------|
| `api_version` | Yes | Always `2.0` |
| `uuid` | Yes | Unique identifier |
| `name` | Yes | Human-readable name |
| `authors` | Yes | List of authors |
| `description` | Yes | What the TTP does |
| `mitre` | Yes | ATT&CK mapping |
| `requirements` | Yes | Platform requirements |
| `args` | No | Parameterized inputs |
| `steps` | Yes | Execution steps |
| `tests` | Yes | Test configurations |

### Step Types

**Inline** - Execute shell commands:
```yaml
steps:
  - name: enumerate_users
    inline: |
      dscl . list /Users | grep -v '^_'
```

**Create File** - Create a file with contents:
```yaml
steps:
  - name: create_payload
    create_file: /tmp/payload.sh
    contents: |
      #!/bin/bash
      whoami
    mode: 0755
    cleanup: default
```

### Cleanup

Cleanup runs automatically after execution (or on failure):

```yaml
steps:
  - name: create_launchagent
    inline: |
      cp plist ~/Library/LaunchAgents/
    cleanup:
      inline: |
        rm -f ~/Library/LaunchAgents/com.example.plist
```
