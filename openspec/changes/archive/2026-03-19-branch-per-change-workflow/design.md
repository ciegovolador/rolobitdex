## Context

The project uses gstack skills for the full development lifecycle. Branch creation and pushing are currently manual steps documented in `gstack-lifecycle` spec but not enforced by the workflow. This leads to work sometimes happening on stale branches or forgetting to push.

## Goals / Non-Goals

**Goals:**
- `/opsx:propose` automatically creates a new branch from latest main
- Branch name derived from change name (e.g., `opsx/add-feature`)
- Work is pushed to origin at the end of the workflow session
- Specs and CLAUDE.md reflect this as the standard workflow

**Non-Goals:**
- Enforcing this via git hooks or CI (documentation/convention only)
- Changing how `/opsx:apply` or `/ship` work internally
- Handling merge conflicts automatically

## Decisions

### Branch naming convention: `opsx/<change-name>`
Use an `opsx/` prefix so feature branches from propose are visually distinct. The change name is already kebab-case, so `opsx/branch-per-change-workflow` reads naturally. Alternative considered: bare change name — rejected because it doesn't distinguish opsx-driven branches from manual ones.

### Update CLAUDE.md workflow instructions
Add a note under the Build phase that `/opsx:propose` creates a branch. This is the primary place developers read workflow instructions. The specs are the source of truth but CLAUDE.md is what's loaded into context.

### Update specs with MODIFIED delta specs
Both `gstack-lifecycle` and `gstack-workflow` already have implementation phase requirements. Add branching and push steps to those existing requirements rather than creating new ones.

## Risks / Trade-offs

- [Convention not enforced] → Acceptable for now; the goal is to make it the documented default so Claude follows it. CI enforcement can come later.
- [Branch may already exist] → If the branch exists, the workflow should detect it and ask whether to reuse or create fresh. Document this in the spec scenario.
