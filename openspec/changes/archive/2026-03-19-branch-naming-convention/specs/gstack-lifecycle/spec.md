## MODIFIED Requirements

### Requirement: Build phase produces OpenSpec artifacts
Every non-trivial change SHALL be tracked as an OpenSpec change using the spec-driven schema. The Build phase SHALL begin by creating a new branch from the latest main using the `SCOPE/IP-NUMBER-DESCRIPTION` naming convention. Before generating artifacts, Claude SHALL automatically analyze the change scope and run all relevant plan reviews. Work SHALL remain local (uncommitted to remote) until archive.

#### Scenario: Creating a new change with autonomous reviews
- **WHEN** work begins on a feature via `/opsx:propose`
- **THEN** the workflow SHALL:
  1. Determine SCOPE from the change description (`feature`, `bugfix`, `hotfix`, or `release`)
  2. Scan existing branches for the highest IP number and increment (zero-padded to 3 digits)
  3. Create branch: `git checkout main && git pull && git checkout -b SCOPE/IP-NUMBER-DESCRIPTION`
  4. Analyze the change description to determine review scope
  5. Run all relevant plan reviews automatically
  6. Generate OpenSpec artifacts (proposal, design, specs, tasks)
- **AND** artifacts SHALL NOT be committed or pushed automatically

#### Scenario: Branch naming format
- **WHEN** a branch is created for a change
- **THEN** it SHALL follow `SCOPE/IP-NUMBER-DESCRIPTION` where:
  - SCOPE is one of: `feature`, `bugfix`, `hotfix`, `release`
  - IP is the literal string "IP" (Improvement Proposal)
  - NUMBER is a zero-padded auto-incremented integer (e.g., 001, 002, 012)
  - DESCRIPTION is a short kebab-case summary of the change

#### Scenario: Scope auto-detection
- **WHEN** Claude analyzes the change description
- **THEN** it SHALL determine the scope:
  - `feature` for new functionality, capabilities, or workflows
  - `bugfix` for fixing broken behavior or correcting errors
  - `hotfix` for urgent production fixes
  - `release` for version bumps or release preparation
  - Default to `feature` if ambiguous
