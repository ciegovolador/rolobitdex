## Requirements

### Requirement: Create a contact
The system SHALL allow users to create a new contact with a display name and optional avatar.

#### Scenario: Create contact with name only
- **WHEN** user submits a new contact form with display name "Alice"
- **THEN** the system creates a contact record with name "Alice" and an auto-generated unique ID

#### Scenario: Create contact with duplicate name
- **WHEN** user creates a contact with a name that already exists
- **THEN** the system SHALL allow it (names are not unique identifiers)

### Requirement: Add banking alias to contact
The system SHALL allow users to add one or more banking aliases to a contact. Each alias MUST include a bank name and account identifier (e.g., CLABE, CBU, account number). An optional alias label (e.g., "personal", "business") MAY be provided.

#### Scenario: Add a banking alias
- **WHEN** user adds a banking alias with bank "BBVA", account "012345678901234567", label "personal" to contact "Alice"
- **THEN** the alias is stored and displayed under Alice's contact profile

#### Scenario: Add multiple aliases to same contact
- **WHEN** user adds a second banking alias to contact "Alice"
- **THEN** both aliases are listed under Alice's profile

### Requirement: Add Bitcoin silent payment address to contact
The system SHALL allow users to store one or more Bitcoin silent payment addresses per contact.

#### Scenario: Add silent payment address
- **WHEN** user adds a silent payment address to contact "Alice"
- **THEN** the address is stored and displayed in Alice's contact profile

#### Scenario: Validate silent payment address format
- **WHEN** user enters an invalid silent payment address
- **THEN** the system SHALL display a validation error and not save the address

### Requirement: Edit a contact
The system SHALL allow users to edit any field of an existing contact, including name, aliases, and addresses.

#### Scenario: Edit contact name
- **WHEN** user changes contact name from "Alice" to "Alice B."
- **THEN** the contact name is updated everywhere it appears

### Requirement: Delete a contact
The system SHALL allow users to delete a contact. Deletion MUST require confirmation. Deleting a contact SHALL also delete all associated aliases, addresses, and trade history.

#### Scenario: Delete contact with confirmation
- **WHEN** user taps delete on contact "Alice" and confirms
- **THEN** the contact and all associated data are removed from local storage

#### Scenario: Cancel contact deletion
- **WHEN** user taps delete but cancels the confirmation
- **THEN** the contact remains unchanged

### Requirement: Search and filter contacts
The system SHALL allow users to search contacts by name or alias label.

#### Scenario: Search by name
- **WHEN** user types "Ali" in the search field
- **THEN** contacts with names matching "Ali" are shown (e.g., "Alice", "Alicia")

### Requirement: Add trust notes to contact
The system SHALL allow users to add free-text trust notes to a contact for tracking reliability.

#### Scenario: Add a trust note
- **WHEN** user writes "Reliable, always pays within 30 min" on Alice's profile
- **THEN** the note is saved and visible on the contact profile

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
