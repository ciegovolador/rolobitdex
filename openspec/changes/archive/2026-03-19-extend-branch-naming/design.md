## Context

The project uses `SCOPE/IP-NUMBER-DESCRIPTION` branch naming (introduced in IP-001). Current scopes are `feature`, `bugfix`, `hotfix`, `release`. Many changes are spec/documentation-only and don't fit these categories. IPs are sequential numbers with no central index.

## Goals / Non-Goals

**Goals:**
- Add `spec` scope for changes that only modify specs, docs, or workflow definitions
- Create an IP index (`IP-INDEX.md`) that tracks all IPs like a BIP list or JIRA board
- Update scope auto-detection to recognize spec/docs changes
- Retroactively index existing IPs (IP-001, IP-002)

**Non-Goals:**
- Git hooks to enforce naming (convention-only, as before)
- Formal BIP-style proposal process (just tracking, not governance)
- Changing the IP numbering scheme itself

## Decisions

### IP-INDEX.md format
Use a markdown table at project root, similar to Bitcoin's BIP index:

```
| IP | Title | Status | Branch | Date |
|----|-------|--------|--------|------|
| 001 | Branch naming convention | Merged | feature/IP-001-branch-naming-convention | 2026-03-19 |
| 002 | Extend branch naming | Active | feature/IP-002-extend-branch-naming | 2026-03-19 |
```

Statuses: `Proposed`, `Active`, `Merged`, `Abandoned`

**Why markdown table over JSON/YAML:** Human-readable, visible on GitHub, no tooling needed. Same rationale as BIP README.

### Scope auto-detection for `spec`
Claude should detect `spec` scope when the change description mentions only specs, docs, workflow, convention, or documentation. If the change also involves code, default to `feature` or `bugfix`.

**Why a separate scope:** Differentiates "we changed how we work" from "we changed what the app does." Makes it easy to filter branch history.

## Risks / Trade-offs

- [Fifth scope adds complexity] → Minimal — one more keyword in detection rules. Worth it for clarity.
- [IP-INDEX.md can get stale] → `/opsx:propose` and `/opsx:archive` should auto-update it. Low risk since Claude manages it.
- [Retroactive indexing may miss details] → Only 2 existing IPs, easy to fill in manually.
