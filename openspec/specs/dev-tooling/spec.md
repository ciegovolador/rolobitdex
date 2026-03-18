# dev-tooling Specification

## Purpose
TBD - created by archiving change docs-and-coverage. Update Purpose after archive.
## Requirements
### Requirement: README with run instructions
The project SHALL include a README.md with prerequisites, installation steps, and commands to run the app on iOS, Android, and Web.

#### Scenario: Developer reads README and starts app
- **WHEN** a new developer clones the repo and follows the README
- **THEN** they can install dependencies and launch the app on at least one platform

### Requirement: Test suite with coverage
The project SHALL include a Jest test suite that covers the database layer and utility modules, with a coverage report script.

#### Scenario: Run tests
- **WHEN** developer runs `npm test`
- **THEN** all tests execute and results are displayed

#### Scenario: Generate coverage report
- **WHEN** developer runs `npm run test:coverage`
- **THEN** a coverage report is generated showing line, branch, and function coverage

### Requirement: Database layer test coverage
The test suite SHALL include tests for contacts CRUD, banking aliases, silent payment addresses, trust notes, and trade lifecycle operations.

#### Scenario: Test trade state machine
- **WHEN** tests exercise the trade status transitions
- **THEN** valid transitions succeed and invalid transitions throw errors

### Requirement: Utility module documentation
Key exported functions in `src/db/` and `src/lib/` SHALL have JSDoc comments describing parameters and return values.

#### Scenario: Developer reads function docs
- **WHEN** developer hovers over a function in their IDE
- **THEN** JSDoc description, parameter types, and return type are shown

