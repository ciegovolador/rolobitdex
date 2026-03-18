## Why

People who trade Bitcoin peer-to-peer with trusted contacts need a simple way to manage payment details — bank aliases, Bitcoin silent payment addresses, and Lightning info. Existing P2P platforms like LocalBitcoins are gone, and tools like Mostro serve open markets. There's no lightweight app focused on trading within a close circle of known contacts.

## What Changes

- New React Native (Expo) cross-platform app targeting iOS, Android, and Web (PWA)
- Local contact list with banking aliases (bank name, account alias, CLABE/CBU) and Bitcoin silent payment addresses
- Contact profiles with trade history and trust notes
- P2P trade flow inspired by Mostro: create offer, accept, confirm payment, release
- Local-first storage with optional encrypted backup
- Silent payment address generation and display via QR codes

## Capabilities

### New Capabilities
- `contact-management`: CRUD operations for contacts with banking aliases and Bitcoin silent payment addresses
- `trade-flow`: P2P trade lifecycle — create offer, accept, confirm fiat payment, release BTC (inspired by Mostro)
- `silent-payments`: Bitcoin silent payment address generation, display, and QR code sharing
- `cross-platform-shell`: React Native (Expo) app shell with navigation, PWA support for web, and native builds for iOS/Android

### Modified Capabilities
<!-- No existing capabilities to modify -->

## Impact

- **New codebase**: React Native (Expo) project from scratch
- **Dependencies**: Expo SDK, React Navigation, local storage (AsyncStorage or SQLite), Bitcoin/silent-payments library, QR code generation
- **Platforms**: iOS, Android, Web (PWA via Expo)
- **Data**: All contact and trade data stored locally on device
