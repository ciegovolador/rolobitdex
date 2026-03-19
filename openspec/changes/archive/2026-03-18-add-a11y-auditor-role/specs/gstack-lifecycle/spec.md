## ADDED Requirements

### Requirement: Planning phase includes A11y Auditor review
The Planning phase SHALL include `/plan-a11y-auditor-review` as an optional review role for changes that touch UI components or screens.

#### Scenario: Change touches UI components
- **WHEN** a change adds or modifies React Native components, screens, or styles
- **THEN** the developer SHALL be recommended to run `/plan-a11y-auditor-review`

#### Scenario: Change is backend-only
- **WHEN** a change only modifies database, utility, or non-UI code
- **THEN** the A11y Auditor review is not recommended
