## Why

The MVC refactor is complete — models, controllers, views, and styles are all separated into co-located files. But unit tests still live in a separate root `__tests__/` directory, disconnected from the code they test. Moving tests next to their source files makes the component "folder as module" pattern complete: `ComponentName.tsx`, `ComponentName.styles.ts`, `ComponentName.test.ts` all live together.

## What Changes

- Move `__tests__/contacts.test.ts` → `src/db/contacts.test.ts`
- Move `__tests__/trades.test.ts` → `src/db/trades.test.ts`
- Move `__tests__/silentPayments.test.ts` → `src/lib/silentPayments.test.ts`
- Move `__tests__/backup.test.ts` → `src/lib/backup.test.ts`
- Move `__tests__/setup.ts` → `src/test/setup.ts` (shared test utilities)
- Update Jest config: change `roots` to `["<rootDir>/src"]` and adjust `testMatch`
- Add new model-layer tests co-located with models (e.g., `src/models/contact.test.ts`)

## Capabilities

### New Capabilities
- `colocated-tests`: Convention for placing unit tests alongside source files in the same directory

### Modified Capabilities
- `dev-tooling`: Jest config roots change from `__tests__/` to `src/`

## Impact

- All files in `__tests__/` directory moved into `src/` subdirectories
- `jest.config.js` updated
- Import paths in test files updated (shorter relative paths)
- `__tests__/` directory removed
