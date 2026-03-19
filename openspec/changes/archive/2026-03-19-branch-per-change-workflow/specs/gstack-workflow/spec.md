## MODIFIED Requirements

### Requirement: Implementation phase produces OpenSpec artifacts

Every non-trivial change SHALL be tracked as an OpenSpec change with the spec-driven schema. The implementation phase SHALL automatically manage branch lifecycle.

#### Scenario: Creating a new change
- **WHEN** work begins on a feature via `/opsx:propose`
- **THEN** the workflow SHALL:
  1. Checkout main and pull latest: `git checkout main && git pull`
  2. Create a new branch: `git checkout -b opsx/<change-name>`
  3. Create the OpenSpec change with proposal, design, specs, and tasks
  4. Commit artifacts and push branch to origin

#### Scenario: Branch name collision
- **WHEN** the branch `opsx/<change-name>` already exists
- **THEN** the workflow SHALL ask the developer to reuse the existing branch or pick a new name

#### Scenario: Implementing tasks
- **WHEN** tasks are ready for implementation
- **THEN** use `/opsx:apply` to work through tasks systematically
- **AND** mark each task complete as it is finished

#### Scenario: Exploring before committing to a design
- **WHEN** requirements are unclear or multiple approaches exist
- **THEN** use `/opsx:explore` to think through ideas with a partner
- **AND** capture decisions in the change's `design.md`

#### Scenario: End of session push
- **WHEN** `/opsx:apply` completes all tasks or the session ends
- **THEN** all work SHALL be committed and pushed to origin
