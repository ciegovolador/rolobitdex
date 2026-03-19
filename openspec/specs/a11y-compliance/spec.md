## Purpose

Define the accessibility standards, attributes, and patterns required for all React Native components and screens to achieve WCAG 2.1 AA compliance.

## Requirements

### Requirement: All interactive components have accessibilityLabel
Every interactive component (Button, Pressable, TouchableOpacity, Switch) SHALL have an accessibilityLabel that describes its purpose.

#### Scenario: Button with visible text
- **WHEN** a Button component has a visible title prop
- **THEN** the accessibilityLabel SHALL default to the title text

#### Scenario: Icon-only interactive element
- **WHEN** an interactive element has no visible text (e.g., FAB with "+" icon)
- **THEN** the accessibilityLabel SHALL describe the action (e.g., "Add new contact")

### Requirement: All interactive components have accessibilityRole
Every interactive component SHALL declare its role via accessibilityRole.

#### Scenario: Button component
- **WHEN** a Button or Pressable is rendered
- **THEN** it SHALL have `accessibilityRole="button"`

#### Scenario: Text input
- **WHEN** a TextInput is rendered
- **THEN** the Input component SHALL have `accessibilityRole="search"` for search inputs or no explicit role for standard inputs (TextInput default is sufficient)

#### Scenario: Navigation tab
- **WHEN** a sidebar or bottom tab navigation item is rendered
- **THEN** it SHALL have `accessibilityRole="tab"` and `accessibilityState={{ selected: isActive }}`

#### Scenario: Toggle switch
- **WHEN** a Switch or toggle element is rendered
- **THEN** it SHALL have `accessibilityRole="switch"` and `accessibilityState={{ checked: isEnabled }}`

### Requirement: All form inputs have associated labels
Every TextInput SHALL have an accessibilityLabel that matches or describes the input's purpose, even when a visual label exists.

#### Scenario: Labeled input
- **WHEN** an Input component has a label prop
- **THEN** the TextInput SHALL have `accessibilityLabel` set to the label text

#### Scenario: Placeholder-only input
- **WHEN** an input has placeholder text but no label
- **THEN** the TextInput SHALL have `accessibilityLabel` set to describe the field purpose

### Requirement: All list items have semantic structure
FlatList items and mapped arrays SHALL use accessibilityRole to declare item semantics.

#### Scenario: Contact list item
- **WHEN** a contact row is rendered in the contacts list
- **THEN** the row SHALL have `accessibilityLabel` describing the contact (e.g., "Alice Nakamoto, tap to view details")

#### Scenario: Trade list item
- **WHEN** a trade row is rendered in the trades list
- **THEN** the row SHALL have `accessibilityLabel` describing the trade (e.g., "Buy 100,000 sats, 50 MXN with Alice Nakamoto, Pending")

### Requirement: Status indicators use text alongside color
All status badges and indicators SHALL include text labels, not relying on color alone.

#### Scenario: Trade status badge
- **WHEN** a trade status badge is rendered (Pending, Accepted, Completed, etc.)
- **THEN** the badge SHALL include visible text AND have `accessibilityLabel` with the status

#### Scenario: Active tab indicator
- **WHEN** the active tab is highlighted with color
- **THEN** the tab SHALL also have `accessibilityState={{ selected: true }}`

### Requirement: Animations respect reduced motion preferences
All animation components SHALL check the user's reduced motion preference and disable animations accordingly.

#### Scenario: AnimatedScreen with reduced motion enabled
- **WHEN** the user has enabled "Reduce Motion" in device settings
- **THEN** AnimatedScreen SHALL render content immediately without fade/slide animations

#### Scenario: AnimatedListItem with reduced motion enabled
- **WHEN** the user has enabled "Reduce Motion" in device settings
- **THEN** AnimatedListItem SHALL render without staggered animation delay

### Requirement: Modals manage focus correctly
Modal components SHALL move focus to the modal content on open and return focus to the trigger element on close.

#### Scenario: ConfirmModal opens
- **WHEN** a ConfirmModal is displayed
- **THEN** focus SHALL move to the modal title or first interactive element
- **AND** the modal SHALL have `accessibilityRole="alert"` for destructive confirmations

### Requirement: Touch targets meet minimum size
All interactive elements SHALL have a minimum touch target of 44x44 points.

#### Scenario: Small button
- **WHEN** a pressable element has dimensions smaller than 44x44
- **THEN** it SHALL use hitSlop or padding to expand the touch area to at least 44x44

### Requirement: All testable elements have testID
All interactive and assertable elements SHALL have a testID attribute following the convention `{screen}-{element}-{type}`.

#### Scenario: Contact search input
- **WHEN** the search input on the contacts screen is rendered
- **THEN** it SHALL have `testID="contacts-search-input"`

#### Scenario: Trade creation button
- **WHEN** the Create Trade button is rendered
- **THEN** it SHALL have `testID="trade-new-create-btn"`
