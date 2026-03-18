## ADDED Requirements

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
