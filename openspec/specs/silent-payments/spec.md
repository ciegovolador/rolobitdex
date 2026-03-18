## Requirements

### Requirement: Generate silent payment address
The system SHALL allow users to generate their own Bitcoin silent payment address from a locally stored key pair.

#### Scenario: Generate address on first use
- **WHEN** user opens the silent payments section for the first time
- **THEN** the system generates a key pair and derives a silent payment address, storing the keys securely on device

#### Scenario: View own silent payment address
- **WHEN** user navigates to their silent payment address screen
- **THEN** the full silent payment address is displayed as text and as a QR code

### Requirement: Display silent payment address as QR code
The system SHALL render any silent payment address as a scannable QR code.

#### Scenario: Show QR code for own address
- **WHEN** user taps "Show QR" on their silent payment address
- **THEN** a QR code encoding the address is displayed full-screen

#### Scenario: Show QR code for contact address
- **WHEN** user taps "Show QR" on a contact's silent payment address
- **THEN** a QR code encoding that contact's address is displayed

### Requirement: Scan QR code to import address
The system SHALL allow users to scan a QR code containing a silent payment address and save it to a contact.

#### Scenario: Scan valid QR code
- **WHEN** user scans a QR code containing a valid silent payment address
- **THEN** the system prompts to assign it to an existing or new contact

#### Scenario: Scan invalid QR code
- **WHEN** user scans a QR code that does not contain a valid silent payment address
- **THEN** the system SHALL display an error message

### Requirement: Copy address to clipboard
The system SHALL allow users to copy a silent payment address to the device clipboard.

#### Scenario: Copy own address
- **WHEN** user taps "Copy" on their silent payment address
- **THEN** the address is copied to clipboard and a confirmation is shown

### Requirement: Share address
The system SHALL allow users to share their silent payment address via the device's native share sheet.

#### Scenario: Share via system share
- **WHEN** user taps "Share" on their silent payment address
- **THEN** the native share dialog opens with the address as text
