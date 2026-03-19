## MODIFIED Requirements

### Requirement: Build phase produces OpenSpec artifacts
Every non-trivial change SHALL be tracked as an OpenSpec change using the spec-driven schema. The Build phase SHALL begin by creating a new branch from the latest main.

#### Scenario: Creating a new change
- **WHEN** work begins on a feature via `/opsx:propose`
- **THEN** the workflow SHALL first run `git checkout main && git pull && git checkout -b opsx/<change-name>`
- **AND** then create the change with proposal, design, specs, and tasks

#### Scenario: Branch already exists
- **WHEN** `/opsx:propose` detects that `opsx/<change-name>` already exists
- **THEN** the workflow SHALL ask the developer whether to reuse the existing branch or create a fresh one

#### Scenario: Implementing tasks
- **WHEN** artifacts are complete and tasks are ready
- **THEN** run `/opsx:apply` to work through tasks systematically

#### Scenario: Exploring before committing
- **WHEN** requirements are unclear or multiple approaches exist
- **THEN** run `/opsx:explore` to think through ideas before writing artifacts

#### Scenario: Pushing work on completion
- **WHEN** `/opsx:propose` finishes generating all artifacts
- **THEN** the workflow SHALL commit the artifacts and push the branch to origin
