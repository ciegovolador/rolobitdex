## ADDED Requirements

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
