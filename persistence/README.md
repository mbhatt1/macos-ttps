# macOS Persistence TTPs (001-015)

This directory contains 15 Tactical Technique Procedures (TTPs) demonstrating various macOS persistence mechanisms. Each TTP is defined in YAML format compatible with TTPForge.

## TTP Categories

### LaunchAgent/LaunchDaemon Based (001-004)
- **001**: Create LaunchAgent plist - Creates a new LaunchAgent for user-level persistence
- **002**: Create LaunchDaemon plist - Creates a new LaunchDaemon for system-level persistence
- **003**: Modify existing LaunchAgent - Injects code into existing LaunchAgent files
- **004**: Schedule with launchctl - Uses launchctl to load and manage persistence agents

### Shell Initialization (005-008)
- **005**: Modify ~/.zshrc - Injects code into zsh shell initialization
- **006**: Modify ~/.bashrc - Injects code into bash shell initialization
- **007**: Modify ~/.zprofile - Injects code into zsh login profile
- **008**: Modify login.plist - Sets LoginHook for persistence at user login

### File/Directory Based (009-012)
- **009**: Create hidden backup script - Creates hidden script with cron persistence
- **010**: Inject into application bundle - Modifies application executables
- **011**: Cron job creation - Schedules tasks via crontab
- **012**: At job scheduling - Uses the at daemon for delayed execution

### Browser/App Based (013-015)
- **013**: Safari extension injection - Injects malicious Safari extension
- **014**: Browser cache persistence - Uses browser cache for backdoor installation
- **015**: Application support directory backdoor - Creates backdoor in app support directory

## TTP Structure

Each TTP contains:
- **api_version**: 2.0 (TTPForge API version)
- **uuid**: Unique identifier for the TTP
- **name**: Human-readable name
- **description**: Detailed description of the persistence mechanism
- **mitre_attack_id**: MITRE ATT&CK technique ID
- **platforms**: Target OS (darwin for macOS)
- **requirements**: Platform requirements
- **args**: Customizable parameters with defaults
- **steps**: Execution steps (create_file, shell_command)
- **checks**: Verification steps to confirm execution
- **cleanup**: Steps to remove artifacts and restore system

## Usage

Each TTP can be customized via arguments before execution:

```yaml
args:
  parameter_name:
    description: Parameter description
    type: string/int/bool
    default: default_value
```

## MITRE ATT&CK Coverage

- **T1547.011**: Boot or Logon Initialization Scripts - Plist Modification
- **T1156**: Shell initialization files (.zshrc, .bashrc, .zprofile)
- **T1547.015**: Login Items
- **T1053.007**: Cron scheduling
- **T1053.001**: At daemon scheduling
- **T1547.010**: Application Shimming
- **T1176**: Browser Extensions
- **T1185**: Browser Session Hijacking

## Security Considerations

These TTPs are for authorized security testing and educational purposes only. Use only in controlled environments with proper authorization. Each TTP includes cleanup functionality to restore the system to its original state.
