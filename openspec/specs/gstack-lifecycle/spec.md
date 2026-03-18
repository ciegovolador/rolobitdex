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
Every non-trivial change SHALL be tracked as an OpenSpec change using the spec-driven schema.

#### Scenario: Creating a new change
- **WHEN** work begins on a feature
- **THEN** run `/opsx:propose` to create the change with proposal, design, specs, and tasks

#### Scenario: Implementing tasks
- **WHEN** artifacts are complete and tasks are ready
- **THEN** run `/opsx:apply` to work through tasks systematically

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
- **WHEN** a change is fully shipped
- **THEN** run `/opsx:archive` to sync delta specs and move the change to archive

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
