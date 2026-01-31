# macOS Initial Access TTPs - Phishing & Social Engineering

## Overview

This directory contains 10 meticulously crafted macOS Initial Access TTPs (Tactics, Techniques, and Procedures) focused on phishing and social engineering attacks. All TTPs are designed for authorized security testing, red team exercises, and security awareness training.

**Generation Date:** 2025-01-30  
**Total TTPs:** 10  
**Platform:** darwin (macOS)  
**API Version:** 2.0  
**Validation Status:** 10/10 PASSED  

## Quick Start

### Validate All TTPs
```bash
for file in {001..010}-*.yaml; do
  ttpforge validate "$file"
done
```

### Execute a TTP
```bash
# With default parameters
ttpforge run 001-phishing-email-detection.yaml

# With custom parameters
ttpforge run 007-spear-phishing-simulation.yaml \
  --var victim_name="Jane Doe" \
  --var victim_company="Example Corp"
```

## TTP Descriptions

### 001: Phishing Email Detection
**UUID:** `69c4df6c-8e3b-4f2a-9b1c-7e5d2f4a8c3b`

Demonstrates phishing email detection by simulating a malicious email with spoofed sender addresses, urgency tactics, and suspicious links commonly used in phishing campaigns.

**Key Features:**
- Spoofed sender detection
- Urgency tactic simulation
- Suspicious link analysis
- Email header inspection

**Customizable Args:**
- `attacker_email` - Spoofed sender (default: security-alert@paypa1.com)
- `target_user` - Target email (default: user@company.com)
- `phishing_link` - Suspicious URL
- `urgency_message` - Urgency text

---

### 002: Malicious Attachment Analysis
**UUID:** `7a2b9e1f-4c6d-4e3a-8b5c-1f9d2e4a7c3b`

Demonstrates malicious attachment analysis by creating and analyzing suspicious file attachments commonly used in phishing campaigns, simulating detection of dangerous file types and embedded macros.

**Key Features:**
- Macro-enabled document simulation
- File type analysis
- Risk assessment
- Quarantine procedures

**Customizable Args:**
- `attachment_name` - File name (default: Invoice_2025.docm)
- `attachment_type` - File extension (default: docm)
- `sender_email` - Sender address
- `target_user` - Recipient

---

### 003: Credential Harvesting Form Setup
**UUID:** `8c3d1e5f-2b9a-4c7d-6f8e-3a1b5c9d2e4f`

Demonstrates credential harvesting form setup by creating a fake login form that mimics legitimate company portals, including form submission handlers and credential capture mechanisms.

**Key Features:**
- HTML form generation
- Portal impersonation
- Submission endpoint configuration
- Credential capture simulation

**Customizable Args:**
- `target_service` - Service impersonated (default: Office365)
- `form_domain` - Attacker domain
- `harvest_endpoint` - Submission URL

---

### 004: Fake Login Page Creation
**UUID:** `9d4e2f6a-3c1b-4d7e-8a5c-2f9b1e3d6c7a`

Demonstrates fake login page creation by generating a convincing replica of legitimate authentication portals, including branding elements, SSL indicators, and credential capture mechanisms.

**Key Features:**
- Brand impersonation
- Professional styling
- SSL indicators
- User-friendly interface

**Customizable Args:**
- `target_company` - Company name (default: Apple)
- `fake_domain` - Attacker domain
- `logo_url` - Company logo URL

---

### 005: Social Engineering Scenario
**UUID:** `1a5f3b8c-9e2d-4f7a-6c1b-3e5d8a2f4c9b`

Demonstrates social engineering scenario execution by creating multi-stage manipulation tactics including pretexting, authority impersonation, and creating false urgency to manipulate targets.

**Key Features:**
- Authority impersonation
- Urgency creation
- Multi-stage manipulation
- Rapport building techniques

**Customizable Args:**
- `attacker_persona` - False identity (default: John Smith, IT Support Manager)
- `target_department` - Target department (default: Finance)
- `urgency_reason` - Pressure tactic (default: Security audit)
- `pretext_story` - Cover story

---

### 006: Phishing Link Detection
**UUID:** `2b6c4a9d-5e1f-4b8a-7d3c-1f4a8e2b5d6c`

Demonstrates phishing link detection and analysis by identifying suspicious URLs embedded in emails, including analysis of domain similarity, SSL certificate indicators, and link obfuscation techniques.

