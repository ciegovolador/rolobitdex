## Context

Currently, 75 unit tests live in `__tests__/` at the project root, testing code in `src/db/` and `src/lib/`. The MVC refactor created `src/models/`, `src/controllers/`, and `src/views/` but tests weren't moved. The project follows a "folder as module" pattern where each component has co-located `.styles.ts` — tests should follow the same pattern.

## Goals / Non-Goals

**Goals:**
- Every test file lives next to the source it tests (e.g., `src/db/contacts.test.ts` alongside `src/db/contacts.ts`)
- Shared test setup lives in `src/test/setup.ts`
- Jest config updated to find tests anywhere in `src/`
- All 75 existing tests continue to pass
- Add model-layer tests for the new business logic functions

**Non-Goals:**
- Changing test content or test framework
- Adding new test coverage for views or controllers (future work)
- Moving E2E tests (they stay in `e2e/`)

## Decisions

**1. Tests named `*.test.ts` next to source**
- Pattern: `src/db/contacts.ts` → `src/db/contacts.test.ts`
- Rationale: Maximizes discoverability. When you open a folder, you see code + styles + tests together.

**2. Shared test setup in `src/test/setup.ts`**
- Rationale: Mock DB, mock SecureStore, mock FileSystem are shared across multiple test files. A `src/test/` directory keeps them discoverable without polluting feature folders.

**3. Jest roots: `["<rootDir>/src"]`**
- Rationale: Single root that contains all source and test files. Simpler than listing multiple directories.

## Risks / Trade-offs

- **Import path changes** → All test files need import path updates. Low risk since paths get shorter (e.g., `../src/db/contacts` → `./contacts`).
- **No tests for views/controllers yet** → Intentional non-goal. The co-location convention is established for future test additions.
