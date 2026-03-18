## Context

Rolobitdex uses gstack v0.6.4 with 14 skills available via CLAUDE.md. The current workflow is informal — skills are invoked ad hoc based on developer memory. There is an existing `openspec/specs/gstack-workflow/spec.md` that partially documents the lifecycle but lacks coverage of review gates, skill chaining, and the completeness principle as a decision framework.

This change formalizes the workflow into three new specs (lifecycle, review-gates, skill-chaining) and one delta spec (cross-platform-shell), then replaces the existing gstack-workflow spec.

## Goals / Non-Goals

**Goals:**
- Codify which skills to use at each development phase so the workflow is discoverable, not tribal knowledge
- Define clear rules for when reviews are required vs. skippable (the Review Readiness Dashboard)
- Document skill chaining patterns so complex changes get the full pipeline benefit
- Make the Completeness Principle actionable with concrete compression ratios and decision heuristics

**Non-Goals:**
- Modifying gstack skill code or behavior — this is purely a specification of how to use existing skills
- Enforcing the workflow via tooling (e.g., CI gates) — that's a future change
- Documenting gstack internals like the browse binary, session tracking, or contributor mode

## Decisions

**Decision 1: Three separate specs instead of one monolithic spec**
The lifecycle, review gates, and skill chaining are distinct concerns with different audiences. A developer asking "what do I run after QA?" shouldn't wade through review gate rules. Three focused specs are easier to reference and maintain than one large one.

Alternative: Single spec with sections. Rejected because it would exceed 200 lines and mix operational (which skill) with policy (which reviews gate).

**Decision 2: Replace existing gstack-workflow spec rather than extending it**
The existing spec at `openspec/specs/gstack-workflow/spec.md` covers the lifecycle but conflates it with review gates and chaining. Cleaner to archive it and replace with the three focused specs.

Alternative: Extend in place. Rejected because the existing spec would need restructuring anyway.

**Decision 3: Delta spec for cross-platform-shell instead of new capability**
The gstack setup recovery (`cd .claude/skills/gstack && ./setup`) is a shell-level concern that belongs in the existing cross-platform-shell spec, not a new capability.

## Risks / Trade-offs

**[Risk] Specs become stale as gstack evolves** → Mitigated by keeping specs focused on workflow patterns (which are stable) rather than skill internals (which change per release). The `/document-release` skill can flag spec drift post-ship.

**[Risk] Over-specification discourages ad hoc usage** → Mitigated by the "trivial change fast path" (< 20 lines can skip to `/ship`). The spec permits skipping phases, it just names the default.

**[Trade-off] Three specs vs. one increases the number of files** → Acceptable because each is short (< 100 lines) and independently referenceable.
