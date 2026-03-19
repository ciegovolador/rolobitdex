## Purpose

Define the Model–View–Controller separation pattern for all screens and components, including directory structure, data flow rules, and layer responsibilities.

## ADDED Requirements

### Requirement: Models own business logic and typed interfaces
All business logic, validation, derived data, and type definitions SHALL live in `src/models/`. Models import from `src/db/` but are the public API for controllers.

#### Scenario: Contact model provides validation
- **WHEN** a controller needs to create a contact
- **THEN** it SHALL call the model function (e.g., `createContactIdempotent`) rather than `src/db/contacts` directly

#### Scenario: Trade model provides derived data
- **WHEN** a view needs a human-readable trade description
- **THEN** the model SHALL provide a `getTradeDescription(trade)` function that returns a formatted string

#### Scenario: Model functions are pure where possible
- **WHEN** a model function does not need database access (validation, formatting, derivation)
- **THEN** it SHALL be a pure function with no side effects

### Requirement: Controllers are custom hooks that bridge models and views
Each screen SHALL have a corresponding controller hook in `src/controllers/` that owns data fetching, mutation handling, loading states, and error states.

#### Scenario: Contacts screen uses controller hook
- **WHEN** the contacts screen renders
- **THEN** it SHALL call `useContacts()` which returns `{ contacts, query, search, create, loading }`

#### Scenario: Controller hooks use stable references
- **WHEN** a controller hook returns callback functions
- **THEN** all callbacks SHALL be wrapped in `useCallback` to prevent unnecessary re-renders in views

#### Scenario: Controller hooks own focus-based data loading
- **WHEN** a screen comes into focus via navigation
- **THEN** the controller hook SHALL handle the `useFocusEffect` lifecycle, not the screen file

### Requirement: Views are pure presentational components
All rendering logic SHALL be extracted into view components in `src/views/` that receive data and callbacks exclusively via props.

#### Scenario: View component has no side effects
- **WHEN** a view component is rendered
- **THEN** it SHALL NOT import from `src/db/`, `src/models/`, or `expo-router`
- **AND** it SHALL NOT call any hooks except `useWindowDimensions` (for responsive layout) and animation hooks from `react-native-reanimated`

#### Scenario: View component receives all data via props
- **WHEN** a view needs contact data, trade data, or navigation callbacks
- **THEN** these SHALL be passed as typed props from the screen file

#### Scenario: View component is testable with mock props
- **WHEN** a developer wants to test a view component in isolation
- **THEN** they SHALL be able to render it with mock props without any database or navigation setup

### Requirement: Screens are thin wiring between controllers and views
Screen files in `app/` SHALL contain only: the controller hook call, responsive layout logic, navigation callbacks, and the view component render.

#### Scenario: Screen file is under 30 lines
- **WHEN** a screen file has been refactored
- **THEN** it SHALL typically be under 30 lines — just hook call, layout logic, and JSX composition

#### Scenario: Screen file does not contain StyleSheet
- **WHEN** a screen file has been refactored
- **THEN** it SHALL NOT contain `StyleSheet.create()` — all styles live in view style files

### Requirement: Layer import rules enforce separation
Import dependencies SHALL follow strict layering: Views import nothing from models/db. Controllers import from models. Models import from db.

#### Scenario: View imports from db
- **WHEN** a view component imports from `src/db/`
- **THEN** this is a violation of the MVC pattern and SHALL be corrected

#### Scenario: Screen imports from db
- **WHEN** a screen file imports from `src/db/`
- **THEN** this is a violation — screens SHALL only import from controllers, views, and components

### Requirement: Shared presentational components are extracted
Common UI patterns that appear in multiple views SHALL be extracted into `src/views/shared/`.

#### Scenario: FAB button used on multiple screens
- **WHEN** multiple screens use a floating action button
- **THEN** a shared `FAB` component SHALL exist in `src/views/shared/FAB.tsx`

#### Scenario: Empty state used on multiple screens
- **WHEN** multiple screens show an empty state with icon and message
- **THEN** a shared `EmptyState` component SHALL exist in `src/views/shared/EmptyState.tsx`

#### Scenario: Section header used on contact detail
- **WHEN** the contact detail screen uses section headers with add buttons
- **THEN** a shared `SectionHeader` component SHALL exist in `src/views/shared/SectionHeader.tsx`
