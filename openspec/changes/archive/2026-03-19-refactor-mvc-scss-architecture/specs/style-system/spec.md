## Purpose

Define BEM-inspired naming conventions for React Native StyleSheet objects, co-located style module patterns, and shared style mixins.

## ADDED Requirements

### Requirement: Every view component has a co-located style file
Each view component SHALL have a corresponding `*.styles.ts` file in the same directory that exports a `StyleSheet.create()` object.

#### Scenario: ContactRowView has styles
- **WHEN** `ContactRowView.tsx` exists in `src/views/contacts/`
- **THEN** `ContactRowView.styles.ts` SHALL exist in the same directory
- **AND** `ContactRowView.tsx` SHALL import styles from `./ContactRowView.styles`

#### Scenario: Style file exports a single styles object
- **WHEN** a style file is created
- **THEN** it SHALL export a `styles` constant created by `StyleSheet.create()`

### Requirement: Style keys follow BEM-inspired naming
All style keys SHALL use a `block__element` naming pattern where the block is the component name in camelCase and elements describe sub-parts.

#### Scenario: Contact row style naming
- **WHEN** styles are defined for a contact row component
- **THEN** keys SHALL follow the pattern: `contactRow`, `contactRow__avatar`, `contactRow__name`, `contactRow__hint`

#### Scenario: Modifier naming
- **WHEN** a style variant exists (e.g., active state, error state)
- **THEN** the key SHALL use single underscore suffix: `filterChip_active`, `typeBtn_selected`

#### Scenario: No anonymous inline styles for structural elements
- **WHEN** a view component renders structural elements (containers, rows, cards)
- **THEN** those elements SHALL use named styles from the style file, not inline `style={{ ... }}` objects
- **BUT** single-property overrides like `{{ flex: 1 }}` or `{{ marginTop: spacing.sm }}` are acceptable inline

### Requirement: Style files import only from theme constants
Style files SHALL import only from `src/constants/theme.ts` and `src/styles/mixins.ts`. They SHALL NOT import from components, models, or controllers.

#### Scenario: Style file imports
- **WHEN** a style file is created
- **THEN** its imports SHALL be limited to `react-native` (for `StyleSheet`), `../../constants/theme`, and optionally `../../styles/mixins`

### Requirement: Shared style mixins exist for common patterns
Common layout patterns SHALL be extracted into `src/styles/mixins.ts` as functions that return `ViewStyle` objects.

#### Scenario: Row layout mixin
- **WHEN** multiple views need a horizontal row with centered items
- **THEN** `mixins.ts` SHALL export a `rowLayout(gap?)` function

#### Scenario: Card base mixin
- **WHEN** multiple views need a card-like container
- **THEN** `mixins.ts` SHALL export a `cardBase()` function returning the standard card style

#### Scenario: Form group mixin
- **WHEN** multiple views need a form section with spacing
- **THEN** `mixins.ts` SHALL export a `formGroup()` function
