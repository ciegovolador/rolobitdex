## Purpose

Ensure the project has comprehensive developer tooling: documentation, test coverage, and code annotations so new contributors can onboard quickly and changes are validated automatically.

## Requirements

### Requirement: README with run instructions
The project SHALL include a README.md with prerequisites, installation steps, and commands to run the app on iOS, Android, and Web. The README SHALL also document `npm run storybook` for launching the design system on port 6006.

#### Scenario: Developer reads README and starts app
- **WHEN** a new developer clones the repo and follows the README
- **THEN** they can install dependencies and launch the app on at least one platform

#### Scenario: Developer reads README and starts storybook
- **WHEN** a new developer follows the README storybook instructions
- **THEN** they can run `npm run storybook` and view the component library on port 6006

### Requirement: Jest test discovery
Jest SHALL discover tests from `src/` directory instead of `__tests__/`. The configuration roots SHALL be set to `["<rootDir>/src"]` with testMatch `["**/*.test.ts", "**/*.test.tsx"]`.

#### Scenario: Run all tests
- **WHEN** the developer runs `npm test`
- **THEN** Jest finds and runs all `*.test.ts` files within `src/`

#### Scenario: Coverage collection
- **WHEN** the developer runs `npm run test:coverage`
- **THEN** Jest collects coverage from `src/**/*.{ts,tsx}` excluding test files, type declarations, and story files

### Requirement: Database layer test coverage
The test suite SHALL include tests for contacts CRUD, banking aliases, silent payment addresses, trust notes, and trade lifecycle operations.

#### Scenario: Test trade state machine
- **WHEN** tests exercise the trade status transitions
- **THEN** valid transitions succeed and invalid transitions throw errors

### Requirement: Metro config supports storybook mode
The `metro.config.js` SHALL wrap the config with `withStorybook` from `@storybook/react-native/metro/withStorybook`, enabled when `EXPO_PUBLIC_STORYBOOK_ENABLED` is `"true"`.

#### Scenario: Metro resolves storybook modules when enabled
- **WHEN** storybook mode is enabled via environment variable
- **THEN** Metro resolves `@storybook/*` imports and serves the storybook entry point

#### Scenario: Metro ignores storybook when disabled
- **WHEN** storybook mode is not enabled
- **THEN** Metro stubs storybook imports and serves the normal app

### Requirement: Browser auto-open disabled
The `npm run web` script SHALL set `BROWSER=none` to prevent Expo from attempting to launch a browser, avoiding crashes on systems without a recognized browser binary.

#### Scenario: Web starts without browser
- **WHEN** a developer runs `npm run web` on a system without firefox or chrome
- **THEN** Metro starts successfully and waits for manual browser navigation

### Requirement: Utility module documentation
Key exported functions in `src/db/` and `src/lib/` SHALL have JSDoc comments describing parameters and return values.

#### Scenario: Developer reads function docs
- **WHEN** developer hovers over a function in their IDE
- **THEN** JSDoc description, parameter types, and return type are shown

### Requirement: Coverage excludes story files
The Jest `collectCoverageFrom` configuration SHALL exclude `*.stories.{ts,tsx}` files so that Storybook story files do not inflate or deflate coverage metrics.

#### Scenario: Story files not counted in coverage
- **WHEN** the developer runs `npm run test:coverage`
- **THEN** files matching `src/**/*.stories.{ts,tsx}` are excluded from the coverage report

### Requirement: Dependency compatibility overrides
When a transitive dependency has a version range that is too loose (e.g., peer dep allows versions rejected at runtime), the project SHALL use npm `overrides` in `package.json` to pin the transitive dependency to a compatible version.

#### Scenario: Reanimated worklets compatibility
- **WHEN** `react-native-reanimated` requires `react-native-worklets` `0.7.x` per its internal compatibility matrix
- **THEN** `package.json` includes an `overrides` entry pinning `react-native-worklets` to `0.7.4`
- **AND** the app starts without a worklets version incompatibility error
