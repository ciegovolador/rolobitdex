## Purpose

Define the Automation Tester plan review — a QA-focused expert that evaluates every change through testing discipline: coverage completeness, regression safety, end-to-end readiness, code testability, and CI integration fitness.

## ADDED Requirements

### Requirement: Automation Tester review evaluates five dimensions
The `/plan-automation-tester-review` skill SHALL rate each change on five dimensions, scored 0-10, with interactive prompts explaining what a 10 looks like for each.

#### Scenario: Review a feature adding new user flows
- **WHEN** a developer runs `/plan-automation-tester-review` on a change adding new screens or interactions
- **THEN** the review rates the change on Test Coverage, Regression Safety, E2E Readiness, Testability, and CI Integration
- **AND** each dimension includes a score, explanation, and what would make it a 10

#### Scenario: Review a backend-only change
- **WHEN** a developer runs `/plan-automation-tester-review` on a database or utility change
- **THEN** the review still applies all five dimensions but notes which are less applicable
- **AND** focuses depth on Test Coverage and Regression Safety

### Requirement: Test Coverage dimension checks breadth and depth of testing
The Test Coverage dimension SHALL evaluate whether the change adds, modifies, or removes code that is covered by tests — unit, integration, and E2E.

#### Scenario: New code with no tests
- **WHEN** a change adds new functions, components, or database operations with no corresponding tests
- **THEN** the Automation Tester flags the gap and rates Test Coverage accordingly
- **AND** recommends specific test cases that should be written

#### Scenario: Change modifies tested code
- **WHEN** a change modifies code that has existing tests
- **THEN** the Automation Tester verifies that existing tests are updated to reflect the new behavior
- **AND** checks that edge cases introduced by the change are covered

#### Scenario: High coverage change
- **WHEN** a change includes tests for all new code paths, edge cases, and error scenarios
- **THEN** the Test Coverage dimension scores 9-10

### Requirement: Regression Safety dimension evaluates breakage risk
The Regression Safety dimension SHALL identify code paths where the change could introduce regressions and evaluate whether existing tests catch them.

#### Scenario: Change touches shared utility
- **WHEN** a change modifies a function used by multiple modules (e.g., a database helper)
- **THEN** the Automation Tester evaluates whether callers are tested for the new behavior
- **AND** flags any untested consumers as regression risks

#### Scenario: State machine transition change
- **WHEN** a change modifies trade status transitions or contact state
- **THEN** the Automation Tester verifies that all valid and invalid transitions are tested
- **AND** checks for tests that exercise the full lifecycle (create → update → complete)

#### Scenario: No regression risk
- **WHEN** a change is additive-only with no modifications to existing behavior
- **THEN** the Regression Safety dimension scores 8-10

### Requirement: E2E Readiness dimension evaluates end-to-end test coverage
The E2E Readiness dimension SHALL assess whether the change's user-facing flows can be tested end-to-end and whether such tests exist or should be created.

#### Scenario: New user flow without E2E test
- **WHEN** a change adds a new screen, form, or multi-step interaction
- **THEN** the Automation Tester flags the missing E2E test
- **AND** describes the E2E flow that should be automated (steps, assertions, data setup)

#### Scenario: Change affects critical path
- **WHEN** a change modifies a critical user flow (contact creation, trade initiation, payment)
- **THEN** the Automation Tester rates E2E Readiness based on whether the critical path has automated coverage
- **AND** recommends smoke tests if full E2E is not yet feasible

#### Scenario: E2E tests exist and pass
- **WHEN** a change has corresponding E2E tests that exercise the modified flow
- **THEN** the E2E Readiness dimension scores 9-10

### Requirement: Testability dimension evaluates code structure for testing
The Testability dimension SHALL assess whether the code changes are structured in a way that makes testing straightforward — separation of concerns, injectable dependencies, deterministic behavior.

#### Scenario: Tightly coupled code
- **WHEN** a change introduces code that mixes UI rendering, business logic, and data access in a single function
- **THEN** the Automation Tester flags the coupling as a testability concern
- **AND** recommends separation so each layer can be tested independently

#### Scenario: Non-deterministic behavior
- **WHEN** a change relies on timestamps, random values, or external state without injection points
- **THEN** the Automation Tester flags it as hard to test deterministically
- **AND** recommends making time/randomness injectable for testing

#### Scenario: Well-structured testable code
- **WHEN** a change uses pure functions, clear interfaces, and injectable dependencies
- **THEN** the Testability dimension scores 9-10

### Requirement: CI Integration dimension evaluates pipeline readiness
The CI Integration dimension SHALL assess whether the change's tests can run in a CI pipeline and whether the test suite remains fast and reliable.

#### Scenario: Tests require manual setup
- **WHEN** a change adds tests that require manual environment setup (device emulators, external services)
- **THEN** the Automation Tester flags the CI friction and recommends containerized or mocked alternatives

#### Scenario: Slow test added
- **WHEN** a change adds a test that takes more than 10 seconds
- **THEN** the Automation Tester flags the performance impact on CI
- **AND** recommends parallelization or test tier separation (fast unit vs slow E2E)

#### Scenario: CI-ready tests
- **WHEN** all tests in the change run without external dependencies and complete in under 5 seconds each
- **THEN** the CI Integration dimension scores 9-10

### Requirement: Review channels testing thought leaders
The review SHALL activate latent knowledge of testing thought leaders to reason from testing principles, not checklists.

#### Scenario: Cognitive pattern activation
- **WHEN** the review runs
- **THEN** it channels: Kent Beck (TDD, write the test first, simple design), Martin Fowler (test pyramid, integration over mocks), Michael Bolton (testing vs checking, exploratory testing), James Bach (context-driven testing, sapient testing), Lisa Crispin (agile testing quadrants, whole-team quality)
