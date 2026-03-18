## Why

The project has 75+ Jest unit tests covering the database layer and utilities, but lacks automated end-to-end testing and a dedicated review role that evaluates changes through a QA/testing lens. Currently, testing quality depends on ad-hoc `/qa` runs and manual verification. An Automation Tester review role — parallel to the Bitcoiner and Cypherpunk roles — would ensure every change is evaluated for testability, coverage gaps, regression risk, and E2E readiness before shipping.

## What Changes

- Introduce an **Automation Tester review role** (`/plan-automation-tester-review`) that evaluates changes on five dimensions: Test Coverage, Regression Safety, E2E Readiness, Testability, and CI Integration
- Add **automation testing infrastructure** with E2E test scaffolding using Detox (React Native) or Maestro for mobile flows and Playwright for web
- Update the **gstack lifecycle** to include the Automation Tester review as an informational gate recommended for changes touching testable user flows
- Update **skill chaining patterns** to include the automation tester in appropriate chains

## Capabilities

### New Capabilities
- `automation-testing`: E2E test infrastructure, test scaffolding, CI integration patterns, and test conventions for the project
- `automation-tester-review`: The Automation Tester plan review role — evaluates changes on Test Coverage, Regression Safety, E2E Readiness, Testability, and CI Integration

### Modified Capabilities
- `review-gates`: Add Automation Tester review as an informational gate (recommended for changes touching user flows, never blocks shipping)
- `skill-chaining`: Add automation tester review to skill chain patterns (after Eng review, before Design review)
- `gstack-lifecycle`: Add `/plan-automation-tester-review` to the Planning phase and Verify phase skill mappings

## Impact

- New skill file: `.claude/skills/plan-automation-tester-review.md`
- New test infrastructure: E2E test directory, configuration, and sample tests
- Updated CLAUDE.md: new skill in lifecycle table, chaining patterns, and review gates section
- Updated specs: review-gates, skill-chaining, gstack-lifecycle with automation tester references
- New dev dependency: E2E testing framework (Detox/Maestro for mobile, Playwright for web)
