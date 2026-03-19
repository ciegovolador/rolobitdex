## Why

The current branch naming uses `opsx/<change-name>` which doesn't convey the nature of the change (feature vs bugfix vs hotfix vs release) and has no tracking number. A structured convention `SCOPE/IP-NUMBER-DESCRIPTION` provides instant context about what a branch is for, enables sequential tracking of improvement proposals, and aligns with common Git Flow conventions.

## What Changes

- Replace `opsx/<change-name>` convention with `SCOPE/IP-NUMBER-DESCRIPTION`
- Scopes: `feature`, `bugfix`, `hotfix`, `release`
- IP = "Improvement Proposal" (literal prefix)
- NUMBER = auto-incremented (001, 002, 003...)
- DESCRIPTION = short kebab-case summary
- Update CLAUDE.md Autonomous Workflow section with new branch format
- Update `gstack-lifecycle` and `gstack-workflow` specs to use new convention
- Examples: `feature/IP-001-branch-naming-convention`, `bugfix/IP-002-fix-trade-status`, `hotfix/IP-003-backup-crash`

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `gstack-lifecycle`: Replace `opsx/<change-name>` with `SCOPE/IP-NUMBER-DESCRIPTION` in Build phase branch creation
- `gstack-workflow`: Same — update Implementation phase branch convention

## Impact

- `CLAUDE.md` — Autonomous Workflow section updated with new branch format
- `openspec/specs/gstack-lifecycle/spec.md` — branch naming in Build phase
- `openspec/specs/gstack-workflow/spec.md` — branch naming in Implementation phase
- No code changes — convention/documentation only
