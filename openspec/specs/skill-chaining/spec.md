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

### Requirement: Bitcoin feature chain includes domain reviews
Skill chains for Bitcoin-touching features SHALL include the Bitcoiner and Cypherpunk reviews between CEO and Eng reviews.

#### Scenario: Full Bitcoin feature chain
- **WHEN** a feature involves Bitcoin payments, Silent Payments, or P2P trade flows
- **THEN** the chain is: `/plan-ceo-review` → `/plan-bitcoiner-review` → `/plan-cypherpunk-review` → `/plan-eng-review` → `/plan-design-review`

#### Scenario: Security-focused chain without product scope
- **WHEN** a change is security-focused (key handling, encryption, backup) without product scope decisions
- **THEN** the chain is: `/plan-cypherpunk-review` → `/plan-eng-review`

#### Scenario: Bitcoin protocol change without UI
- **WHEN** a change modifies Silent Payment logic or trade state machine without UI changes
- **THEN** the chain is: `/plan-bitcoiner-review` → `/plan-cypherpunk-review` → `/plan-eng-review`

### Requirement: Automation Tester review chains after Eng review
When the Automation Tester review is included in a skill chain, it SHALL run after `/plan-eng-review` and before `/plan-design-review`.

#### Scenario: Full feature chain with automation tester
- **WHEN** a feature touches product scope, architecture, testable user flows, and UI
- **THEN** the chain is: `/plan-ceo-review` → `/plan-eng-review` → `/plan-automation-tester-review` → `/plan-design-review`

#### Scenario: Backend change with automation tester
- **WHEN** a change modifies database operations or business logic with no UI
- **THEN** the chain is: `/plan-eng-review` → `/plan-automation-tester-review`

### Requirement: Bitcoin feature chain includes automation tester
Skill chains for Bitcoin-touching features SHALL include the Automation Tester review after Eng review when the change involves testable flows.

#### Scenario: Full Bitcoin feature chain with automation tester
- **WHEN** a feature involves Bitcoin payments and has testable user flows
- **THEN** the chain is: `/plan-ceo-review` → `/plan-bitcoiner-review` → `/plan-cypherpunk-review` → `/plan-eng-review` → `/plan-automation-tester-review` → `/plan-design-review`

#### Scenario: Bitcoin protocol change with tests
- **WHEN** a change modifies Silent Payment logic with unit test implications
- **THEN** the chain is: `/plan-bitcoiner-review` → `/plan-cypherpunk-review` → `/plan-eng-review` → `/plan-automation-tester-review`
