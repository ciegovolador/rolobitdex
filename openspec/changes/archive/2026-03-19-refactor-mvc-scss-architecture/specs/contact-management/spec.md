## ADDED Requirements

### Requirement: Contact operations are accessed through model layer
All contact CRUD operations SHALL be accessed through `src/models/contact.ts` which wraps `src/db/contacts.ts` with validation and idempotency.

#### Scenario: Controller creates a contact
- **WHEN** `useContacts()` hook needs to create a contact
- **THEN** it SHALL call `createContactIdempotent()` from `src/models/contact.ts`
- **AND** it SHALL NOT import from `src/db/contacts.ts` directly

#### Scenario: Model re-exports types
- **WHEN** a controller or view needs the `Contact` type
- **THEN** it SHALL import from `src/models/contact.ts` which re-exports from `src/db/contacts.ts`

### Requirement: Contact detail logic is in a dedicated controller
The contact detail screen's complex state (7 sub-forms, aliases, addresses, notes, trades) SHALL be managed by `useContactDetail(id)`.

#### Scenario: Contact detail hook provides all sub-form state
- **WHEN** the contact detail screen renders
- **THEN** `useContactDetail(id)` SHALL return all form states, handlers, and loaded data for aliases, addresses, notes, and trade history
