## ADDED Requirements

### Requirement: Planning phase includes domain-specific review roles
The Planning phase SHALL include two additional optional review roles for Bitcoin-domain changes.

#### Scenario: Bitcoin feature triggers Bitcoiner review
- **WHEN** a change touches payment flows, addresses, contacts with payment data, or trade operations
- **THEN** the developer SHALL be recommended to run `/plan-bitcoiner-review`

#### Scenario: Security-sensitive feature triggers Cypherpunk review
- **WHEN** a change touches data storage, network requests, key material, cryptographic operations, or metadata
- **THEN** the developer SHALL be recommended to run `/plan-cypherpunk-review`

#### Scenario: Both roles recommended together
- **WHEN** a change touches both Bitcoin protocol concerns and security concerns
- **THEN** both reviews are recommended, with Bitcoiner running before Cypherpunk
