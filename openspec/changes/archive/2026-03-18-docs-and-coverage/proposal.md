## Why

The project has no README with run instructions, no test suite, and no code documentation. New contributors (or the developer after a break) have no quick way to understand how to start the app, run tests, or navigate the codebase.

## What Changes

- Add a README.md with project overview, prerequisites, install steps, and run commands for iOS, Android, and Web
- Set up Jest + React Native Testing Library for unit/integration tests
- Add test coverage for the database layer (contacts CRUD, trades lifecycle, state machine)
- Add test coverage for the silent payments utility (address generation, validation)
- Add npm scripts for running tests and generating coverage reports
- Add inline JSDoc comments to key modules (database, trades, silent payments)

## Capabilities

### New Capabilities
- `dev-tooling`: Test framework setup, coverage scripts, and developer documentation

### Modified Capabilities
<!-- No spec-level behavior changes — this is tooling/docs only -->

## Impact

- **New files**: README.md, jest.config.js, test files under `__tests__/`
- **Modified files**: package.json (new scripts, devDependencies)
- **Dependencies**: jest, @testing-library/react-native, jest-expo
- **No runtime behavior changes** — purely developer experience
