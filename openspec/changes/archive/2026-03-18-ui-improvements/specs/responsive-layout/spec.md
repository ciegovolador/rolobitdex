## ADDED Requirements

### Requirement: Responsive breakpoints
The system SHALL define breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px).

#### Scenario: Mobile viewport
- **WHEN** the viewport width is less than 768px
- **THEN** the app SHALL render with bottom tab navigation and single-column layout

#### Scenario: Desktop viewport
- **WHEN** the viewport width is greater than 1024px
- **THEN** the app SHALL render with a persistent sidebar navigation and wider content area

### Requirement: Sidebar navigation on desktop
The system SHALL display a vertical sidebar with navigation items on viewports wider than 768px, replacing the bottom tab bar.

#### Scenario: Sidebar shows all tabs
- **WHEN** the app is viewed on a desktop browser
- **THEN** the sidebar SHALL display Contacts, Trades, My Address, and Settings as navigation items with icons and labels

#### Scenario: Sidebar highlights active tab
- **WHEN** user is on the Trades screen on desktop
- **THEN** the Trades item in the sidebar SHALL be visually highlighted

### Requirement: Content max-width on desktop
The system SHALL constrain the main content area to a maximum width of 800px on desktop viewports, centered horizontally.

#### Scenario: Wide viewport content centering
- **WHEN** the viewport is 1440px wide
- **THEN** the main content area SHALL be 800px wide and centered with the sidebar on the left

### Requirement: Responsive list layouts
The system SHALL render list items (contacts, trades) in a grid layout on wider viewports.

#### Scenario: Contacts grid on tablet
- **WHEN** the contacts list is viewed on a tablet (768px+)
- **THEN** contacts SHALL be displayed in a 2-column grid

#### Scenario: Contacts single column on mobile
- **WHEN** the contacts list is viewed on mobile (<768px)
- **THEN** contacts SHALL be displayed in a single column list
