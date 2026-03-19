## MODIFIED Requirements

### Requirement: Build phase produces OpenSpec artifacts
Every non-trivial change SHALL be tracked as an OpenSpec change using the spec-driven schema. The Build phase SHALL begin by creating a new branch from the latest main using the `SCOPE/IP-NUMBER-DESCRIPTION` naming convention. Before generating artifacts, Claude SHALL automatically analyze the change scope and run all relevant plan reviews. Work SHALL remain local (uncommitted to remote) until archive.

#### Scenario: Creating a new change with autonomous reviews
- **WHEN** work begins on a feature via `/opsx:propose`
- **THEN** the workflow SHALL:
  1. Determine SCOPE and next IP number, create branch: `git checkout main && git pull && git checkout -b SCOPE/IP-NUMBER-DESCRIPTION`
  2. Analyze the change description to determine scope (UI, Bitcoin, security, testing, product)
  3. Run all relevant plan reviews automatically based on scope
  4. Generate OpenSpec artifacts (proposal, design, specs, tasks)
  5. Add or create entry in `IP-INDEX.md` with status `Active`
- **AND** artifacts SHALL NOT be committed or pushed automatically

#### Scenario: Scope detection triggers correct reviews
- **WHEN** Claude analyzes the change description
- **THEN** it SHALL apply these rules:
  - Always run `/plan-eng-review`
  - If change touches UI components or screens → run `/plan-design-review` and `/plan-a11y-auditor-review`
  - If change touches payments, addresses, trades, or Bitcoin protocol → run `/plan-bitcoiner-review`
  - If change touches data storage, keys, cryptography, or networking → run `/plan-cypherpunk-review`
  - If change touches testable user flows or database operations → run `/plan-automation-tester-review`
  - If change involves product scope, new features, or business decisions → run `/plan-ceo-review`

#### Scenario: Branch naming format
- **WHEN** a branch is created for a change
- **THEN** it SHALL follow `SCOPE/IP-NUMBER-DESCRIPTION` where:
  - SCOPE is one of: `feature`, `bugfix`, `hotfix`, `release`, `spec`
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
  - `spec` for changes that only modify specs, documentation, or workflow definitions
  - Default to `feature` if ambiguous

#### Scenario: Branch already exists
- **WHEN** `/opsx:propose` detects that the target `SCOPE/IP-NUMBER-DESCRIPTION` branch already exists
- **THEN** the workflow SHALL ask the developer whether to reuse the existing branch or create a fresh one

#### Scenario: Implementing tasks
- **WHEN** artifacts are complete and tasks are ready
- **THEN** run `/opsx:apply` to work through tasks systematically
- **AND** work SHALL remain local — no automatic push

#### Scenario: Exploring before committing
- **WHEN** requirements are unclear or multiple approaches exist
- **THEN** run `/opsx:explore` to think through ideas before writing artifacts
