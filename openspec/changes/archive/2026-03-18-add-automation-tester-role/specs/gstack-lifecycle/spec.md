## ADDED Requirements

### Requirement: Planning phase includes Automation Tester review
The Planning phase SHALL include `/plan-automation-tester-review` as an optional review role for changes that touch testable user flows or modify tested code.

#### Scenario: Change touches user flows
- **WHEN** a change adds or modifies user-facing screens, forms, or multi-step interactions
- **THEN** the developer SHALL be recommended to run `/plan-automation-tester-review`

#### Scenario: Change modifies tested code
- **WHEN** a change modifies functions or modules that have existing test coverage
- **THEN** the developer SHALL be recommended to run `/plan-automation-tester-review`

#### Scenario: Trivial change skips automation tester review
- **WHEN** a change is < 20 lines, config-only, or a typo fix
- **THEN** the Automation Tester review is not recommended

### Requirement: Every change starts on a new branch from main
Before implementation begins, the developer SHALL create a new branch from the latest main branch. Work SHALL NOT be done directly on main.

#### Scenario: Starting a new feature
- **WHEN** a developer begins work on a new change
- **THEN** they SHALL run `git checkout main && git pull && git checkout -b <branch-name>`
- **AND** the branch name SHALL use kebab-case describing the change (e.g., `add-automation-tester-role`)

#### Scenario: Continuing work on an existing branch
- **WHEN** a developer returns to in-progress work
- **THEN** they SHALL checkout the existing feature branch
- **AND** merge or rebase from main if main has advanced

#### Scenario: Trivial fix
- **WHEN** a change is < 20 lines, config-only, or a typo fix
- **THEN** the developer SHALL still create a branch — direct commits to main are not allowed

### Requirement: Pushing directly to main is disallowed
All changes to main SHALL go through a pull request. Direct pushes to main are forbidden.

#### Scenario: Developer attempts to push to main
- **WHEN** a developer runs `git push origin main`
- **THEN** the push SHALL be rejected
- **AND** the developer SHALL be directed to create a PR from a feature branch instead

#### Scenario: Ship workflow targets main via PR
- **WHEN** `/ship` creates a PR
- **THEN** the PR target branch SHALL be main
- **AND** the code reaches main only after the PR is merged

#### Scenario: Force push to main
- **WHEN** a developer attempts `git push --force origin main`
- **THEN** the push SHALL be rejected — force pushing to main is never allowed

### Requirement: Verify phase includes E2E test execution
The Verify phase SHALL include running E2E tests when they exist for the affected user flows.

#### Scenario: E2E tests exist for modified flow
- **WHEN** a change modifies a user flow that has E2E test coverage
- **THEN** the developer SHALL run the relevant E2E tests as part of verification
- **AND** `/qa` or `/ship` SHALL recommend running `npm run test:e2e` if E2E tests are detected
