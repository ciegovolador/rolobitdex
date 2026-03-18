## Context

Rolobitdex is a React Native (Expo) app with no tests or developer docs. The codebase has a database layer (expo-sqlite), trade state machine, and silent payment utilities — all suitable for unit testing. The project uses TypeScript and Expo SDK 55.

## Goals / Non-Goals

**Goals:**
- README with clear run instructions for all 3 platforms
- Jest test suite covering database logic and utilities
- Coverage reporting via Istanbul/Jest built-in
- JSDoc on exported functions in key modules

**Non-Goals:**
- E2E testing (Detox/Maestro) — out of scope for this change
- UI component testing — focus on logic/data layer first
- CI/CD pipeline setup
- Auto-generated API docs site

## Decisions

### 1. jest-expo as test runner
**Choice**: jest-expo preset with @testing-library/react-native
**Rationale**: Official Expo testing setup, handles module resolution and transforms. Well-documented for Expo SDK 55.
**Alternatives**: Vitest (not well-supported for React Native), plain Jest (needs manual RN config).

### 2. Test the data layer, not the UI
**Choice**: Focus tests on `src/db/` and `src/lib/` modules
**Rationale**: These contain the core business logic (CRUD, state machine, validation). UI tests are more fragile and less valuable at this stage. Data layer tests give the most confidence per effort.
**Alternatives**: Full UI snapshot tests (brittle), E2E tests (heavy setup).

### 3. In-memory SQLite for tests
**Choice**: Mock expo-sqlite with an in-memory implementation or test the DAL functions with a test database
**Rationale**: Tests should be fast and isolated. The real SQLite driver needs native modules which aren't available in Jest.

## Risks / Trade-offs

- **[Mocking expo-sqlite]** → Tests may diverge from real SQLite behavior. Mitigation: keep mocks minimal, test SQL logic correctness.
- **[No UI tests]** → UI regressions won't be caught. Mitigation: plan UI testing as a follow-up change.
