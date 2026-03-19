# gstack Workflow

## Purpose

Define the full development lifecycle using gstack skills so that every change — from idea to shipped PR — follows a repeatable, complete workflow. This spec codifies which skills to use at each phase, in what order, and what artifacts each produces.

## Requirements

### Requirement: Every change follows the four-phase lifecycle

Changes SHALL progress through Planning, Implementation, Quality, and Release phases. Skipping a phase is acceptable only when the change is trivially small (< 20 lines, config-only, typo fix).

#### Scenario: Full lifecycle for a feature change
- **WHEN** a new feature or significant change is proposed
- **THEN** the workflow proceeds through all four phases in order:
  1. **Plan** — `/plan-ceo-review` or `/plan-eng-review` or both
  2. **Build** — OpenSpec change with proposal, design, specs, tasks
  3. **Verify** — `/qa` or `/qa-only`, `/design-review`, `/review`
  4. **Ship** — `/ship`, `/document-release`, `/retro`

#### Scenario: Trivial change fast path
- **WHEN** a change is < 20 lines, config-only, or a typo fix
- **THEN** the developer MAY skip directly to `/ship`
- **AND** `/ship` runs its own pre-landing review as a safety net

---

### Requirement: Planning phase uses the right review for the right audience

The three plan review skills serve different purposes and SHALL be selected based on change scope.

#### Scenario: Product or scope decision
- **WHEN** a change involves new user-facing features, scope expansion, or business-level tradeoffs
- **THEN** run `/plan-ceo-review`
- **AND** choose from SCOPE EXPANSION, SELECTIVE EXPANSION, HOLD SCOPE, or SCOPE REDUCTION modes

#### Scenario: Architecture or implementation decision
- **WHEN** a change involves data flow, system design, edge cases, performance, or test strategy
- **THEN** run `/plan-eng-review`

#### Scenario: UI/UX design decision
- **WHEN** a change involves visual design, layout, typography, color, motion, or interaction patterns
- **THEN** run `/plan-design-review` (interactive, rates 0-10, fixes the plan)
- **OR** run `/design-consultation` to create a full design system (DESIGN.md)

#### Scenario: Large feature with cross-cutting concerns
- **WHEN** a change touches product scope, architecture, and UI
- **THEN** run all three reviews in sequence: CEO first, then Eng, then Design
- **AND** each review builds on the artifacts from the previous one

---

### Requirement: Implementation phase produces OpenSpec artifacts

Every non-trivial change SHALL be tracked as an OpenSpec change with the spec-driven schema. The implementation phase SHALL work locally without pushing to the remote.

#### Scenario: Creating a new change
- **WHEN** work begins on a feature via `/opsx:propose`
- **THEN** the workflow SHALL:
  1. Checkout main and pull latest: `git checkout main && git pull`
  2. Create a new branch: `git checkout -b opsx/<change-name>`
  3. Create the OpenSpec change with proposal, design, specs, and tasks
- **AND** no commit or push SHALL happen automatically

#### Scenario: Branch name collision
- **WHEN** the branch `opsx/<change-name>` already exists
- **THEN** the workflow SHALL ask the developer to reuse the existing branch or pick a new name

#### Scenario: Implementing tasks
- **WHEN** tasks are ready for implementation
- **THEN** use `/opsx:apply` to work through tasks systematically
- **AND** mark each task complete as it is finished
- **AND** no automatic push to remote

#### Scenario: Exploring before committing to a design
- **WHEN** requirements are unclear or multiple approaches exist
- **THEN** use `/opsx:explore` to think through ideas with a partner
- **AND** capture decisions in the change's `design.md`

---

### Requirement: Quality phase verifies correctness, design, and code safety

Multiple verification skills SHALL be used based on what changed.

#### Scenario: Functional QA with fixes
- **WHEN** a web-accessible feature needs testing
- **THEN** run `/qa` to systematically test and fix bugs
- **AND** each fix is committed atomically with before/after verification

