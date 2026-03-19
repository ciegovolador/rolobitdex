# CLAUDE.md

## gstack

Use the `/browse` skill from gstack for all web browsing. Never use `mcp__claude-in-chrome__*` tools.

If gstack skills aren't working, run `cd .claude/skills/gstack && ./setup` to build the binary and register skills.

### Development Lifecycle: Plan → Build → Verify → Ship

Full specs: `openspec/specs/gstack-lifecycle/`, `openspec/specs/review-gates/`, `openspec/specs/skill-chaining/`

| Phase | Skills | When to use |
|-------|--------|-------------|
| **Plan** | `/plan-ceo-review`, `/plan-bitcoiner-review`, `/plan-cypherpunk-review`, `/plan-eng-review`, `/plan-automation-tester-review`, `/plan-a11y-auditor-review`, `/plan-design-review`, `/design-consultation` | Before implementation — scope, sovereignty, security, architecture, testing, accessibility, design |
| **Build** | `/opsx:propose`, `/opsx:apply`, `/opsx:explore` | Create OpenSpec change, implement tasks, explore ideas |
| **Verify** | `/qa`, `/qa-only`, `/design-review`, `/review`, `/browse` | After implementation — functional, visual, and code safety |
| **Ship** | `/ship`, `/document-release`, `/retro`, `/opsx:archive` | Release, update docs, retrospect, archive change |

### Skill Chaining Patterns

**Full Bitcoin feature** (product + sovereignty + security + architecture + testing + a11y + UI):
`/plan-ceo-review` → `/plan-bitcoiner-review` → `/plan-cypherpunk-review` → `/plan-eng-review` → `/plan-automation-tester-review` → `/plan-a11y-auditor-review` → `/plan-design-review` → `/opsx:propose` → `/opsx:apply` → `/qa` → `/design-review` → `/ship`

**Bitcoin protocol change** (no UI):
`/plan-bitcoiner-review` → `/plan-cypherpunk-review` → `/plan-eng-review` → `/plan-automation-tester-review` → `/opsx:propose` → `/opsx:apply` → `/review` → `/ship`

**Security-focused change** (key handling, encryption, backup):
`/plan-cypherpunk-review` → `/plan-eng-review` → `/plan-automation-tester-review` → `/opsx:propose` → `/opsx:apply` → `/review` → `/ship`

**General feature** (product + architecture + testing + a11y + UI, no Bitcoin protocol):
`/plan-ceo-review` → `/plan-eng-review` → `/plan-automation-tester-review` → `/plan-a11y-auditor-review` → `/plan-design-review` → `/opsx:propose` → `/opsx:apply` → `/qa` → `/design-review` → `/ship`

**UI-focused change** (components/screens with no Bitcoin protocol):
`/plan-eng-review` → `/plan-a11y-auditor-review` → `/plan-design-review` → `/opsx:propose` → `/opsx:apply` → `/qa` → `/design-review` → `/ship`

**Trivial fix** (< 20 lines, config, typo):
`/ship` (includes its own pre-landing review)

### Review Gates

- **Eng Review** (`/plan-eng-review`): Required — gates `/ship` by default. Override per-branch or globally (`gstack-config set skip_eng_review true`).
- **CEO Review** (`/plan-ceo-review`): Informational — recommended for product/scope changes, never blocks shipping.
- **Design Review** (`/plan-design-review`): Informational — recommended when diff includes frontend files, never blocks shipping.
- **Bitcoiner Review** (`/plan-bitcoiner-review`): Informational — recommended for changes touching payments, addresses, trades, or Bitcoin protocol. Rates: Sovereignty, Privacy, Trustlessness, Fee Control, Ethos.
- **Cypherpunk Review** (`/plan-cypherpunk-review`): Informational — recommended for changes touching data storage, networking, key material, or cryptography. Rates: Threat Model, Metadata Minimization, Crypto Hygiene, Zero-Knowledge Defaults, Opsec.
- **Automation Tester Review** (`/plan-automation-tester-review`): Informational — recommended for changes touching testable user flows, database operations, or test files. Rates: Test Coverage, Regression Safety, E2E Readiness, Testability, CI Integration.
- **A11y Auditor Review** (`/plan-a11y-auditor-review`): Informational — recommended for changes touching UI components, screens, or styles. Rates: Screen Reader Support, Semantic Structure, Interaction Accessibility, Visual Accessibility, Motion & Focus Management.

### All Available Skills

| Skill | Purpose |
|-------|---------|
| `/plan-ceo-review` | CEO/founder-mode plan review |
| `/plan-eng-review` | Eng manager-mode plan review |
| `/plan-bitcoiner-review` | Crypto-Punk Bitcoiner review (Sovereignty, Privacy, Trustlessness, Fee Control, Ethos) |
| `/plan-cypherpunk-review` | Cypherpunk Security Official review (Threat Model, Metadata Min, Crypto Hygiene, ZK Defaults, Opsec) |
| `/plan-automation-tester-review` | Automation Tester review (Test Coverage, Regression Safety, E2E Readiness, Testability, CI Integration) |
| `/plan-a11y-auditor-review` | A11y Auditor review (Screen Reader Support, Semantic Structure, Interaction Accessibility, Visual Accessibility, Motion & Focus Management) |
| `/plan-design-review` | Designer's eye plan review (interactive, rates 0-10) |
| `/design-consultation` | Design system consultation → DESIGN.md |
| `/review` | Pre-landing PR review (SQL safety, race conditions, completeness) |
| `/ship` | Full ship workflow (merge, test, review, bump, changelog, PR) |
| `/browse` | Fast headless browser for QA and dogfooding (~100ms/cmd) |
| `/qa` | QA test and fix bugs (three tiers: quick, standard, exhaustive) |
| `/qa-only` | Report-only QA testing |
| `/design-review` | Designer's eye QA with fixes |
| `/setup-browser-cookies` | Import browser cookies for authenticated testing |
| `/retro` | Weekly engineering retrospective |
| `/document-release` | Post-ship documentation update |
