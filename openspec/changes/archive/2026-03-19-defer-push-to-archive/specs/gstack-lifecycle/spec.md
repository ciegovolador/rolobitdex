## MODIFIED Requirements

### Requirement: Build phase produces OpenSpec artifacts
Every non-trivial change SHALL be tracked as an OpenSpec change using the spec-driven schema. The Build phase SHALL begin by creating a new branch from the latest main. Work SHALL remain local (uncommitted to remote) until archive.

#### Scenario: Creating a new change
- **WHEN** work begins on a feature via `/opsx:propose`
- **THEN** the workflow SHALL first run `git checkout main && git pull && git checkout -b opsx/<change-name>`
- **AND** then create the change with proposal, design, specs, and tasks
- **AND** the artifacts SHALL NOT be committed or pushed automatically

#### Scenario: Branch already exists
- **WHEN** `/opsx:propose` detects that `opsx/<change-name>` already exists
- **THEN** the workflow SHALL ask the developer whether to reuse the existing branch or create a fresh one

#### Scenario: Implementing tasks
- **WHEN** artifacts are complete and tasks are ready
- **THEN** run `/opsx:apply` to work through tasks systematically
- **AND** work SHALL remain local — no automatic push

#### Scenario: Exploring before committing
- **WHEN** requirements are unclear or multiple approaches exist
- **THEN** run `/opsx:explore` to think through ideas before writing artifacts

### Requirement: Archiving completed changes
Archiving SHALL be the point at which all work is committed and pushed to the remote.

#### Scenario: Archive commits and pushes
- **WHEN** `/opsx:archive` completes successfully
- **THEN** all uncommitted work SHALL be staged, committed, and pushed to origin

#### Scenario: Archive with nothing to push
- **WHEN** all work was already committed and pushed manually
- **THEN** `/opsx:archive` SHALL skip the push step gracefully
