## Purpose

Define the visual design system tokens — typography, elevation, animation, color, and spacing — so all UI components share a consistent look and feel from a single source of truth.

## Requirements

### Requirement: Typography scale
The system SHALL define a consistent typography scale with at least 5 levels (xs, sm, md, lg, xl) including font size, line height, and font weight for each level.

#### Scenario: Headings use correct scale
- **WHEN** a screen title is rendered
- **THEN** it SHALL use the `xl` typography level with bold weight

#### Scenario: Body text uses correct scale
- **WHEN** body content is rendered
- **THEN** it SHALL use the `md` typography level with regular weight

### Requirement: Elevation and shadow system
The system SHALL define elevation levels (0-3) with corresponding shadow styles using the `boxShadow` CSS property (not deprecated shadow* props).

#### Scenario: Cards use elevation
- **WHEN** a Card component is rendered
- **THEN** it SHALL display with elevation level 1 shadow

#### Scenario: FAB uses higher elevation
- **WHEN** the floating action button is rendered
- **THEN** it SHALL display with elevation level 3 shadow

### Requirement: Animation primitives
The system SHALL define standard animation durations and easing curves as design tokens: `fast` (150ms), `normal` (300ms), `slow` (500ms).

#### Scenario: Button press feedback
- **WHEN** user presses a button or tappable element
- **THEN** the element SHALL animate with scale-down feedback using the `fast` duration

#### Scenario: Screen transitions
- **WHEN** user navigates between screens
- **THEN** the transition SHALL use a fade or slide animation with `normal` duration

### Requirement: Status color palette
The system SHALL define semantic colors for trade statuses: pending (amber), accepted (blue), fiat_sent (purple), fiat_received (teal), completed (green), cancelled (red).

#### Scenario: Trade status badge colors
- **WHEN** a trade status badge is rendered
- **THEN** it SHALL use the corresponding semantic color for that status

### Requirement: Consistent component spacing
The system SHALL use spacing tokens from the theme for all padding and margins. No hardcoded pixel values outside the theme.

#### Scenario: List items have consistent spacing
- **WHEN** a list of contacts or trades is rendered
- **THEN** each item SHALL use `spacing.md` for internal padding and `spacing.sm` for gaps between items
