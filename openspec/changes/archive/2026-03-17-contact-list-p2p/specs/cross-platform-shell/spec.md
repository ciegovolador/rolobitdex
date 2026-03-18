## ADDED Requirements

### Requirement: Cross-platform app shell
The system SHALL run as a single codebase on iOS, Android, and Web (PWA) using Expo.

#### Scenario: Launch on iOS
- **WHEN** user opens the app on an iOS device
- **THEN** the app loads with native navigation and platform-appropriate styling

#### Scenario: Launch on Android
- **WHEN** user opens the app on an Android device
- **THEN** the app loads with native navigation and platform-appropriate styling

#### Scenario: Launch on Web
- **WHEN** user opens the app in a web browser
- **THEN** the app loads as a PWA with responsive layout

### Requirement: Tab-based navigation
The system SHALL provide tab-based navigation with tabs: Contacts, Trades, My Address, Settings.

#### Scenario: Navigate between tabs
- **WHEN** user taps the "Trades" tab
- **THEN** the trades screen is displayed and the tab is highlighted

### Requirement: PWA installability
The web version SHALL be installable as a PWA with offline support.

#### Scenario: Install PWA
- **WHEN** user visits the web app and clicks "Install"
- **THEN** the app is installed to the home screen and works offline for cached data

### Requirement: Biometric lock
The system SHALL optionally allow users to enable biometric authentication (fingerprint/face) to unlock the app.

#### Scenario: Enable biometric lock
- **WHEN** user enables biometric lock in settings
- **THEN** the app requires biometric authentication on each launch

#### Scenario: Biometric not available
- **WHEN** user tries to enable biometric lock on a device without biometric hardware
- **THEN** the system SHALL display a message that biometrics are not available

### Requirement: Encrypted data backup
The system SHALL allow users to export all data as an encrypted file and import it on another device.

#### Scenario: Export encrypted backup
- **WHEN** user taps "Export Backup" and enters a passphrase
- **THEN** the system creates an encrypted JSON file and opens the share sheet

#### Scenario: Import backup
- **WHEN** user selects a backup file and enters the correct passphrase
- **THEN** the system restores all contacts, aliases, addresses, and trade history
