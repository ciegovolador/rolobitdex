## MODIFIED Requirements

### Requirement: Implementation phase produces OpenSpec artifacts

Every non-trivial change SHALL be tracked as an OpenSpec change with the spec-driven schema. The implementation phase SHALL work locally without pushing to the remote.

#### Scenario: Creating a new change
- **WHEN** work begins on a feature via `/opsx:propose`
- **THEN** the workflow SHALL:
  1. Checkout main and pull latest: `git checkout main && git pull`
  2. Create a new branch: `git checkout -b opsx/<change-name>`
  3. Create the OpenSpec change with proposal, design, specs, and tasks
- **AND** no commit or push SHALL happen automatically

#### Scenario: Branch name collision
- **WHEN** the branch `opsx/<change-name>` already exists
- **THEN** the workflow SHALL ask the developer to reuse the existing branch or pick a new name

#### Scenario: Implementing tasks
- **WHEN** tasks are ready for implementation
- **THEN** use `/opsx:apply` to work through tasks systematically
- **AND** mark each task complete as it is finished
- **AND** no automatic push to remote

#### Scenario: Exploring before committing to a design
- **WHEN** requirements are unclear or multiple approaches exist
- **THEN** use `/opsx:explore` to think through ideas with a partner
- **AND** capture decisions in the change's `design.md`

### Requirement: Release phase ships, documents, and reflects

Shipping is automated end-to-end. Documentation and retrospectives close the loop.

#### Scenario: Archiving completed changes
- **WHEN** a change has been fully implemented and `/opsx:archive` is run
- **THEN** all uncommitted work SHALL be committed and pushed to origin
- **AND** delta specs SHALL be synced to main specs
- **AND** the change directory SHALL be moved to archive
