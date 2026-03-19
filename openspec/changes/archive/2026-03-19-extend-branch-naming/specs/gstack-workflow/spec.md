## MODIFIED Requirements

### Requirement: Implementation phase produces OpenSpec artifacts

Every non-trivial change SHALL be tracked as an OpenSpec change with the spec-driven schema. Claude SHALL work autonomously through the full lifecycle, using all relevant tools without waiting for manual skill invocations. Work SHALL remain local (uncommitted to remote) until archive.

#### Scenario: Autonomous propose workflow
- **WHEN** work begins on a feature via `/opsx:propose`
- **THEN** Claude SHALL autonomously:
  1. Checkout main and pull latest: `git checkout main && git pull`
  2. Determine SCOPE (`feature`, `bugfix`, `hotfix`, `release`, `spec`) from the change description
  3. Find next IP number by scanning branches, create branch: `git checkout -b SCOPE/IP-NUMBER-DESCRIPTION`
  4. Detect change scope for plan reviews
  5. Run all relevant plan reviews (eng, ceo, bitcoiner, cypherpunk, automation, a11y, design — based on scope)
  6. Create the OpenSpec change with proposal, design, specs, and tasks
  7. Add entry to `IP-INDEX.md` with status `Active`
- **AND** no commit or push SHALL happen automatically

#### Scenario: Branch name examples
- **WHEN** creating branches
- **THEN** valid names include:
  - `feature/IP-001-branch-naming-convention`
  - `bugfix/IP-002-fix-trade-status`
  - `hotfix/IP-003-backup-crash`
  - `release/IP-004-v1-0-0`
  - `spec/IP-005-update-workflow-docs`

#### Scenario: Branch name collision
- **WHEN** the target `SCOPE/IP-NUMBER-DESCRIPTION` branch already exists
- **THEN** the workflow SHALL ask the developer to reuse the existing branch or pick a new name
