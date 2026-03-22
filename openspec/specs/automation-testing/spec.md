## Purpose

Define the E2E testing infrastructure, conventions, and scaffolding for the project so that user flows can be tested automatically across mobile and web platforms.

## Requirements

### Requirement: E2E test directory structure follows conventions
The project SHALL have an `e2e/` directory at the root with platform-specific subdirectories and shared test utilities.

#### Scenario: Developer looks for E2E tests
- **WHEN** a developer navigates to the `e2e/` directory
- **THEN** they find `e2e/web/` for Playwright tests, `e2e/mobile/` for Maestro flows, and `e2e/helpers/` for shared utilities

#### Scenario: New E2E test creation
- **WHEN** a developer creates a new E2E test
- **THEN** they follow the naming convention `<feature>.test.ts` (web) or `<feature>.yaml` (mobile)
- **AND** place it in the appropriate platform subdirectory

### Requirement: Web E2E tests use Playwright against Expo web build
The project SHALL use Playwright for end-to-end testing of the Expo web build.

#### Scenario: Run web E2E tests
- **WHEN** developer runs `npm run test:e2e:web`
- **THEN** Playwright launches the Expo web build and executes all tests in `e2e/web/`
- **AND** results are displayed with pass/fail for each test

#### Scenario: Web E2E test exercises contact creation
- **WHEN** the contact creation E2E test runs
- **THEN** it navigates to the contacts screen, fills in contact details, saves, and verifies the contact appears in the list

### Requirement: Mobile E2E tests use Maestro flows
The project SHALL use Maestro for end-to-end testing of React Native mobile builds.

#### Scenario: Run mobile E2E tests
- **WHEN** developer runs `npm run test:e2e:mobile`
- **THEN** Maestro executes all YAML flow files in `e2e/mobile/`
- **AND** results are displayed with pass/fail for each flow

#### Scenario: Mobile flow tests trade creation
- **WHEN** the trade creation Maestro flow runs
- **THEN** it taps through the trade creation UI, enters trade details, and verifies the trade appears in the trade list

### Requirement: E2E tests cover critical user paths
The project SHALL have E2E tests for the critical user paths: contact management, trade lifecycle, and silent payment address display.

#### Scenario: Critical path coverage audit
- **WHEN** a developer runs the full E2E suite
- **THEN** the following paths are tested: add contact, edit contact, delete contact, create trade, update trade status, view silent payment address

### Requirement: Test scripts are registered in package.json
The project SHALL expose E2E test commands via npm scripts.

#### Scenario: Developer runs E2E tests
- **WHEN** developer checks `package.json` scripts
- **THEN** they find `test:e2e:web`, `test:e2e:mobile`, and `test:e2e` (runs both)

### Requirement: E2E test helpers provide common setup and teardown
The project SHALL include shared helpers for database seeding, test data factories, and app state reset.

#### Scenario: Test uses helper to seed data
- **WHEN** an E2E test needs a contact to exist before testing trade creation
- **THEN** it imports a helper from `e2e/helpers/` to seed the database with test data
- **AND** the helper cleans up after the test completes

### Requirement: App state reset awaits IndexedDB deletion
The `resetAppState` helper SHALL await full completion of IndexedDB database deletions before returning. `indexedDB.deleteDatabase()` returns an `IDBOpenDBRequest` (event-based, not promise-based), so each deletion SHALL be wrapped in a Promise that resolves on `onsuccess`, `onerror`, or `onblocked`, and all deletions SHALL be awaited via `Promise.all()`.

#### Scenario: No stale data between tests
- **WHEN** a test calls `resetAppState` followed by `page.reload()`
- **THEN** all IndexedDB databases are fully deleted before the reload occurs
- **AND** the next test starts with a clean database

#### Scenario: Concurrent test execution is deterministic
- **WHEN** the full E2E suite runs with parallel workers
- **THEN** no test fails due to stale data from a previous test's database

### Requirement: Playwright webServer uses project root as cwd
The Playwright config `webServer.cwd` SHALL be set to the project root directory (resolved via `path.resolve(__dirname, '../..')`) so that Expo can find `package.json` and `app.json` when the config file lives in `e2e/web/`.

#### Scenario: E2E tests start the dev server
- **WHEN** Playwright starts the web server from `e2e/web/playwright.config.ts`
- **THEN** Expo resolves `package.json` from the project root, not from `e2e/web/`