#### Scenario: Report-only QA
- **WHEN** the developer wants a bug report without automatic fixes
- **THEN** run `/qa-only` for a structured report with health score and repro steps

#### Scenario: Visual and design QA
- **WHEN** the change includes UI modifications
- **THEN** run `/design-review` to catch spacing issues, hierarchy problems, AI slop patterns, and interaction feel
- **AND** fixes are committed atomically with before/after screenshots

#### Scenario: Pre-landing code review
- **WHEN** code is ready for PR
- **THEN** run `/review` to check for SQL safety, race conditions, LLM trust boundaries, dead code, and completeness gaps
- **AND** auto-fixable issues are applied immediately; judgment calls are escalated

#### Scenario: Testing authenticated pages
- **WHEN** QA requires login or session state
- **THEN** run `/setup-browser-cookies` first to import cookies from the real browser

#### Scenario: Manual browser interaction
- **WHEN** specific page state needs verification or interaction testing
- **THEN** use `/browse` for headless browser commands (~100ms per command)
- **AND** use responsive breakpoints: 375px (mobile), 768px (tablet), 1440px (desktop)

---

### Requirement: Release phase ships, documents, and reflects

Shipping is automated end-to-end. Documentation and retrospectives close the loop.

#### Scenario: Shipping a PR
- **WHEN** all verification is complete
- **THEN** run `/ship` which automatically:
  1. Merges base branch
  2. Runs all tests
  3. Audits test coverage and generates missing tests
  4. Runs pre-landing review
  5. Bumps version (MICRO/PATCH auto, MINOR/MAJOR asks)
  6. Generates CHANGELOG entry from diff
  7. Updates TODOS.md
  8. Creates bisectable commits
  9. Pushes and creates PR

#### Scenario: Post-ship documentation
- **WHEN** a PR has been merged
- **THEN** run `/document-release` to update README, ARCHITECTURE, CONTRIBUTING, and CLAUDE.md
- **AND** polish CHANGELOG voice and clean up completed TODOs

#### Scenario: Weekly retrospective
- **WHEN** a week of work is complete
- **THEN** run `/retro` to analyze commit history, work patterns, and code quality
- **AND** review per-person contributions with praise and growth areas

#### Scenario: Archiving completed changes
- **WHEN** a change has been fully implemented and `/opsx:archive` is run
- **THEN** all uncommitted work SHALL be committed and pushed to origin
- **AND** delta specs SHALL be synced to main specs
- **AND** the change directory SHALL be moved to archive

---

### Requirement: The Completeness Principle governs all decisions

All gstack skills follow the Boil the Lake principle — always do the complete thing when AI makes the marginal cost near-zero.

#### Scenario: Choosing between complete and shortcut options
- **WHEN** a skill presents options with different completeness levels
- **THEN** prefer the option with higher completeness score (target 8+)
- **AND** show both human-team and CC+gstack time estimates

#### Scenario: Estimating effort
- **WHEN** effort is discussed
- **THEN** use the compression reference:
  - Boilerplate/scaffolding: human ~2 days / CC ~15 min (~100x)
  - Test writing: human ~1 day / CC ~15 min (~50x)
  - Feature implementation: human ~1 week / CC ~30 min (~30x)
  - Bug fix + regression test: human ~4 hours / CC ~15 min (~20x)
  - Architecture/design: human ~2 days / CC ~4 hours (~5x)

---

### Requirement: Review readiness is tracked and visible

The Review Readiness Dashboard gates shipping.

#### Scenario: Eng Review gates shipping
- **WHEN** `/ship` runs
- **THEN** the dashboard checks for a passing Eng Review within 7 days
- **AND** shipping is blocked if Eng Review is missing or has open issues
- **UNLESS** the developer overrides or the change is trivially small

#### Scenario: CEO and Design reviews are informational
- **WHEN** the dashboard displays
- **THEN** CEO Review and Design Review are shown for context
- **AND** they never block shipping
- **BUT** `/ship` recommends Design Review when frontend files are in the diff
