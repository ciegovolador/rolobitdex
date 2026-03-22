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

### Requirement: Component test coverage
Every component in `src/components/` SHALL have a colocated `.test.tsx` file that tests rendering, props, accessibility attributes, and user interactions.

#### Scenario: Component test location
- **WHEN** a developer looks for tests for `src/components/Badge.tsx`
- **THEN** the test file exists at `src/components/Badge.test.tsx`

#### Scenario: Component test coverage targets
- **WHEN** the developer runs `npm run test:coverage`
- **THEN** the `src/components/` directory has at least 90% statement coverage

### Requirement: Design system test coverage
The design token definitions (`src/design/tokens.ts`) and theme provider (`src/design/ThemeProvider.tsx`) SHALL have colocated test files verifying token structure, theme switching, and context behavior.

#### Scenario: Design token tests
- **WHEN** a developer runs tests for `src/design/`
- **THEN** tests verify both dark and light themes have all required color, spacing, typography, and animation tokens

#### Scenario: ThemeProvider tests
- **WHEN** a developer runs tests for ThemeProvider
- **THEN** tests verify default theme, theme toggling, explicit theme setting, and error when used outside provider

### Requirement: Model test coverage
Every model in `src/models/` SHALL have a colocated test file. Models with external dependencies (e.g., biometrics, secure store) SHALL mock those dependencies.

#### Scenario: Settings model test
- **WHEN** a developer looks for tests for `src/models/settings.ts`
- **THEN** the test file exists at `src/models/settings.test.ts`
- **AND** tests mock `expo-local-authentication`, `expo-secure-store`, and `../lib/backup`

### Requirement: Style mixin test coverage
Shared style mixins in `src/styles/mixins.ts` SHALL have a colocated test file verifying each mixin returns the correct ViewStyle properties.

#### Scenario: Mixin test
- **WHEN** a developer runs tests for `src/styles/`
- **THEN** tests verify `rowLayout`, `cardBase`, and `formGroup` return correct style objects
