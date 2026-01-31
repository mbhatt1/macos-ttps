# macOS TTPs

Collection of 142 macOS Tactics, Techniques, and Procedures organized by attack category.

## Contents

- **discovery** - System reconnaissance and enumeration
- **persistence** - Establish persistence mechanisms
- **privilege_escalation** - Elevation techniques
- **credential_access** - Harvest credentials
- **defense_evasion** - Avoid detection
- **command_control** - Remote access
- **lateral_movement** - Network movement
- **exfiltration** - Data theft
- **collection** - Data gathering
- **impact** - System damage

## Usage

### Install TTPForge

```bash
curl https://raw.githubusercontent.com/facebookincubator/TTPForge/main/dl-rl.sh | bash
export PATH=$HOME/.local/bin:$PATH
```

### Run a TTP

```bash
ttpforge run discovery/001-macos-os-version-hardware.yaml --dry-run
ttpforge run discovery/001-macos-os-version-hardware.yaml
```

### Validate All

```bash
for ttp in $(find . -name "*.yaml"); do
  ttpforge validate "$ttp" || echo "Failed: $ttp"
done
```

## Tools

- `create-ttp-batch.sh` - Generate TTPs in batch
- `validate-ttps.sh` - Validate collection

## Statistics

- Total: 142 TTPs
- Categories: 11
- Size: 720KB
- Format: YAML (TTPForge API 2.0)

## Links

- [TTPForge](https://github.com/facebookincubator/TTPForge)
- [ForgeArmory](https://github.com/facebookincubator/ForgeArmory)
