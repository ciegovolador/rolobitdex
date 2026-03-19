## Purpose

Ensure the project has comprehensive developer tooling: documentation, test coverage, and code annotations so new contributors can onboard quickly and changes are validated automatically.

## Requirements

### Requirement: README with run instructions
The project SHALL include a README.md with prerequisites, installation steps, and commands to run the app on iOS, Android, and Web.

#### Scenario: Developer reads README and starts app
- **WHEN** a new developer clones the repo and follows the README
- **THEN** they can install dependencies and launch the app on at least one platform

### Requirement: Jest test discovery
Jest SHALL discover tests from `src/` directory instead of `__tests__/`. The configuration roots SHALL be set to `["<rootDir>/src"]` with testMatch `["**/*.test.ts", "**/*.test.tsx"]`.

#### Scenario: Run all tests
- **WHEN** the developer runs `npm test`
- **THEN** Jest finds and runs all `*.test.ts` files within `src/`

#### Scenario: Coverage collection
- **WHEN** the developer runs `npm run test:coverage`
- **THEN** Jest collects coverage from `src/**/*.{ts,tsx}` excluding test files and type declarations

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
