## ADDED Requirements

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

## MODIFIED Requirements

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
