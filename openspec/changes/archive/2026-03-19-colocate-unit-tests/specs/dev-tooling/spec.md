## MODIFIED Requirements

### Requirement: Jest test discovery
Jest SHALL discover tests from `src/` directory instead of `__tests__/`. The configuration roots SHALL be set to `["<rootDir>/src"]` with testMatch `["**/*.test.ts", "**/*.test.tsx"]`.

#### Scenario: Run all tests
- **WHEN** the developer runs `npm test`
- **THEN** Jest finds and runs all `*.test.ts` files within `src/`

#### Scenario: Coverage collection
- **WHEN** the developer runs `npm run test:coverage`
- **THEN** Jest collects coverage from `src/**/*.{ts,tsx}` excluding test files and type declarations
