## MODIFIED Requirements

### Requirement: Build phase produces OpenSpec artifacts
Every non-trivial change SHALL be tracked as an OpenSpec change using the spec-driven schema. The Build phase SHALL begin by creating a new branch from the latest main. Before generating artifacts, Claude SHALL automatically analyze the change scope and run all relevant plan reviews.

#### Scenario: Creating a new change with autonomous reviews
- **WHEN** work begins on a feature via `/opsx:propose`
- **THEN** the workflow SHALL:
  1. Create branch: `git checkout main && git pull && git checkout -b opsx/<change-name>`
  2. Analyze the change description to determine scope (UI, Bitcoin, security, testing, product)
  3. Run all relevant plan reviews automatically based on scope
  4. Generate OpenSpec artifacts (proposal, design, specs, tasks)
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

#### Scenario: Branch already exists
- **WHEN** `/opsx:propose` detects that `opsx/<change-name>` already exists
- **THEN** the workflow SHALL ask the developer whether to reuse the existing branch or create a fresh one

#### Scenario: Implementing tasks
- **WHEN** artifacts are complete and tasks are ready
- **THEN** run `/opsx:apply` to work through tasks systematically
- **AND** work SHALL remain local — no automatic push

#### Scenario: Exploring before committing
- **WHEN** requirements are unclear or multiple approaches exist
- **THEN** run `/opsx:explore` to think through ideas before writing artifacts

### Requirement: Archiving completed changes
Archiving SHALL be the point at which all work is committed and pushed to the remote.

#### Scenario: Archive commits and pushes
- **WHEN** `/opsx:archive` completes successfully
- **THEN** all uncommitted work SHALL be staged, committed, and pushed to origin

#### Scenario: Archive with nothing to push
- **WHEN** all work was already committed and pushed manually
- **THEN** `/opsx:archive` SHALL skip the push step gracefully
