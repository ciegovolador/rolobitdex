## Context

gstack's plan review phase currently has three roles: CEO (product/scope), Eng (architecture/implementation), and Design (visual/interaction). These are general-purpose. Rolobitdex is a Bitcoin sovereignty tool where domain-specific concerns — address privacy, trusted third party elimination, metadata correlation, cryptographic hygiene — are as critical as architecture or UX. These concerns slip through generic reviews.

The existing plan review skills (`/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`) each follow a consistent pattern: a SKILL.md file defining the review perspective, cognitive patterns to activate, a structured rating system, and interactive AskUserQuestion prompts. The two new roles follow the same pattern.

## Goals / Non-Goals

**Goals:**
- Give the Bitcoiner role a voice in every feature that touches payments, addresses, contacts, or trade flows
- Give the Cypherpunk role a voice in every feature that touches data storage, network requests, key material, or metadata
- Make both roles feel like talking to an opinionated domain expert, not running a checklist
- Integrate naturally into the existing lifecycle and chaining patterns

**Non-Goals:**
- Building automated scanning tools (these are review perspectives, not linters)
- Modifying the gstack core framework or browse binary
- Enforcing either role as a shipping gate (both are informational, like CEO and Design reviews)

## Decisions

**Decision 1: SKILL.md files with cognitive pattern activation, not checklists**

Like the existing plan reviews, each role uses name-dropped frameworks and thinkers to activate the LLM's latent knowledge. The Bitcoiner channels Satoshi's whitepaper principles, Hal Finney's pragmatism, and the cypherpunk manifesto's "privacy is not secrecy" distinction. The Cypherpunk channels Schneier's threat modeling, Bernstein's cryptographic minimalism, and Tor project's metadata-awareness.

Alternative: Static checklist of items to verify. Rejected because checklists produce shallow coverage — the LLM ticks boxes instead of reasoning from principles.

**Decision 2: Both roles are informational, not gating**

Like CEO and Design reviews, neither role blocks `/ship`. They appear on the Review Readiness Dashboard as optional entries. This keeps the workflow fast while making the perspectives available.

Alternative: Make the Bitcoiner review required for any change touching `src/lib/silentPayments.ts` or `src/db/trades.ts`. Rejected for now — too rigid. The developer chooses when these perspectives add value.

**Decision 3: Skill files live in the project, not in global gstack**

The two new skills are project-specific (Rolobitdex domain). They go in `.claude/skills/` as standalone SKILL.md files, not in the global gstack installation. This keeps them versioned with the project and doesn't pollute other repos.

Alternative: Contribute to gstack as built-in skills. Rejected because these are domain-specific to Bitcoin apps, not general-purpose.

**Decision 4: Rating dimensions are domain-specific**

The Bitcoiner rates on: Sovereignty (self-custody preserved?), Privacy (address/metadata leaks?), Trustlessness (third parties eliminated?), Fee Control (user controls fees?), Ethos (aligned with Bitcoin values?).

The Cypherpunk rates on: Threat Model (who's the adversary?), Metadata Minimization (what leaks?), Crypto Hygiene (algorithms/implementations sound?), Zero-Knowledge Defaults (minimum disclosure?), Opsec (operational exposure?).

Each dimension is rated 0-10 with explanation of what a 10 looks like, matching the interactive style of `/plan-design-review`.

## Risks / Trade-offs

**[Risk] Roles overlap with Eng review on security topics** → Mitigated by scoping: Eng review covers implementation quality (race conditions, SQL safety). Cypherpunk review covers adversarial threat modeling and cryptographic choices. Bitcoiner review covers protocol-level and philosophical alignment. Overlap is minimal.

**[Risk] Developers skip optional reviews** → Acceptable. The chaining patterns in CLAUDE.md make it obvious when to use them. For Bitcoin-touching changes, the Bitcoiner review should feel natural, not forced.

**[Trade-off] Project-specific skills aren't portable** → Acceptable. Other Bitcoin projects can copy the SKILL.md files. The patterns are reusable even if the files aren't auto-distributed.
