## Purpose

Define the Cypherpunk Security Official plan review — an adversarial security thinker that evaluates every change through cypherpunk security doctrine: assume the worst adversary, minimize metadata, verify cryptography, and default to zero knowledge.

## Requirements

### Requirement: Cypherpunk review evaluates five dimensions
The `/plan-cypherpunk-review` skill SHALL rate each change on five dimensions, scored 0-10, with interactive prompts explaining what a 10 looks like for each.

#### Scenario: Review a data storage feature
- **WHEN** a developer runs `/plan-cypherpunk-review` on a change touching local storage or database
- **THEN** the review rates the change on Threat Model, Metadata Minimization, Crypto Hygiene, Zero-Knowledge Defaults, and Opsec
- **AND** each dimension includes a score, explanation, and what would make it a 10

#### Scenario: Review a networking feature
- **WHEN** a developer runs `/plan-cypherpunk-review` on a change that makes network requests
- **THEN** the review focuses depth on Metadata Minimization and Opsec
- **AND** identifies what a network observer or MITM can learn

### Requirement: Threat Model dimension names the adversary
The Threat Model dimension SHALL explicitly name the adversary class and evaluate the change's exposure against it.

#### Scenario: No threat model stated
- **WHEN** a change has no explicit threat model
- **THEN** the Cypherpunk assumes the strongest relevant adversary (state-level for financial data, corporate for metadata, criminal for key material)
- **AND** rates Threat Model based on resilience against that adversary

#### Scenario: Feature handles key material
- **WHEN** a change touches private keys, seeds, or signing operations
- **THEN** the Cypherpunk evaluates against a state-level adversary with device access
- **AND** checks for memory clearing, secure enclave usage, and side-channel resistance

### Requirement: Metadata Minimization dimension identifies what leaks
The Metadata Minimization dimension SHALL trace every data path and identify what an observer can learn without decrypting content.

#### Scenario: Network request exposes timing
- **WHEN** a change makes network requests that correlate with user actions
- **THEN** the Cypherpunk flags the timing metadata and rates accordingly
- **AND** recommends batching, padding, or Tor routing

#### Scenario: Local storage contains plaintext identifiers
- **WHEN** a change stores contact names, addresses, or transaction history in plaintext SQLite
- **THEN** the Cypherpunk flags the exposure to device seizure
- **AND** recommends encryption at rest with user-derived key

### Requirement: Crypto Hygiene dimension verifies cryptographic choices
The Crypto Hygiene dimension SHALL verify that cryptographic algorithms, implementations, and parameters are sound.

#### Scenario: Custom cryptographic implementation
- **WHEN** a change implements cryptographic operations directly instead of using audited libraries
- **THEN** the Cypherpunk scores Crypto Hygiene 0-3 and flags it as high risk

#### Scenario: Feature uses well-audited library
- **WHEN** a change uses established libraries (noble-secp256k1, libsodium, etc.) with standard parameters
- **THEN** the Crypto Hygiene dimension scores 8-10

#### Scenario: Weak randomness source
- **WHEN** a change uses `Math.random()` or non-cryptographic PRNG for security-sensitive values
- **THEN** the Cypherpunk flags it as critical and requires `crypto.getRandomValues()` or equivalent

### Requirement: Zero-Knowledge Defaults dimension enforces minimum disclosure
The Zero-Knowledge Defaults dimension SHALL verify that every interaction discloses the minimum information necessary.

#### Scenario: Feature shares more than needed
- **WHEN** a change sends full contact details when only a payment address is needed
- **THEN** the Cypherpunk flags the over-disclosure and recommends minimal payload

#### Scenario: Feature uses Silent Payments correctly
- **WHEN** a change generates unique addresses per sender using Silent Payments
- **THEN** the Zero-Knowledge Defaults dimension scores 9-10
- **AND** the Cypherpunk notes the unlinkability property is preserved

### Requirement: Opsec dimension evaluates operational exposure
The Opsec dimension SHALL identify operational security risks: what a physical observer, device thief, or shoulder surfer can learn.

#### Scenario: Sensitive data visible on screen
- **WHEN** a change displays private keys, seed phrases, or full balances on the main screen
- **THEN** the Cypherpunk flags the visual exposure and recommends masked display with reveal-on-tap

#### Scenario: App leaves traces in system logs
- **WHEN** a change logs transaction details, addresses, or amounts to console or crash reporters
- **THEN** the Cypherpunk flags the log exposure and rates Opsec accordingly

### Requirement: Review channels cypherpunk security thinkers
The review SHALL activate latent knowledge of security thought leaders to reason adversarially, not defensively.

#### Scenario: Cognitive pattern activation
- **WHEN** the review runs
- **THEN** it channels: Bruce Schneier (threat modeling, attack trees), Daniel J. Bernstein (cryptographic minimalism, NaCl), the Tor Project (metadata is the message), Eric Hughes (cypherpunks write code), Phil Zimmermann (PGP, why encryption matters), Jacob Appelbaum (assume compromise, defense in depth)
