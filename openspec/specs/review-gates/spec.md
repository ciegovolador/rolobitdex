## Purpose

Define which reviews gate shipping, which are informational, how the Review Readiness Dashboard tracks state, and how developers override gates when appropriate.

## Requirements

### Requirement: Eng Review gates shipping by default
The `/ship` workflow SHALL require a passing Eng Review within 7 days before creating a PR.

#### Scenario: Eng Review passed
- **WHEN** `/ship` runs and the Eng Review has a "clean" entry within the last 7 days
- **THEN** the dashboard shows CLEARED and shipping proceeds

#### Scenario: Eng Review missing
- **WHEN** `/ship` runs and no Eng Review exists within 7 days
- **THEN** the dashboard shows NOT CLEARED
- **AND** the developer is prompted with options: ship anyway, abort and run `/plan-eng-review`, or mark as too small

#### Scenario: Eng Review stale
- **WHEN** `/ship` runs and the most recent Eng Review is older than 7 days
- **THEN** the dashboard shows NOT CLEARED
- **AND** the developer is prompted to re-run or override

### Requirement: CEO and Design reviews are informational
CEO Review and Design Review SHALL appear on the dashboard but SHALL NOT block shipping.

#### Scenario: CEO Review not run
- **WHEN** `/ship` displays the dashboard and no CEO Review exists
- **THEN** the dashboard shows "—" for CEO Review
- **AND** shipping is not blocked

#### Scenario: Design Review recommended
- **WHEN** the diff includes frontend files (CSS, HTML, JSX, view files)
- **THEN** `/ship` SHALL recommend running `/plan-design-review`
- **BUT** shipping is not blocked if skipped

### Requirement: Review overrides persist per branch
When a developer overrides the Eng Review gate, the override SHALL persist for that branch so subsequent `/ship` runs do not re-ask.

#### Scenario: Override recorded
- **WHEN** a developer chooses "ship anyway" or "too small for review"
- **THEN** the decision is written to the branch's review JSONL file
- **AND** future `/ship` runs on the same branch skip the review gate

#### Scenario: Override does not carry to other branches
- **WHEN** a developer overrides on branch A and then runs `/ship` on branch B
- **THEN** branch B has no override and the review gate applies normally

### Requirement: Eng Review can be globally disabled
A developer SHALL be able to set `skip_eng_review: true` to bypass the Eng Review gate for all branches.

#### Scenario: Global skip enabled
- **WHEN** `gstack-config get skip_eng_review` returns `true`
- **THEN** the dashboard shows "SKIPPED (global)" for Eng Review
- **AND** the verdict is CLEARED without any review

### Requirement: Automation Tester review is informational
The Automation Tester Review SHALL appear on the Review Readiness Dashboard but SHALL NOT block shipping.

#### Scenario: Automation Tester Review not run
- **WHEN** `/ship` displays the dashboard and no Automation Tester Review exists
- **THEN** the dashboard shows "—" for Automation Tester Review
- **AND** shipping is not blocked

#### Scenario: Automation Tester Review recommended
- **WHEN** the diff includes changes to user-facing flows, database operations, or test files
- **THEN** `/ship` SHALL recommend running `/plan-automation-tester-review`
- **BUT** shipping is not blocked if skipped

### Requirement: Dashboard displays review state clearly
The Review Readiness Dashboard SHALL show all review types — including Automation Tester — with run count, last run date, status, and whether each is required.

#### Scenario: Dashboard with mixed state
- **WHEN** Eng Review passed 2 days ago, CEO Review never run, Design Review run 10 days ago, Automation Tester Review run 3 days ago
- **THEN** the dashboard shows:
  - Eng Review: CLEAR, required
  - CEO Review: "—", not required
  - Design Review: stale (> 7 days), not required
  - Automation Tester Review: CLEAR, not required
- **AND** the verdict is CLEARED (only Eng Review matters)
