## Why

The current branch naming convention (`SCOPE/IP-NUMBER-DESCRIPTION`) has four scopes (`feature`, `bugfix`, `hotfix`, `release`) but no scope for spec/documentation-only changes. Additionally, IPs (Improvement Proposals) are currently just sequential numbers with no formal tracking — treating them like JIRA tickets or Bitcoin BIPs would make the workflow more structured and discoverable.

## What Changes

- Add `spec` as a fifth SCOPE value for changes that only touch specs, documentation, or workflow definitions
- Formalize IP tracking: each IP gets a dedicated section in a tracking document (similar to BIP index or JIRA board), listing number, title, status, and branch
- Update scope auto-detection rules to recognize spec/docs-only changes
- Update all references in CLAUDE.md, lifecycle spec, and workflow spec

## Capabilities

### New Capabilities

- `ip-tracking`: Formal IP (Improvement Proposal) registry — an index of all IPs with number, title, status (proposed/active/merged/abandoned), branch, and date

### Modified Capabilities

- `gstack-lifecycle`: Add `spec` scope to branch naming format and scope auto-detection scenarios
- `gstack-workflow`: Add `spec` scope to branch name examples and autonomous propose workflow

## Impact

- `CLAUDE.md` — add `spec` scope to Autonomous Workflow Convention
- `openspec/specs/gstack-lifecycle/spec.md` — update branch naming and scope detection
- `openspec/specs/gstack-workflow/spec.md` — update branch examples
- New `IP-INDEX.md` (or similar) at project root for IP tracking
