## ADDED Requirements

### Requirement: A11y Auditor review is informational
The A11y Auditor Review SHALL appear on the Review Readiness Dashboard but SHALL NOT block shipping.

#### Scenario: A11y Auditor Review not run
- **WHEN** `/ship` displays the dashboard and no A11y Auditor Review exists
- **THEN** the dashboard shows "—" for A11y Auditor Review
- **AND** shipping is not blocked

#### Scenario: A11y Auditor Review recommended
- **WHEN** the diff includes changes to UI components, screens, or style files
- **THEN** `/ship` SHALL recommend running `/plan-a11y-auditor-review`
- **BUT** shipping is not blocked if skipped

## MODIFIED Requirements

### Requirement: Dashboard displays review state clearly
The Review Readiness Dashboard SHALL show all review types — including A11y Auditor — with run count, last run date, status, and whether each is required.

#### Scenario: Dashboard with mixed state
- **WHEN** Eng Review passed 2 days ago, CEO Review never run, Design Review run 10 days ago, Automation Tester Review run 3 days ago, A11y Auditor Review run 1 day ago
- **THEN** the dashboard shows:
  - Eng Review: CLEAR, required
  - CEO Review: "—", not required
  - Design Review: stale (> 7 days), not required
  - Automation Tester Review: CLEAR, not required
  - A11y Auditor Review: CLEAR, not required
- **AND** the verdict is CLEARED (only Eng Review matters)
