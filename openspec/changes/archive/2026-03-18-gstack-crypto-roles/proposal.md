## Why

Rolobitdex is a P2P Bitcoin app built on cypherpunk principles, but the development workflow lacks domain-specific review perspectives. Generic engineering and design reviews miss Bitcoin-specific concerns: privacy leaks in address reuse, custodial patterns sneaking into P2P flows, metadata correlation attacks, and the philosophical alignment of features with sovereign self-custody. Two new gstack roles — a Crypto-Punk Bitcoiner and a Cypherpunk Security Official — bring these perspectives into the plan and review phases so every change is evaluated through the lens of the values the app serves.

## What Changes

- Add a **Crypto-Punk Bitcoiner** role: a plan review skill that evaluates changes through Bitcoin maximalist and P2P sovereignty principles — questions custodial tendencies, trusted third parties, address privacy, fee sovereignty, and alignment with the Bitcoin ethos
- Add a **Cypherpunk Security Official** role: a plan review skill that evaluates changes through cypherpunk security doctrine — metadata minimization, threat modeling against state-level adversaries, cryptographic hygiene, zero-knowledge defaults, and operational security
- Add specs defining what each role reviews, when to invoke them, and how they integrate into the existing gstack lifecycle
- Modify the gstack-lifecycle spec to include the new roles in the planning phase

## Capabilities

### New Capabilities
- `bitcoiner-review`: The Crypto-Punk Bitcoiner plan review — evaluates changes for P2P sovereignty, address privacy, trusted third party elimination, fee control, and Bitcoin ethos alignment
- `cypherpunk-review`: The Cypherpunk Security Official plan review — evaluates changes for metadata minimization, threat modeling, cryptographic hygiene, zero-knowledge defaults, and opsec

### Modified Capabilities
- `gstack-lifecycle`: Add the two new review roles to the Planning phase skill mapping and define when each should be invoked
- `skill-chaining`: Add chaining patterns that include the new roles (e.g., CEO → Bitcoiner → Cypherpunk → Eng for Bitcoin features)

## Impact

- `openspec/specs/`: Two new spec files, two delta specs
- `CLAUDE.md`: Add the new roles to the skill table and chaining patterns
- `.claude/skills/`: Two new skill definition files (plan-bitcoiner-review, plan-cypherpunk-review)
- No application code changes — these are review/planning skills only
