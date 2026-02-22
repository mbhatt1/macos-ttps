---
title: Getting Started
---

# Getting Started

## Install TTPForge

```bash
curl https://raw.githubusercontent.com/facebookincubator/TTPForge/main/dl-rl.sh | bash
export PATH=$HOME/.local/bin:$PATH
```

## Run a TTP

### Dry Run (Safe)

```bash
ttpforge run discovery/001-macos-os-version-hardware.yaml --dry-run
```

### Full Execution

```bash
ttpforge run discovery/001-macos-os-version-hardware.yaml
```

### With Custom Arguments

```bash
ttpforge run exfiltration/006-upload-curl-http.yaml \
  --arg file_path=/tmp/test.txt \
  --arg remote_url=http://example.com/upload
```

## Validate All TTPs

```bash
for ttp in $(find . -name "*.yaml" -not -path "./node_modules/*" -not -path "./docs/*"); do
  ttpforge validate "$ttp" || echo "Failed: $ttp"
done
```

## TTP File Structure

Every TTP follows the TTPForge API 2.0 schema:

```yaml
---
api_version: 2.0
uuid: unique-identifier
name: Human-Readable Name
authors:
  - author_name
description: |
  What this TTP does.
mitre:
  tactics:
    - "TA0001 Initial Access"
  techniques:
    - "T1566 Phishing"
requirements:
  platforms:
    - os: darwin
args:
  - name: target_url
    description: Target URL
    type: string
    default: http://example.com
steps:
  - name: step_name
    inline: |
      echo "Commands to execute"
    cleanup:
      inline: |
        echo "Cleanup commands"
tests:
  - name: dry_run_test
    dry_run: true
```

## Links

- [TTPForge](https://github.com/facebookincubator/TTPForge) - The execution engine
- [ForgeArmory](https://github.com/facebookincubator/ForgeArmory) - Community TTP collection
