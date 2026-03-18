## Context

There is no existing codebase — this is a greenfield React Native (Expo) app called Rolobitdex. The app serves as a personal contact book for P2P Bitcoin trading within a trusted circle, inspired by Mostro's trade flow but scoped to known contacts rather than an open marketplace. Target platforms: iOS, Android, and Web (PWA).

## Goals / Non-Goals

**Goals:**
- Cross-platform app from a single Expo codebase (iOS, Android, Web/PWA)
- Local-first data storage — no mandatory server or account
- Simple contact management with banking aliases and Bitcoin silent payment addresses
- Basic P2P trade flow (offer → accept → confirm fiat → release BTC)
- QR code generation for sharing silent payment addresses

**Non-Goals:**
- No escrow or custodial Bitcoin holding — trades are trust-based between known contacts
- No Nostr integration or relay-based messaging (future consideration)
- No fiat payment processing — the app only tracks that payment was made
- No exchange rate feeds or price discovery in v1
- No multi-language support in v1

## Decisions

### 1. Expo (managed workflow) over bare React Native
**Choice**: Expo SDK with managed workflow
**Rationale**: Simplified build pipeline for 3 platforms, built-in PWA support via `expo export:web`, OTA updates. Trade-off is less native module flexibility, but the app has no heavy native requirements.
**Alternatives**: Bare React Native (more control, harder PWA), Flutter (different language), plain PWA (no native app stores).

### 2. Local storage with SQLite (expo-sqlite)
**Choice**: expo-sqlite for structured local storage
**Rationale**: Contacts and trades are relational data (contact has many aliases, many trades). SQLite handles queries and joins well. AsyncStorage is key-value only and awkward for relational data.
**Alternatives**: AsyncStorage (simpler but limited), WatermelonDB (overkill for this scale), Realm (adds complexity).

### 3. File-based encrypted backup over cloud sync
**Choice**: Export/import encrypted JSON backup files
**Rationale**: Keeps the app server-free. Users can store backups wherever they want. Encryption with a user passphrase protects sensitive banking data.
**Alternatives**: Cloud sync (requires backend), Nostr-based sync (future possibility).

### 4. Trust-based trades without escrow
**Choice**: No escrow mechanism — trades rely on contact trust
**Rationale**: The app targets close contacts (friends, family, local community). Adding escrow requires either a custodial service or complex multisig, both out of scope for v1. Mostro-style escrow can be a future addition.
**Alternatives**: Lightning hold invoices (requires LN integration), on-chain multisig (complex UX).

### 5. Navigation with Expo Router
**Choice**: Expo Router (file-based routing)
**Rationale**: Convention over configuration, works well across all platforms, built-in deep linking support.
**Alternatives**: React Navigation manual setup (more boilerplate).

## Risks / Trade-offs

- **[No escrow]** → Users must trust counterparties. Mitigation: trade history and trust notes help users track reliability. Clear disclaimer in UI.
- **[Silent payments library maturity]** → Bitcoin silent payments are relatively new. Mitigation: use well-tested JS libraries (e.g., `@noble/secp256k1`), keep crypto code isolated for easy swapping.
- **[PWA limitations on iOS]** → Safari has limited PWA support (no push notifications, storage limits). Mitigation: primary targets are native iOS/Android; PWA is a convenience fallback.
- **[Sensitive data on device]** → Banking aliases and BTC addresses are sensitive. Mitigation: encrypted backup, no cloud transmission, device-level security (biometric lock option).
