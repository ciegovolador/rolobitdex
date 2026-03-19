## Context

The project currently uses `opsx/<change-name>` for branch naming. The user wants a structured convention that conveys scope, has a tracking number, and reads like a title.

## Goals / Non-Goals

**Goals:**
- Branch format: `SCOPE/IP-NUMBER-DESCRIPTION`
- Scopes: `feature`, `bugfix`, `hotfix`, `release`
- NUMBER: zero-padded, auto-incremented by scanning existing branches (e.g., 001, 002, 012)
- DESCRIPTION: short kebab-case title (e.g., `add-trade-filters`)
- Auto-detection: Claude determines SCOPE from the change description

**Non-Goals:**
- Enforcing via git hooks (convention only)
- Changing archive naming (archives keep date-based naming)

## Decisions

### Auto-increment by scanning git branches
To determine the next number, scan all local and remote branches matching `*/IP-*`, extract the highest number, and increment. If no IP branches exist, start at 001.

### Scope auto-detection rules
- `feature`: new functionality, new capabilities, new workflows
- `bugfix`: fixing broken behavior, correcting errors
- `hotfix`: urgent production fix (user explicitly says "urgent" or "hotfix")
- `release`: version bump, release prep (user explicitly says "release")
- Default to `feature` if ambiguous.

### Three-digit zero-padded numbers
Use `%03d` format (001, 002, ..., 999). Sufficient for any project.

## Risks / Trade-offs

- [Longer branch names] → Acceptable; the added context is worth it.
- [Number gaps if branches are deleted] → Numbers are sequential at creation time, gaps are fine.
