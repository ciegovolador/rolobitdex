## MODIFIED Requirements

### Requirement: Tab-based navigation
The system SHALL provide tab-based navigation with tabs: Contacts, Trades, My Address, Settings. The navigation SHALL remain visible at all times, including when viewing detail screens (contact detail, trade detail, scanner).

#### Scenario: Navigate between tabs
- **WHEN** user taps the "Trades" tab
- **THEN** the trades screen is displayed and the tab is highlighted

#### Scenario: Navigation visible on detail screens
- **WHEN** user navigates to a contact detail screen
- **THEN** the tab bar (mobile) or sidebar (desktop) SHALL remain visible

#### Scenario: Navigation visible while scrolling
- **WHEN** user scrolls a long list of contacts or trades
- **THEN** the navigation SHALL remain fixed and visible