**Key Features:**
- Domain similarity analysis
- SSL certificate verification
- Obfuscation technique detection
- URL reputation checking

**Customizable Args:**
- `legitimate_domain` - Real domain (default: microsoft.com)
- `phishing_url` - Suspicious URL
- `obfuscation_method` - Technique used

---

### 007: Spear Phishing Simulation
**UUID:** `3c7d5b0e-6f2a-4e9b-8a1d-2c5e7f1a3d8b`

Demonstrates spear phishing simulation with highly targeted attacks using specific victim information. Includes personalized content, contextual details, and advanced social engineering to increase success rate.

**Key Features:**
- Intelligence gathering
- Personalized email crafting
- Context-aware landing pages
- Multi-stage execution planning

**Customizable Args:**
- `victim_name` - Target name (default: Sarah Johnson)
- `victim_title` - Job title (default: Finance Director)
- `victim_company` - Company (default: TechCorp Industries)
- `sender_name` - Spoofed identity (default: David Chen, CEO)
- `specific_project` - Real project name

---

### 008: Pretexting Phone Calls
**UUID:** `4d8e6c1f-7a3b-5e0c-9f2d-3a6b7c1e4f2a`

Demonstrates pretexting phone call execution where attackers use false pretenses to manipulate victims into divulging sensitive information. Includes caller ID spoofing, script development, and recovery tactics.

**Key Features:**
- Call script development
- Authority establishment
- Information extraction techniques
- Recovery tactics
- Caller ID spoofing setup

**Customizable Args:**
- `attacker_role` - False role (default: IT Support Technician)
- `company_name` - Impersonated company (default: ABC Technology Solutions)
- `target_person` - Victim (default: Robert Martinez)
- `spoofed_number` - Caller ID to spoof

---

### 009: Whaling Campaign
**UUID:** `5e9f7d2a-8b4c-6f1e-0a3d-4c7e8f2a1b5d`

Demonstrates whaling campaign execution (phishing targeting C-level executives) with highly sophisticated social engineering and advanced reconnaissance. Includes executive-level targeting and financial crime scenarios.

**Key Features:**
- Executive reconnaissance
- Business context exploitation
- Wire fraud simulation
- Fake legal documentation
- Authority impersonation

**Customizable Args:**
- `executive_name` - Target executive (default: James Richardson, CEO)
- `company_name` - Target company (default: GlobalTech Corporation)
- `business_context` - Current activity (default: pending acquisition)
- `attack_vector` - Attack method (default: urgent wire transfer)

---

### 010: Business Email Compromise
**UUID:** `6fa08e3b-9c5d-7f2a-1e4b-8d6c9f3e2a1b`

Demonstrates Business Email Compromise (BEC) attack execution where attackers compromise or spoof executive emails to conduct fraud. Includes account takeover, email manipulation, and fraudulent transaction authorization.

**Key Features:**
- Account compromise simulation
- Email manipulation
- Post-compromise persistence
- Fraudulent transaction execution
- Money laundering scenarios

**Customizable Args:**
- `compromised_email` - Email account (default: cfo@company.com)
- `compromised_person_name` - Executive (default: Patricia Anderson, CFO)
- `compromised_department` - Department (default: Finance/Accounting)
- `target_payment_processor` - Payment handler

---

## Technical Details

### Common Features

All TTPs include:
- **Unique UUIDs** for identification
- **API Version 2.0** compliance
- **Darwin Platform** specification
- **Customizable Arguments** (3-5 per TTP)
- **Step-by-Step Execution** with atomic actions
- **Verification Checks** (3+ per TTP)
- **Comprehensive Logging** with timestamps
- **Automatic Cleanup** of all artifacts
- **Dry Run Mode** for safe testing

### File Specifications

| TTP | Filename | Size | Lines | Status |
|-----|----------|------|-------|--------|
| 001 | 001-phishing-email-detection.yaml | 2.9 KB | 120 | PASS |
| 002 | 002-malicious-attachment-analysis.yaml | 3.1 KB | 135 | PASS |
| 003 | 003-credential-harvesting-form.yaml | 3.9 KB | 175 | PASS |
| 004 | 004-fake-login-page-creation.yaml | 6.4 KB | 280 | PASS |
| 005 | 005-social-engineering-scenario.yaml | 5.7 KB | 245 | PASS |
| 006 | 006-phishing-link-detection.yaml | 5.4 KB | 235 | PASS |
| 007 | 007-spear-phishing-simulation.yaml | 9.4 KB | 410 | PASS |
| 008 | 008-pretexting-phone-calls.yaml | 8.7 KB | 380 | PASS |
| 009 | 009-whaling-campaign.yaml | 13 KB | 560 | PASS |
| 010 | 010-business-email-compromise.yaml | 16 KB | 680 | PASS |
| **TOTAL** | **10 files** | **~73 KB** | **~2,153 lines** | **10/10** |

