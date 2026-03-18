# CLAUDE.md

## gstack

Use the `/browse` skill from gstack for all web browsing. Never use `mcp__claude-in-chrome__*` tools.

If gstack skills aren't working, run `cd .claude/skills/gstack && ./setup` to build the binary and register skills.

### Development Lifecycle: Plan → Build → Verify → Ship

Full specs: `openspec/specs/gstack-lifecycle/`, `openspec/specs/review-gates/`, `openspec/specs/skill-chaining/`

| Phase | Skills | When to use |
|-------|--------|-------------|
| **Plan** | `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/design-consultation` | Before implementation — scope, architecture, design decisions |
| **Build** | `/opsx:propose`, `/opsx:apply`, `/opsx:explore` | Create OpenSpec change, implement tasks, explore ideas |
| **Verify** | `/qa`, `/qa-only`, `/design-review`, `/review`, `/browse` | After implementation — functional, visual, and code safety |
| **Ship** | `/ship`, `/document-release`, `/retro`, `/opsx:archive` | Release, update docs, retrospect, archive change |

### Skill Chaining Patterns

**Full feature** (product + architecture + UI):
`/plan-ceo-review` → `/plan-eng-review` → `/plan-design-review` → `/opsx:propose` → `/opsx:apply` → `/qa` → `/design-review` → `/ship`

**Backend-only change**:
`/plan-eng-review` → `/opsx:propose` → `/opsx:apply` → `/review` → `/ship`

**Trivial fix** (< 20 lines, config, typo):
`/ship` (includes its own pre-landing review)

### Review Gates

- **Eng Review** (`/plan-eng-review`): Required — gates `/ship` by default. Override per-branch or globally (`gstack-config set skip_eng_review true`).
- **CEO Review** (`/plan-ceo-review`): Informational — recommended for product/scope changes, never blocks shipping.
- **Design Review** (`/plan-design-review`): Informational — recommended when diff includes frontend files, never blocks shipping.

### All Available Skills

| Skill | Purpose |
|-------|---------|
| `/plan-ceo-review` | CEO/founder-mode plan review |
| `/plan-eng-review` | Eng manager-mode plan review |
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
