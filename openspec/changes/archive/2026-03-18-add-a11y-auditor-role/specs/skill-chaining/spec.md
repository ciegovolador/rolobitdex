## ADDED Requirements

### Requirement: A11y Auditor review chains after Automation Tester
When the A11y Auditor review is included in a skill chain, it SHALL run after `/plan-automation-tester-review` and before `/plan-design-review`.

#### Scenario: Full feature chain with a11y auditor
- **WHEN** a feature touches product scope, architecture, testable flows, accessibility, and UI
- **THEN** the chain is: `/plan-ceo-review` → `/plan-eng-review` → `/plan-automation-tester-review` → `/plan-a11y-auditor-review` → `/plan-design-review`

#### Scenario: UI-focused change with a11y auditor
- **WHEN** a change modifies screens or components with no Bitcoin protocol impact
- **THEN** the chain is: `/plan-eng-review` → `/plan-a11y-auditor-review` → `/plan-design-review`

### Requirement: Bitcoin feature chain includes a11y auditor for UI changes
Skill chains for Bitcoin-touching features with UI SHALL include the A11y Auditor review after Automation Tester.

#### Scenario: Full Bitcoin feature chain with a11y auditor
- **WHEN** a feature involves Bitcoin payments, has testable user flows, and includes UI
- **THEN** the chain is: `/plan-ceo-review` → `/plan-bitcoiner-review` → `/plan-cypherpunk-review` → `/plan-eng-review` → `/plan-automation-tester-review` → `/plan-a11y-auditor-review` → `/plan-design-review`
