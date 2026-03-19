## Purpose

Define idempotency requirements for database writes, controller hooks, and navigation guards to ensure repeated operations produce consistent results.

## ADDED Requirements

### Requirement: Contact creation is idempotent
Creating a contact with the same name SHALL return the existing contact's ID instead of creating a duplicate.

#### Scenario: Create contact with existing name
- **WHEN** `createContactIdempotent("Alice")` is called and a contact named "Alice" already exists
- **THEN** the existing contact's ID SHALL be returned
- **AND** no new row SHALL be inserted

#### Scenario: Create contact with new name
- **WHEN** `createContactIdempotent("Bob")` is called and no contact named "Bob" exists
- **THEN** a new contact SHALL be created and its ID returned

#### Scenario: Name matching is case-insensitive
- **WHEN** `createContactIdempotent("alice")` is called and "Alice" exists
- **THEN** the existing "Alice" contact's ID SHALL be returned

### Requirement: Trade status advancement is idempotent
Advancing a trade to a status it already has SHALL be a no-op.

#### Scenario: Advance trade to current status
- **WHEN** `advanceTradeIdempotent(id, "accepted")` is called and the trade is already "accepted"
- **THEN** the function SHALL return without error and without modifying the trade

#### Scenario: Advance trade to next valid status
- **WHEN** `advanceTradeIdempotent(id, "accepted")` is called and the trade is "pending"
- **THEN** the trade status SHALL be updated to "accepted"

#### Scenario: Advance trade to invalid status
- **WHEN** `advanceTradeIdempotent(id, "completed")` is called and the trade is "pending"
- **THEN** the function SHALL throw an error explaining the invalid transition

### Requirement: Controller callbacks use stable references
All callback functions returned by controller hooks SHALL maintain referential stability across re-renders.

#### Scenario: useContacts search callback
- **WHEN** `useContacts()` returns a `search` function
- **THEN** `search` SHALL be the same function reference across re-renders (wrapped in `useCallback`)

#### Scenario: useTradeDetail advance callback
- **WHEN** `useTradeDetail()` returns an `advance` function
- **THEN** `advance` SHALL be the same function reference across re-renders

### Requirement: Controller loading states prevent double submission
Controller hooks SHALL track loading state for mutations and prevent concurrent submissions.

#### Scenario: Double-tap create contact
- **WHEN** a user taps "Save" while a contact creation is already in progress
- **THEN** the second tap SHALL be ignored (the mutation function checks loading state)

#### Scenario: Double-tap advance trade
- **WHEN** a user taps "Mark as Accepted" while a status update is in progress
- **THEN** the second tap SHALL be ignored

### Requirement: Navigation uses replace for form submissions
After successful form submissions, navigation SHALL use `router.replace()` instead of `router.push()` to prevent duplicate creation on back-navigation.

#### Scenario: Contact created then back pressed
- **WHEN** a contact is created and the user navigates to the contact detail via `replace`
- **THEN** pressing back SHALL NOT return to the creation form
- **AND** SHALL return to the contacts list instead
