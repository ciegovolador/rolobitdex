## Purpose

Define patterns for composing multiple gstack skills in sequence so complex changes get the full pipeline benefit without developers reinventing the workflow each time.

## Requirements

### Requirement: Plan reviews chain in priority order
When multiple plan reviews are needed, they SHALL run in sequence: CEO → Eng → Design, with each review building on the prior's output.

#### Scenario: Full review chain for a major feature
- **WHEN** a feature touches product scope, architecture, and UI
- **THEN** `/plan-ceo-review` runs first to validate scope and product direction
- **AND** `/plan-eng-review` runs second using the CEO-validated plan
- **AND** `/plan-design-review` runs third to refine visual and interaction design

#### Scenario: Partial chain for backend-only change
- **WHEN** a change has no UI component
- **THEN** only CEO (if scope decision) and Eng reviews are chained
- **AND** Design review is skipped

### Requirement: QA feeds into ship
QA results SHALL inform the ship workflow so bugs found during verification are fixed before PR creation.

#### Scenario: QA then ship
- **WHEN** `/qa` completes with all bugs fixed
- **THEN** `/ship` can run immediately, picking up the QA fixes as part of the diff

#### Scenario: QA finds unfixable issues
- **WHEN** `/qa` identifies issues that require design decisions
- **THEN** the developer loops back to the Plan phase before shipping

### Requirement: Ship chains internally
The `/ship` workflow SHALL chain its own sub-steps without manual intervention: merge base → test → coverage audit → review → version bump → changelog → commit → push → PR.

#### Scenario: Clean ship
- **WHEN** all sub-steps succeed
- **THEN** the developer sees only the PR URL as final output

#### Scenario: Ship stops on failure
- **WHEN** any sub-step fails (test failure, merge conflict, review ASK items)
- **THEN** `/ship` stops at the failure point with actionable output
- **AND** the developer fixes the issue and re-runs `/ship` to resume

### Requirement: Post-ship chain closes the loop
After a PR merges, the post-ship skills SHALL be available as a chain: document-release → retro → archive.

#### Scenario: Full post-ship chain
- **WHEN** a PR has been merged
- **THEN** `/document-release` updates docs to match what shipped
- **AND** `/retro` (at end of week) analyzes the work pattern
- **AND** `/opsx:archive` moves the change to archive and syncs specs

#### Scenario: Partial post-ship
- **WHEN** a trivial change is merged
- **THEN** `/opsx:archive` is sufficient
- **AND** `/document-release` and `/retro` are optional

### Requirement: Browse skill integrates with QA skills
The `/browse` headless browser SHALL be the underlying tool for all QA-related skills.

#### Scenario: QA uses browse for testing
- **WHEN** `/qa` or `/qa-only` tests a web feature
- **THEN** it uses `/browse` commands for navigation, interaction, and screenshots

#### Scenario: Authenticated testing
- **WHEN** QA requires login or session state
- **THEN** `/setup-browser-cookies` SHALL run before any QA skill
- **AND** the imported cookies persist for the QA session

#### Scenario: Responsive testing
- **WHEN** visual QA runs on a responsive layout
- **THEN** `/browse` tests at three breakpoints: 375px (mobile), 768px (tablet), 1440px (desktop)

### Requirement: Completeness Principle governs skill decisions
When any skill presents options with different completeness levels, the more complete option SHALL be recommended.

#### Scenario: Choosing between complete and shortcut
- **WHEN** a skill presents options A (completeness 9/10) and B (completeness 6/10)
- **THEN** the skill recommends A with dual effort estimates (human-team and CC+gstack time)

#### Scenario: Lake vs ocean distinction
- **WHEN** the complete option is a "lake" (achievable: full test coverage, all edge cases)
- **THEN** it SHALL be recommended
- **WHEN** the complete option is an "ocean" (rewriting a system, multi-quarter migration)
- **THEN** it SHALL be flagged as out of scope
