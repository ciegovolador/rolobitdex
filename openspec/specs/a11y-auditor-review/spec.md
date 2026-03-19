## Purpose

Define the A11y Auditor plan review — an accessibility expert that evaluates every change through WCAG 2.1 AA standards and assistive technology compatibility.

## Requirements

### Requirement: A11y Auditor review evaluates five dimensions
The `/plan-a11y-auditor-review` skill SHALL rate each change on five dimensions, scored 0-10, with interactive prompts explaining what a 10 looks like for each.

#### Scenario: Review a UI feature
- **WHEN** a developer runs `/plan-a11y-auditor-review` on a change touching screens or components
- **THEN** the review rates the change on Screen Reader Support, Semantic Structure, Interaction Accessibility, Visual Accessibility, and Motion & Focus Management
- **AND** each dimension includes a score, explanation, and what would make it a 10

#### Scenario: Review a non-UI change
- **WHEN** a developer runs `/plan-a11y-auditor-review` on a backend or database change
- **THEN** the review still applies all five dimensions but notes which are not applicable
- **AND** focuses on any indirect UI impact

### Requirement: Screen Reader Support dimension checks assistive technology compatibility
The Screen Reader Support dimension SHALL verify that all interactive elements have accessibilityLabel, accessibilityRole, and accessibilityHint where needed.

#### Scenario: Button without accessibilityLabel
- **WHEN** a change adds a button or pressable element without an accessibilityLabel
- **THEN** the A11y Auditor flags it and recommends a descriptive label

#### Scenario: Icon-only button
- **WHEN** a change adds a button with only an icon (no visible text)
- **THEN** the A11y Auditor flags it as critical — icon-only buttons MUST have accessibilityLabel

#### Scenario: Full screen reader support
- **WHEN** all interactive elements have accessibilityLabel, appropriate accessibilityRole, and accessibilityHint for non-obvious actions
- **THEN** the Screen Reader Support dimension scores 9-10

### Requirement: Semantic Structure dimension checks element roles and hierarchy
The Semantic Structure dimension SHALL verify that the component tree uses correct accessibilityRole values and logical reading order.

#### Scenario: List without semantic roles
- **WHEN** a change renders a FlatList or mapped array without accessibilityRole on items
- **THEN** the A11y Auditor flags the missing list/item semantics

#### Scenario: Form without label association
- **WHEN** a change adds inputs without associated labels via accessibilityLabel
- **THEN** the A11y Auditor flags the missing form structure

#### Scenario: Well-structured semantic tree
- **WHEN** all containers, lists, forms, and interactive elements use appropriate accessibilityRole values
- **THEN** the Semantic Structure dimension scores 9-10

### Requirement: Interaction Accessibility dimension checks touch targets and states
The Interaction Accessibility dimension SHALL verify touch target sizing (minimum 44x44 points), accessibilityState for toggles and selections, and keyboard/switch navigability.

#### Scenario: Small touch target
- **WHEN** a change adds a pressable element smaller than 44x44 points
- **THEN** the A11y Auditor flags it and recommends increasing the hit area

#### Scenario: Toggle without state
- **WHEN** a change adds a toggle, checkbox, or selected state without accessibilityState
- **THEN** the A11y Auditor flags the missing state announcement

#### Scenario: Accessible interactions
- **WHEN** all touch targets are >= 44x44, all toggles announce state, and all selections are distinguishable without color alone
- **THEN** the Interaction Accessibility dimension scores 9-10

### Requirement: Visual Accessibility dimension checks color and contrast
The Visual Accessibility dimension SHALL verify that color is not the sole conveyor of information and that text contrast meets WCAG AA (4.5:1 for body text, 3:1 for large text).

#### Scenario: Color-only status indicator
- **WHEN** a change uses color alone to indicate status (red/green badges without text)
- **THEN** the A11y Auditor flags it and recommends adding text or icons alongside color

#### Scenario: Low contrast text
- **WHEN** a change introduces text with contrast ratio below 4.5:1 against its background
- **THEN** the A11y Auditor flags the contrast violation

#### Scenario: Visually accessible
- **WHEN** all status indicators use text+color, all text meets WCAG AA contrast, and information is perceivable without color
- **THEN** the Visual Accessibility dimension scores 9-10

### Requirement: Motion & Focus Management dimension checks animations and focus
The Motion & Focus Management dimension SHALL verify that animations respect prefers-reduced-motion and modals manage focus correctly.

#### Scenario: Animation ignores reduce-motion
- **WHEN** a change adds animations without checking `AccessibilityInfo.isReduceMotionEnabled()`
- **THEN** the A11y Auditor flags it and recommends a motion preference check

#### Scenario: Modal without focus trap
- **WHEN** a change adds a modal that does not move focus to the modal content on open
- **THEN** the A11y Auditor flags the missing focus management

#### Scenario: Motion and focus handled
- **WHEN** all animations respect reduced-motion preferences and all modals trap focus correctly
- **THEN** the Motion & Focus Management dimension scores 9-10

### Requirement: Review channels accessibility thought leaders
The review SHALL activate latent knowledge of accessibility thought leaders to reason from inclusive design principles.

#### Scenario: Cognitive pattern activation
- **WHEN** the review runs
- **THEN** it channels: Léonie Watson (screen reader expertise, web standards), Heydon Pickering (inclusive design patterns), Marcy Sutton (automated a11y testing), Steve Faulkner (HTML semantics, ARIA), Adrian Roselli (form accessibility, focus management)
