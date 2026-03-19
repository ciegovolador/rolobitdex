## Why

Screens currently mix data fetching, business logic, form state management, and rendering in single files (e.g., `app/contact/[id].tsx` is 337 lines handling 7 sub-forms, 10+ async operations, and all UI). This makes screens hard to test in isolation, hard to reason about, and tightly coupled to the database layer. Extracting a clear Model–View–Controller separation will make every layer independently testable, every component reusable, and every data operation idempotent.

**SCSS note:** React Native does not support CSS/SCSS — it uses `StyleSheet.create()` with JavaScript objects. Instead of SCSS+BEM, this refactor adopts **BEM-inspired naming conventions** for style objects and extracts all styles into co-located style modules following a `block__element--modifier` naming pattern translated to JS (e.g., `tradeRow__status--pending`). This achieves the same goals: discoverable, predictable, scoped styling.

## What Changes

### Architecture (MVC separation)

- **Model layer** (`src/models/`): Extract typed interfaces and business logic from screens. Each model owns its validation, state transitions, and derived data. Trade status machine stays here. All model functions are **pure and idempotent** — calling `getContact(id)` or `updateTradeStatus(id, status)` N times produces the same result.
- **Controller layer** (`src/controllers/`): Custom React hooks (`useContacts`, `useTrades`, `useAddress`, `useSettings`) that bridge models and views. Controllers own async state (loading, error), data fetching lifecycle (`useFocusEffect`), and mutation handlers. Screens become thin wrappers: `const { contacts, search, create } = useContacts()`.
- **View layer** (`src/views/`): Pure presentational components — receive data and callbacks via props, zero side effects, zero data fetching. Every current screen's render tree becomes a dumb view. Views are independently testable with mock props.

### Styling (BEM-inspired naming)

- **Co-located style modules**: Each view gets a `*.styles.ts` file exporting a `StyleSheet.create()` object with BEM-inspired key names: `block`, `block__element`, `block__element_modifier`.
- **Theme consumption**: Style modules import from `src/constants/theme.ts` (no changes to existing theme). Styles are deterministic — same input theme → same output styles.
- **Shared style mixins**: Common patterns (card layout, row layout, form group) extracted into `src/styles/mixins.ts` as composable style-generating functions.

### Idempotency

- **Database operations**: All writes check current state before mutating — `updateTradeStatus` becomes a no-op if already at target status. `createContact` with same name returns existing ID instead of throwing.
- **Controller hooks**: Expose stable function references via `useCallback` — re-renders don't create new closures. Loading states prevent double-submission.
- **Navigation guards**: Form submissions use `router.replace()` (already done) to prevent duplicate creation on back-navigation.

### Dumb Presentational Components

- **Existing components** (`Button`, `Input`, `Card`, etc.) are already presentational — no changes needed.
- **Screen decomposition**: Each screen's inline render logic is extracted into named view components. Example: `ContactsScreen` → `ContactListView` (receives `contacts`, `onSelect`, `onSearch`), `ContactRowView` (receives `contact`, `onPress`), `EmptyStateView` (receives `message`, `hint`).

## Capabilities

### New Capabilities
- `mvc-architecture`: Defines the Model–View–Controller separation pattern, directory structure, naming conventions, and data flow rules for all screens and components.
- `style-system`: Defines BEM-inspired style module conventions, co-location rules, mixin patterns, and naming standards for React Native StyleSheet objects.
- `idempotent-operations`: Defines idempotency requirements for database writes, controller hooks, and navigation guards.

### Modified Capabilities
- `contact-management`: Contact CRUD operations move to model layer with idempotent write semantics.
- `trade-flow`: Trade operations move to model layer; status transitions become explicitly idempotent.
- `ui-design-system`: Style system extended with BEM-inspired naming conventions and co-located style modules.

## Impact

- **All 8 screen files** in `app/` refactored to thin controller+view wiring
- **`src/db/`** files wrapped by new `src/models/` layer (DB functions remain, models add business logic)
- **New directories**: `src/controllers/`, `src/views/`, `src/styles/`
- **Test surface**: Controller hooks testable with `@testing-library/react-hooks`, views testable with mock props, models testable as pure functions
- **No dependency changes** — no new packages needed (React hooks are built-in, StyleSheet is built-in)
- **No API changes** — internal refactor, all routes and behavior remain identical
- **75 existing Jest tests** must continue passing — models wrap the same DB functions
- **24 E2E tests** must continue passing — UI behavior unchanged
