## Purpose

Define the four-phase development lifecycle (Plan → Build → Verify → Ship) and map each gstack skill to its phase so the full pipeline is discoverable and repeatable.

## Requirements

### Requirement: Every change follows the four-phase lifecycle
Changes SHALL progress through Planning, Implementation, Quality, and Release phases. Phases MAY be skipped only when the change is trivially small (< 20 lines, config-only, typo fix).

#### Scenario: Full lifecycle for a feature change
- **WHEN** a new feature or significant change is proposed
- **THEN** the workflow proceeds through all four phases in order:
  1. Plan — scope and design decisions via review skills
  2. Build — OpenSpec change with proposal, design, specs, tasks
  3. Verify — functional QA, visual QA, and code review
  4. Ship — automated release via `/ship`, then docs and retro

#### Scenario: Trivial change fast path
- **WHEN** a change is < 20 lines, config-only, or a typo fix
- **THEN** the developer MAY skip directly to `/ship`
- **AND** `/ship` runs its own pre-landing review as a safety net

### Requirement: Planning phase selects reviews by change scope
The planning phase SHALL use the appropriate review skill based on what the change affects.

#### Scenario: Product or scope decision
- **WHEN** a change involves new user-facing features, scope expansion, or business tradeoffs
- **THEN** the developer SHALL run `/plan-ceo-review`

#### Scenario: Architecture or implementation decision
- **WHEN** a change involves data flow, system design, edge cases, or performance
- **THEN** the developer SHALL run `/plan-eng-review`

#### Scenario: UI/UX design decision
- **WHEN** a change involves visual design, layout, typography, color, or interaction patterns
- **THEN** the developer SHALL run `/plan-design-review`
- **OR** run `/design-consultation` to create a full design system (DESIGN.md)

#### Scenario: Large feature with cross-cutting concerns
- **WHEN** a change touches product scope, architecture, and UI
- **THEN** the developer SHALL run all three reviews in sequence: CEO → Eng → Design

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

### Requirement: Verify phase checks correctness, design, and safety
Multiple verification skills SHALL be used based on what changed.

#### Scenario: Functional QA
- **WHEN** a web-accessible feature needs testing
- **THEN** run `/qa` to test and fix bugs (or `/qa-only` for report-only)

#### Scenario: Visual QA
- **WHEN** the change includes UI modifications
- **THEN** run `/design-review` to catch spacing, hierarchy, and AI slop issues

#### Scenario: Code review
- **WHEN** code is ready for PR
- **THEN** run `/review` for pre-landing safety checks

### Requirement: Release phase ships, documents, and reflects
Shipping SHALL be automated end-to-end with documentation and retrospective closing the loop.

#### Scenario: Shipping a PR
- **WHEN** all verification is complete
- **THEN** run `/ship` to merge base, test, review, bump version, generate changelog, and create PR

#### Scenario: Post-ship documentation
- **WHEN** a PR has been merged
- **THEN** run `/document-release` to update project docs to match what shipped

#### Scenario: Weekly retrospective
- **WHEN** a week of work is complete
- **THEN** run `/retro` to analyze commit history and work patterns

#### Scenario: Archiving completed changes
- **WHEN** a change is fully implemented and `/opsx:archive` is run
- **THEN** all uncommitted work SHALL be staged, committed, and pushed to origin
- **AND** delta specs SHALL be synced to main specs
- **AND** the change directory SHALL be moved to archive

#### Scenario: Archive with nothing to push
- **WHEN** all work was already committed and pushed manually
- **THEN** `/opsx:archive` SHALL skip the push step gracefully

### Requirement: Planning phase includes domain-specific review roles
The Planning phase SHALL include two additional optional review roles for Bitcoin-domain changes.

#### Scenario: Bitcoin feature triggers Bitcoiner review
- **WHEN** a change touches payment flows, addresses, contacts with payment data, or trade operations
- **THEN** the developer SHALL be recommended to run `/plan-bitcoiner-review`

#### Scenario: Security-sensitive feature triggers Cypherpunk review
- **WHEN** a change touches data storage, network requests, key material, cryptographic operations, or metadata
- **THEN** the developer SHALL be recommended to run `/plan-cypherpunk-review`

#### Scenario: Both roles recommended together
- **WHEN** a change touches both Bitcoin protocol concerns and security concerns
- **THEN** both reviews are recommended, with Bitcoiner running before Cypherpunk

### Requirement: Planning phase includes Automation Tester review
The Planning phase SHALL include `/plan-automation-tester-review` as an optional review role for changes that touch testable user flows or modify tested code.

#### Scenario: Change touches user flows
- **WHEN** a change adds or modifies user-facing screens, forms, or multi-step interactions
- **THEN** the developer SHALL be recommended to run `/plan-automation-tester-review`

#### Scenario: Change modifies tested code
- **WHEN** a change modifies functions or modules that have existing test coverage
- **THEN** the developer SHALL be recommended to run `/plan-automation-tester-review`

#### Scenario: Trivial change skips automation tester review
- **WHEN** a change is < 20 lines, config-only, or a typo fix
- **THEN** the Automation Tester review is not recommended

### Requirement: Planning phase includes A11y Auditor review
The Planning phase SHALL include `/plan-a11y-auditor-review` as an optional review role for changes that touch UI components or screens.

#### Scenario: Change touches UI components
- **WHEN** a change adds or modifies React Native components, screens, or styles
- **THEN** the developer SHALL be recommended to run `/plan-a11y-auditor-review`

#### Scenario: Change is backend-only
- **WHEN** a change only modifies database, utility, or non-UI code
- **THEN** the A11y Auditor review is not recommended

### Requirement: Every change starts on a new branch from main
Before implementation begins, the developer SHALL create a new branch from the latest main branch. Work SHALL NOT be done directly on main.

#### Scenario: Starting a new feature
- **WHEN** a developer begins work on a new change
- **THEN** they SHALL run `git checkout main && git pull && git checkout -b <branch-name>`
- **AND** the branch name SHALL use kebab-case describing the change (e.g., `add-automation-tester-role`)

#### Scenario: Continuing work on an existing branch
- **WHEN** a developer returns to in-progress work
- **THEN** they SHALL checkout the existing feature branch
- **AND** merge or rebase from main if main has advanced

#### Scenario: Trivial fix
- **WHEN** a change is < 20 lines, config-only, or a typo fix
- **THEN** the developer SHALL still create a branch — direct commits to main are not allowed

### Requirement: Pushing directly to main is disallowed
All changes to main SHALL go through a pull request. Direct pushes to main are forbidden.

#### Scenario: Developer attempts to push to main
- **WHEN** a developer runs `git push origin main`
- **THEN** the push SHALL be rejected
- **AND** the developer SHALL be directed to create a PR from a feature branch instead

#### Scenario: Ship workflow targets main via PR
- **WHEN** `/ship` creates a PR
- **THEN** the PR target branch SHALL be main
- **AND** the code reaches main only after the PR is merged

#### Scenario: Force push to main
- **WHEN** a developer attempts `git push --force origin main`
- **THEN** the push SHALL be rejected — force pushing to main is never allowed

### Requirement: Verify phase includes E2E test execution
The Verify phase SHALL include running E2E tests when they exist for the affected user flows.

#### Scenario: E2E tests exist for modified flow
- **WHEN** a change modifies a user flow that has E2E test coverage
- **THEN** the developer SHALL run the relevant E2E tests as part of verification
- **AND** `/qa` or `/ship` SHALL recommend running `npm run test:e2e` if E2E tests are detected
