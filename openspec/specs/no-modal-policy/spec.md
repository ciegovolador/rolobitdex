## Purpose

Ensure the application uses inline confirmation patterns instead of overlay modals, providing superior accessibility (screen reader support, focus management, keyboard navigation) and better UX across all devices.

## Requirements

### Requirement: No overlay modals
The application SHALL NOT use React Native `Modal` components or any overlay-based confirmation/form patterns. All confirmations and inline forms SHALL render within the content flow using inline components.

#### Scenario: Delete confirmation uses inline pattern
- **WHEN** a user initiates a destructive action (e.g., delete contact)
- **THEN** an inline confirmation component appears in the content flow, not as a modal overlay

#### Scenario: New confirmation flows use inline pattern
- **WHEN** a developer adds a new confirmation flow to the application
- **THEN** they SHALL use the `InlineConfirm` component, not `Modal` or `ConfirmModal`

### Requirement: InlineConfirm screen reader support
The `InlineConfirm` component SHALL include full screen reader support: `accessibilityRole="alert"` on the container for ALL variants (not just danger), `accessibilityLiveRegion="polite"` for automatic announcement when the component mounts, and `accessibilityLabel` combining title and message text. The component SHALL use conditional rendering (return `null` when hidden) so that mounting triggers the live region announcement.

#### Scenario: Screen reader announces inline confirm on appear
- **WHEN** the InlineConfirm becomes visible (mounts into the tree)
- **THEN** VoiceOver/TalkBack automatically announces the title and message via the live region without the user needing to navigate to it

#### Scenario: Alert role on all variants
- **WHEN** InlineConfirm renders with any variant (primary or danger)
- **THEN** the container has `accessibilityRole="alert"`

#### Scenario: Combined accessibility label
- **WHEN** InlineConfirm renders with title "Delete Contact" and message "This cannot be undone"
- **THEN** the container `accessibilityLabel` is "Delete Contact. This cannot be undone"

### Requirement: InlineConfirm semantic structure
The `InlineConfirm` container SHALL group its children as a logical region. The title SHALL be marked as a heading (`accessibilityRole="header"`). Button order in the DOM SHALL be Cancel before Confirm (safe default).

#### Scenario: Title is a semantic heading
- **WHEN** a screen reader navigates InlineConfirm content
- **THEN** the title is announced as a heading

#### Scenario: Button order is safe by default
- **WHEN** InlineConfirm renders with Cancel and Confirm buttons
- **THEN** the Cancel button appears before the Confirm button in DOM/accessibility order

### Requirement: InlineConfirm interaction accessibility
All buttons in `InlineConfirm` SHALL have a minimum touch target of 44x44 points (WCAG 2.5.5). The Cancel and Confirm buttons SHALL have a minimum gap of 12 points between them to prevent accidental taps on the wrong action.

#### Scenario: Touch targets meet minimum size
- **WHEN** InlineConfirm renders on a mobile device
- **THEN** both Cancel and Confirm buttons have at least 44x44 point touch targets

#### Scenario: Buttons have safe spacing
- **WHEN** InlineConfirm renders with Cancel and Confirm buttons
- **THEN** there is at least 12 points of spacing between them

### Requirement: InlineConfirm visual accessibility
The `InlineConfirm` component SHALL have a visible border and contrasting background to distinguish it from surrounding content. The danger variant border and confirm button color SHALL meet WCAG AA contrast ratio (4.5:1) against the component background. Status SHALL be conveyed via text and color (not color alone).

#### Scenario: Danger colors meet contrast ratio
- **WHEN** InlineConfirm renders with `variant="danger"` on the dark theme
- **THEN** the danger border color and danger button text meet 4.5:1 contrast ratio against their backgrounds

#### Scenario: Distinguishable from surrounding content
- **WHEN** InlineConfirm renders within a scrollable view
- **THEN** it has a visible border and/or distinct background color that separates it from adjacent Card components

#### Scenario: Status not color-only
- **WHEN** InlineConfirm renders with `variant="danger"`
- **THEN** the destructive nature is conveyed via both red color AND text cues (e.g., "Delete" label, warning message)

### Requirement: InlineConfirm focus management
When `InlineConfirm` becomes visible, keyboard focus SHALL move to the Cancel button (safe default). This ensures keyboard and switch control users land on the non-destructive action first. When `InlineConfirm` is dismissed, focus SHALL return to the element that triggered it.

#### Scenario: Focus moves to Cancel on appear
- **WHEN** InlineConfirm becomes visible via keyboard/switch navigation
- **THEN** focus moves to the Cancel button automatically

#### Scenario: Focus returns on dismiss
- **WHEN** the user cancels or confirms and InlineConfirm is dismissed
- **THEN** focus returns to the Delete button that triggered the confirmation

### Requirement: InlineConfirm variants
The `InlineConfirm` component SHALL support `primary` and `danger` variants. The `danger` variant SHALL use danger-themed styling (border color, confirm button color) to visually distinguish destructive actions.

#### Scenario: Danger variant styling
- **WHEN** InlineConfirm renders with `variant="danger"`
- **THEN** the container border and confirm button use the danger color from theme tokens

#### Scenario: Primary variant styling
- **WHEN** InlineConfirm renders with `variant="primary"` or no variant specified
- **THEN** the container border and confirm button use the primary color from theme tokens

### Requirement: Colocated story file
The `InlineConfirm` component SHALL have a colocated `.stories.tsx` file with stories covering Primary, Danger, and Interactive (controlled state) variants.

#### Scenario: Storybook renders all variants
- **WHEN** a developer opens Storybook
- **THEN** InlineConfirm stories for Primary, Danger, and Interactive are listed and renderable

### Requirement: No unused modal dependencies
The application SHALL NOT include unused modal-related dependencies. The `@gorhom/bottom-sheet` package SHALL be removed if not used by any component.

#### Scenario: Bottom sheet removed
- **WHEN** a developer checks `package.json` dependencies
- **THEN** `@gorhom/bottom-sheet` is not listed

### Requirement: Component barrel exports updated
The component barrel file (`src/components/index.ts`) SHALL export `InlineConfirm` and SHALL NOT export `Modal` or `ConfirmModal`.

#### Scenario: InlineConfirm available from barrel
- **WHEN** a developer imports from `../../components`
- **THEN** `InlineConfirm` is available as a named export

#### Scenario: No modal exports
- **WHEN** a developer checks `src/components/index.ts`
- **THEN** there are no exports for `Modal` or `ConfirmModal`
