## 1. Shared Test Setup

- [x] 1.1 Create `src/test/setup.ts` — copy `__tests__/setup.ts` content, no import path changes needed (mocks use module names)

## 2. Move Existing Tests

- [x] 2.1 Move `__tests__/contacts.test.ts` → `src/db/contacts.test.ts` — update import: `./setup` → `../test/setup`, `../src/db/contacts` → `./contacts`
- [x] 2.2 Move `__tests__/trades.test.ts` → `src/db/trades.test.ts` — update imports similarly
- [x] 2.3 Move `__tests__/silentPayments.test.ts` → `src/lib/silentPayments.test.ts` — update imports
- [x] 2.4 Move `__tests__/backup.test.ts` → `src/lib/backup.test.ts` — update imports

## 3. Add Model Layer Tests

- [x] 3.1 Create `src/models/contact.test.ts` — test `getContactInitials()`, `isValidContactName()`, `createContactIdempotent()` (idempotent behavior)
- [x] 3.2 Create `src/models/trade.test.ts` — test `getTradeDescription()`, `getTradeStatusLabel()`, `advanceTradeIdempotent()` (idempotent behavior, transition errors)

## 4. Jest Config & Cleanup

- [x] 4.1 Update `jest.config.js` — change `roots` to `["<rootDir>/src"]`, update `collectCoverageFrom` to exclude `*.test.ts`
- [x] 4.2 Delete `__tests__/` directory

## 5. Verification

- [x] 5.1 Run `npm test` — all existing + new tests pass
- [x] 5.2 Verify no `__tests__/` directory exists
- [x] 5.3 Verify test files are co-located (grep check: every `.test.ts` has a matching source file in same dir)
