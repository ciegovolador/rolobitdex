## Purpose

Ensure unit tests are co-located alongside the source files they test, making test discovery intuitive and keeping related code together.

## Requirements

### Requirement: Tests co-located with source
Each unit test file SHALL be placed in the same directory as the source file it tests, using the naming convention `<filename>.test.ts`.

#### Scenario: DB layer test location
- **WHEN** a developer looks for tests for `src/db/contacts.ts`
- **THEN** the test file exists at `src/db/contacts.test.ts`

#### Scenario: Lib layer test location
- **WHEN** a developer looks for tests for `src/lib/backup.ts`
- **THEN** the test file exists at `src/lib/backup.test.ts`

#### Scenario: Model layer test location
- **WHEN** a developer looks for tests for `src/models/contact.ts`
- **THEN** the test file exists at `src/models/contact.test.ts`

### Requirement: Shared test utilities
Shared test setup code (mock DB, mock modules) SHALL live in `src/test/setup.ts`.

#### Scenario: Import shared setup
- **WHEN** a test file needs the mock database
- **THEN** it imports from `../test/setup` (relative path from within `src/`)

### Requirement: No root-level test directory
The project SHALL NOT have a top-level `__tests__/` directory. All unit tests live within `src/`.

#### Scenario: Clean project root
- **WHEN** a developer lists the project root
- **THEN** there is no `__tests__/` directory
