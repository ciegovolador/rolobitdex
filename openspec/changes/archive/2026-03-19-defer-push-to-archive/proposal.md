## Why

The current workflow (from `branch-per-change-workflow`) has `/opsx:propose` committing+pushing artifacts and `/opsx:apply` pushing on completion. This is premature — work-in-progress artifacts and partial implementations shouldn't be pushed until the change is fully complete and archived. Deferring commit+push to `/opsx:archive` keeps the remote clean and makes the push a deliberate "I'm done" signal.

## What Changes

- Update CLAUDE.md Build phase convention: remove push from `/opsx:propose` and `/opsx:apply`, add commit+push to `/opsx:archive`
- Update `gstack-lifecycle` spec: Build phase no longer pushes; archive step commits and pushes
- Update `gstack-workflow` spec: same adjustment

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `gstack-lifecycle`: Move commit+push from Build phase to archive step in Release phase
- `gstack-workflow`: Same — Implementation phase works locally, Release phase pushes

## Impact

- `CLAUDE.md` — Build phase convention updated
- `openspec/specs/gstack-lifecycle/spec.md` — modified Build and Release requirements
- `openspec/specs/gstack-workflow/spec.md` — modified Implementation and Release requirements
- No code changes — workflow/documentation only