## Usage Examples

### Validate a Single TTP
```bash
ttpforge validate 001-phishing-email-detection.yaml
```

### Execute with Default Parameters
```bash
ttpforge run 007-spear-phishing-simulation.yaml
```

### Execute with Custom Parameters
```bash
ttpforge run 007-spear-phishing-simulation.yaml \
  --var victim_name="John Doe" \
  --var victim_title="VP Operations" \
  --var victim_company="Acme Corp" \
  --var sender_name="CEO Name" \
  --var specific_project="Project X"
```

### Batch Validation
```bash
#!/bin/bash
for file in {001..010}-*.yaml; do
  echo "Validating: $file"
  ttpforge validate "$file"
done
```

### Batch Execution
```bash
#!/bin/bash
for file in {001..010}-*.yaml; do
  echo "Running: $file"
  ttpforge run "$file" --dry-run
done
```

## Security Considerations

### Authorized Use Only
These TTPs are designed exclusively for:
- Authorized security testing
- Red team exercises with documented scope
- Security awareness training programs
- Vulnerability assessments
- Incident response development

### Safe Execution
- All TTPs run in **dry-run mode** (non-destructive)
- Files created only in **/tmp/** (isolated environment)
- No actual emails are sent
- No real systems are compromised
- Automatic cleanup removes all evidence

### Requirements
- Explicit written authorization required
- Clear scope definition
- Stakeholder briefing
- Audit logging
- Results documentation

## Deployment Guidelines

### For Security Awareness Training
1. Use TTP 001 for phishing email recognition training
2. Use TTP 002 for attachment risk education
3. Use TTP 007 for spear phishing awareness (executives)
4. Use TTP 009 for whaling threat briefings

### For Red Team Exercises
1. Execute TTP 007 with proper authorization
2. Document success metrics
3. Gather user response times
4. Record reported emails
5. Provide feedback to organization

### For Vulnerability Assessment
1. Execute complete TTP suite
2. Identify susceptible users
3. Test email filtering effectiveness
4. Evaluate response procedures
5. Recommend improvements

### For Incident Response
1. Review BEC procedures (TTP 010)
2. Update detection rules
3. Refine response playbooks
4. Train response team
5. Document lessons learned

## Customization

Edit the `arguments` section in any YAML file to customize parameters:

```yaml
arguments:
  victim_name:
    description: 'Name of targeted individual'
    type: 'string'
    default: 'Your Custom Name'
```

## Support

For ttpforge documentation and support:
- GitHub: https://github.com/atomics/atomics
- Format: YAML 1.2 API Version 2.0
- Validation: `ttpforge validate <file>`

## Recommendations

1. **Train Users Regularly** - Use phishing simulations quarterly
2. **Update Security Controls** - Based on TTP findings
3. **Document Procedures** - Create response playbooks
4. **Share Lessons** - Communicate security improvements
5. **Continuous Testing** - Schedule regular assessments

## Files in This Directory

```
001-phishing-email-detection.yaml
002-malicious-attachment-analysis.yaml
003-credential-harvesting-form.yaml
004-fake-login-page-creation.yaml
005-social-engineering-scenario.yaml
006-phishing-link-detection.yaml
007-spear-phishing-simulation.yaml
008-pretexting-phone-calls.yaml
009-whaling-campaign.yaml
010-business-email-compromise.yaml
README.md (this file)
```

## Additional Documentation

See also:
- `PHISHING_SE_VALIDATION_REPORT.md` - Detailed validation results
- `FINAL_SUMMARY.txt` - Executive summary and usage guide

## Conclusion

All 10 macOS Initial Access TTPs have been successfully generated, validated, and documented. These TTPs provide comprehensive coverage of phishing and social engineering attack techniques, suitable for:

- Security awareness training
- Red team exercises
- Vulnerability assessments
- Incident response development
- Security program evaluation

These TTPs are production-ready for authorized security testing and training purposes.

---

**Generated:** 2025-01-30  
**Status:** Validated and Production-Ready  
**Total TTPs:** 10/10 PASSED  
