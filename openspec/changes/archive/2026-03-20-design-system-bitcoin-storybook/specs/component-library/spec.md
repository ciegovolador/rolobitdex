## ADDED Requirements

### Requirement: Base component library
The system SHALL provide a set of reusable, composable React Native components built on design tokens. Base components include Button, Input, Card, Modal, Label, Badge, and Icon.

#### Scenario: Button component exists
- **WHEN** developer imports Button component
- **THEN** component accepts props for variant (primary, secondary, danger), size (sm, md, lg), disabled state, and onPress handler

#### Scenario: Input component exists
- **WHEN** developer imports Input component
- **THEN** component accepts props for placeholder, value, onChangeText, keyboard type, and disabled state

#### Scenario: Card component exists
- **WHEN** developer imports Card component
- **THEN** component renders with padding, background color, and optional shadow using design tokens

#### Scenario: Modal component exists
- **WHEN** developer imports Modal component
- **THEN** component accepts title, content, and action buttons (confirm/cancel)

### Requirement: Component composition
Components SHALL be composable and nestable. Component variant combinations SHALL be possible without exponential prop explosion.

#### Scenario: Components support children prop
- **WHEN** a component accepts children
- **THEN** developer can nest other components inside

#### Scenario: Component props are extensible
- **WHEN** developer needs to add style overrides
- **THEN** component accepts style and testID props for customization

### Requirement: Accessibility compliance
All components SHALL support accessibility features. Components with interactive elements SHALL have proper labels and ARIA attributes.

#### Scenario: Button is accessible
- **WHEN** Button is rendered
- **THEN** screen readers announce the button label and its state (enabled/disabled)

#### Scenario: Input is accessible
- **WHEN** Input is rendered with label
- **THEN** screen readers connect the label to the input field

#### Scenario: Modal is accessible
- **WHEN** Modal is open
- **THEN** focus traps inside modal, screen readers announce modal title and purpose

### Requirement: Consistent component behavior
All components SHALL use design tokens for colors, spacing, and typography. All components SHALL respond to theme changes.

#### Scenario: Component respects theme change
- **WHEN** app theme switches from light to dark
- **THEN** component colors update immediately without remounting

#### Scenario: Component uses design tokens consistently
- **WHEN** Button component renders
- **THEN** it uses tokens for background (`color.primary`), text (`color.onPrimary`), padding (`spacing.md`)

### Requirement: Component testing
Each component SHALL have corresponding Storybook stories for visual reference and testing.

#### Scenario: All component variants are documented
- **WHEN** developer opens Storybook
- **THEN** stories show Button variants (primary/secondary/danger), sizes (sm/md/lg), and states (enabled/disabled/loading)
