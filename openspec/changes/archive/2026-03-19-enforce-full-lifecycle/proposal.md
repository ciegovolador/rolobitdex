## Why

The gstack lifecycle has four phases (Plan → Build → Verify → Ship) with many available review and QA skills, but currently Claude only runs them when explicitly asked. The workflow should be autonomous — when `/opsx:propose` starts a change, Claude SHALL automatically determine which reviews are relevant based on the change scope and run them all before generating artifacts. Similarly, after `/opsx:apply`, Claude SHALL automatically run verification and ship. The goal: one command (`/opsx:propose`) triggers the full company-like pipeline end-to-end.

## What Changes

- Update CLAUDE.md to document the autonomous full-lifecycle convention: `/opsx:propose` triggers Plan reviews automatically, `/opsx:archive` triggers Verify + Ship automatically
- Add a new "Autonomous Lifecycle" section that maps change scope to required reviews
- Update `gstack-lifecycle` spec: propose SHALL auto-run relevant plan reviews; archive SHALL auto-run verification and commit+push
- Update `gstack-workflow` spec: document the autonomous orchestration pattern
- Add branching convention: propose creates `opsx/<change-name>` from main, archive commits and pushes

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `gstack-lifecycle`: Build phase SHALL auto-detect change scope and run all relevant plan reviews before generating artifacts. Archive SHALL commit, push, and optionally trigger ship workflow.
- `gstack-workflow`: Implementation phase documents autonomous orchestration — Claude works as an autonomous company, running all phases without waiting for manual skill invocations.

## Impact

- `CLAUDE.md` — major update to workflow instructions
- `openspec/specs/gstack-lifecycle/spec.md` — modified Build and Release requirements
- `openspec/specs/gstack-workflow/spec.md` — modified Implementation and Release requirements
- No code changes — workflow/documentation only
