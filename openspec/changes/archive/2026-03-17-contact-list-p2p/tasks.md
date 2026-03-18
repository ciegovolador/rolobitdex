## 1. Project Setup

- [x] 1.1 Initialize Expo project with TypeScript template
- [x] 1.2 Configure Expo Router with tab-based navigation (Contacts, Trades, My Address, Settings)
- [x] 1.3 Add dependencies: expo-sqlite, expo-camera (QR scanning), react-native-qrcode-svg, expo-local-authentication, expo-sharing, expo-file-system
- [x] 1.4 Configure PWA manifest and service worker for web builds
- [x] 1.5 Set up base theme and shared UI components (buttons, inputs, cards, modals)

## 2. Database Layer

- [x] 2.1 Design SQLite schema: contacts, banking_aliases, silent_payment_addresses, trades, trust_notes tables
- [x] 2.2 Implement database initialization and migration logic
- [x] 2.3 Create data access layer (CRUD functions for each table)

## 3. Contact Management

- [x] 3.1 Build contact list screen with search/filter functionality
- [x] 3.2 Build create/edit contact form (name, avatar)
- [x] 3.3 Build contact detail screen showing aliases, addresses, and trust notes
- [x] 3.4 Implement add/edit/delete banking alias UI and logic
- [x] 3.5 Implement add/edit/delete silent payment address UI with format validation
- [x] 3.6 Implement trust notes (add/edit free-text notes per contact)
- [x] 3.7 Implement contact deletion with confirmation dialog and cascade delete

## 4. Silent Payments

- [x] 4.1 Integrate silent payment address generation (key pair generation and derivation)
- [x] 4.2 Build "My Address" screen displaying own silent payment address as text and QR code
- [x] 4.3 Implement QR code display for any silent payment address (own or contact)
- [x] 4.4 Implement QR code scanning to import a silent payment address into a contact
- [x] 4.5 Implement copy-to-clipboard and native share for silent payment addresses

## 5. Trade Flow

- [x] 5.1 Build create trade offer form (buy/sell, sats amount, fiat currency, fiat amount, target contact)
- [x] 5.2 Implement trade status lifecycle state machine (pending → accepted → fiat_sent → fiat_received → completed, with cancel)
- [x] 5.3 Build trade detail screen with status progression and action buttons
- [x] 5.4 Build trades list screen (all trades, filterable by status)
- [x] 5.5 Build per-contact trade history view (reverse chronological)
- [x] 5.6 Add validation: prevent invalid status transitions, require fields on creation

## 6. Security & Backup

- [x] 6.1 Implement biometric lock toggle in settings using expo-local-authentication
- [x] 6.2 Implement encrypted JSON export (passphrase-based encryption)
- [x] 6.3 Implement encrypted JSON import with passphrase prompt and data restore
- [x] 6.4 Secure key storage for silent payment keys (expo-secure-store)

## 7. Polish & Platform Testing

- [x] 7.1 Test and fix platform-specific styling (iOS, Android, Web)
- [x] 7.2 Add empty states and loading indicators
- [x] 7.3 Verify PWA installability and offline caching on web
- [x] 7.4 Add app icon and splash screen
