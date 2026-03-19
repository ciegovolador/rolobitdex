## 1. Foundation: Shared Styles & Mixins

- [x] 1.1 Create `src/styles/mixins.ts` with `rowLayout()`, `cardBase()`, `formGroup()` style functions
- [x] 1.2 Create `src/views/shared/EmptyState.tsx` + `EmptyState.styles.ts` — extracted from contacts/trades empty states
- [x] 1.3 Create `src/views/shared/SectionHeader.tsx` + `SectionHeader.styles.ts` — extracted from contact detail
- [x] 1.4 Create `src/views/shared/FAB.tsx` + `FAB.styles.ts` — extracted from contacts/trades FAB

## 2. Models: Business Logic Layer

- [x] 2.1 Create `src/models/contact.ts` — re-export types from db, add `createContactIdempotent()`, `getContactInitials()`, `isValidContactName()`
- [x] 2.2 Create `src/models/trade.ts` — re-export types from db, add `advanceTradeIdempotent()`, `getTradeDescription()`, `getTradeStatusLabel()`
- [x] 2.3 Create `src/models/address.ts` — wrap `getOrCreateAddress()` from `src/lib/silentPayments.ts`
- [x] 2.4 Create `src/models/settings.ts` — wrap biometric check/toggle and backup export logic

## 3. Controllers: Custom Hooks

- [x] 3.1 Create `src/controllers/useContacts.ts` — returns `{ contacts, query, search, create, loading }`; owns `useFocusEffect` and search/create logic
- [x] 3.2 Create `src/controllers/useContactDetail.ts` — returns all form states (name edit, alias/address/note forms), handlers, loaded data (contact, aliases, addresses, notes, trades)
- [x] 3.3 Create `src/controllers/useTrades.ts` — returns `{ trades, filter, setFilter, loading }`; owns `useFocusEffect` and contact name enrichment
- [x] 3.4 Create `src/controllers/useTradeDetail.ts` — returns `{ trade, contactName, advance, cancel, loading }`
- [x] 3.5 Create `src/controllers/useAddress.ts` — returns `{ address, copied, handleCopy, handleShare }`
- [x] 3.6 Create `src/controllers/useSettings.ts` — returns `{ biometricEnabled, biometricAvailable, toggleBiometric, showExport, passphrase, handleExport, ... }`
- [x] 3.7 Create `src/controllers/useNewContact.ts` — returns `{ name, setName, save, loading }`
- [x] 3.8 Create `src/controllers/useNewTrade.ts` — returns `{ contacts, selectedContact, type, sats, fiatCurrency, fiatAmount, setters, create, loading }`

## 4. Views: Contacts

- [x] 4.1 Create `src/views/contacts/ContactListView.tsx` + `.styles.ts` — receives `{ contacts, query, onSearch, onSelect, numColumns }`, renders search + list
- [x] 4.2 Create `src/views/contacts/ContactRowView.tsx` + `.styles.ts` — receives `{ contact, onPress }`, renders avatar + name + chevron
- [x] 4.3 Refactor `app/(tabs)/index.tsx` — thin screen: `useContacts()` + `ContactListView` + `FAB`, under 30 lines

## 5. Views: Trades

- [x] 5.1 Create `src/views/trades/TradeListView.tsx` + `.styles.ts` — receives `{ trades, filter, onFilterChange, onSelect, numColumns }`
- [x] 5.2 Create `src/views/trades/TradeRowView.tsx` + `.styles.ts` — receives `{ trade, onPress }`
- [x] 5.3 Create `src/views/trades/TradeFilterBar.tsx` + `.styles.ts` — receives `{ filter, onFilterChange, filters }`
- [x] 5.4 Refactor `app/(tabs)/trades.tsx` — thin screen: `useTrades()` + `TradeListView` + `FAB`

## 6. Views: Address & Settings

- [x] 6.1 Create `src/views/address/AddressView.tsx` + `.styles.ts` — receives `{ address, copied, onCopy, onShare }`
- [x] 6.2 Refactor `app/(tabs)/address.tsx` — thin screen: `useAddress()` + `AddressView`
- [x] 6.3 Create `src/views/settings/SettingsView.tsx` + `.styles.ts` — receives all settings state as props
- [x] 6.4 Refactor `app/(tabs)/settings.tsx` — thin screen: `useSettings()` + `SettingsView`

## 7. Views: Contact Detail (most complex)

- [x] 7.1 Create `src/views/contacts/ContactHeaderView.tsx` + `.styles.ts` — name display/edit, avatar
- [x] 7.2 Create `src/views/contacts/AliasSectionView.tsx` + `.styles.ts` — alias list + add form
- [x] 7.3 Create `src/views/contacts/AddressSectionView.tsx` + `.styles.ts` — address list + add form
- [x] 7.4 Create `src/views/contacts/NoteSectionView.tsx` + `.styles.ts` — note list + add form
- [x] 7.5 Create `src/views/contacts/TradeHistoryView.tsx` + `.styles.ts` — trade list with navigation
- [x] 7.6 Create `src/views/contacts/ContactDetailView.tsx` + `.styles.ts` — composes all sub-views
- [x] 7.7 Refactor `app/contact/[id].tsx` — thin screen: `useContactDetail()` + `ContactDetailView`

## 8. Views: Trade Detail & Forms

- [x] 8.1 Create `src/views/trades/TradeDetailView.tsx` + `.styles.ts` — card, progress steps, action buttons
- [x] 8.2 Create `src/views/trades/TradeProgressView.tsx` + `.styles.ts` — status step indicator
- [x] 8.3 Refactor `app/trade/[id].tsx` — thin screen: `useTradeDetail()` + `TradeDetailView`
- [x] 8.4 Create `src/views/contacts/NewContactView.tsx` + `.styles.ts` — name input + save button
- [x] 8.5 Refactor `app/contact/new.tsx` — thin screen: `useNewContact()` + `NewContactView`
- [x] 8.6 Create `src/views/trades/NewTradeView.tsx` + `.styles.ts` — type selector, contact chips, amount inputs
- [x] 8.7 Refactor `app/trade/new.tsx` — thin screen: `useNewTrade()` + `NewTradeView`

## 9. Verification

- [x] 9.1 Run Jest test suite (`npm test`) — all 75 tests pass
- [x] 9.2 Run Playwright E2E tests (`npm run test:e2e:web`) — all 24 tests pass
- [x] 9.3 Verify no view component imports from `src/db/` (grep check)
- [x] 9.4 Verify no screen file contains `StyleSheet.create` (grep check)
