## Why

The project uses gstack v0.6.4 with 14 skills but has no formal specification for how they integrate into the development lifecycle. Developers pick skills ad hoc, skip phases, and miss the compounding value of the full pipeline (plan reviews feeding specs feeding QA feeding ship). A meta spec codifies the complete workflow so every change gets the benefit of all capabilities.

## What Changes

- Define the four-phase development lifecycle: Plan → Build → Verify → Ship
- Map every gstack skill to its phase and trigger conditions
- Specify which reviews are required vs. recommended based on change scope
- Establish the Review Readiness Dashboard as a shipping gate
- Codify the Completeness Principle as a decision framework across all phases
- Document skill chaining patterns (e.g., CEO review → Eng review → Design review for large features)

## Capabilities

### New Capabilities
- `gstack-lifecycle`: The four-phase workflow (Plan, Build, Verify, Ship) with skill mapping, phase ordering, and skip conditions for trivial changes
- `review-gates`: Review readiness rules — which reviews gate shipping, which are informational, how overrides work, and how the dashboard tracks state
- `skill-chaining`: Patterns for composing multiple skills in sequence — when to chain CEO+Eng+Design reviews, how QA feeds into ship, how retro closes the loop

### Modified Capabilities
- `cross-platform-shell`: Add requirement for gstack skill availability check and setup recovery (`cd .claude/skills/gstack && ./setup`)

## Impact

- `openspec/specs/`: Three new spec files + one delta spec
- `CLAUDE.md`: May need updates to reflect the formalized workflow
- `openspec/config.yaml`: Already updated with project context for gstack tooling
- No code changes — this is a process/documentation spec
