## MODIFIED Requirements

### Requirement: Implementation phase produces OpenSpec artifacts

Every non-trivial change SHALL be tracked as an OpenSpec change with the spec-driven schema. Claude SHALL work autonomously through the full lifecycle. Branches SHALL use the `SCOPE/IP-NUMBER-DESCRIPTION` naming convention.

#### Scenario: Autonomous propose workflow
- **WHEN** work begins on a feature via `/opsx:propose`
- **THEN** Claude SHALL autonomously:
  1. Checkout main and pull latest: `git checkout main && git pull`
  2. Determine SCOPE (`feature`, `bugfix`, `hotfix`, `release`) from the change description
  3. Find the next IP number by scanning branches: `git branch -a | grep -oP 'IP-\d+' | sort -t- -k2 -n | tail -1`
  4. Create branch: `git checkout -b SCOPE/IP-NUMBER-DESCRIPTION`
  5. Detect change scope and run all relevant plan reviews
  6. Create the OpenSpec change with proposal, design, specs, and tasks
- **AND** no commit or push SHALL happen automatically

#### Scenario: Branch name examples
- **WHEN** creating branches
- **THEN** valid names include:
  - `feature/IP-001-branch-naming-convention`
  - `bugfix/IP-002-fix-trade-status`
  - `hotfix/IP-003-backup-crash`
  - `release/IP-004-v1-0-0`
