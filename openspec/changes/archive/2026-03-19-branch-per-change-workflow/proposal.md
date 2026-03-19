## Why

Currently, branching is a manual step the developer must remember before running `/opsx:propose`. This leads to changes being built on stale or wrong branches. The workflow should enforce that every new change starts from a fresh branch pulled from main, and ends with a push — making the branch lifecycle automatic and atomic.

## What Changes

- Update CLAUDE.md workflow instructions so `/opsx:propose` creates a new git branch from latest main before generating artifacts
- Update CLAUDE.md so `/opsx:apply` (or the end of a propose+apply session) pushes the branch to origin
- Update the `gstack-lifecycle` spec to codify this as a requirement on the Build phase
- Update the `gstack-workflow` spec's Implementation phase to reflect the branch-per-change convention

## Capabilities

### New Capabilities

(none — this modifies existing workflow capabilities)

### Modified Capabilities

- `gstack-lifecycle`: Add requirement that `/opsx:propose` SHALL create a new branch from main before generating artifacts, and the workflow SHALL push on completion
- `gstack-workflow`: Update Implementation phase to include automatic branch creation and push steps

## Impact

- `CLAUDE.md` — workflow instructions updated
- `openspec/specs/gstack-lifecycle/spec.md` — modified requirement
- `openspec/specs/gstack-workflow/spec.md` — modified requirement
- No code changes — this is a workflow/documentation change only
