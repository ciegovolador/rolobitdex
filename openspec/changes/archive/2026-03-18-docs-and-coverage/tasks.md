## 1. Documentation

- [x] 1.1 Create README.md with project overview, prerequisites, install, and run commands
- [x] 1.2 Add JSDoc comments to src/db/database.ts, src/db/contacts.ts, src/db/trades.ts
- [x] 1.3 Add JSDoc comments to src/lib/silentPayments.ts and src/lib/backup.ts

## 2. Test Framework Setup

- [x] 2.1 Install jest-expo, @testing-library/react-native, and related devDependencies
- [x] 2.2 Create jest.config.js with jest-expo preset
- [x] 2.3 Add test and test:coverage scripts to package.json

## 3. Database Layer Tests

- [x] 3.1 Create mock/setup for expo-sqlite (in-memory or mock)
- [x] 3.2 Write tests for contacts CRUD (create, read, update, delete, search)
- [x] 3.3 Write tests for banking aliases (create, delete, list by contact)
- [x] 3.4 Write tests for silent payment addresses (create, delete, list by contact)
- [x] 3.5 Write tests for trust notes (create, update, delete)
- [x] 3.6 Write tests for trade lifecycle (create, status transitions, invalid transitions, cancel)

## 4. Utility Tests

- [x] 4.1 Write tests for silentPayments (address validation, generation)
- [x] 4.2 Write tests for backup export/import data structure
