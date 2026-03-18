# Rolobitdex

A peer-to-peer contact list app for Bitcoin trading with close contacts. Manage banking aliases, Bitcoin silent payment addresses, and track trades — inspired by [Mostro](https://mostro.network/).

Built with React Native (Expo) for **iOS**, **Android**, and **Web (PWA)**.

## Features

- **Contact Management** — Store banking aliases (CLABE, CBU, account numbers) and Bitcoin silent payment addresses per contact
- **Trade Flow** — Mostro-inspired P2P trade lifecycle: create offer → accept → confirm fiat → release BTC
- **Silent Payments** — Generate your own silent payment address, share via QR code, scan to import
- **Security** — Biometric lock, encrypted backup/restore, secure key storage
- **Local-first** — All data stored on-device with SQLite, no server required

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli` or use `npx expo`)
- For iOS: macOS with Xcode installed
- For Android: Android Studio with an emulator or a physical device
- For Web: Any modern browser

## Installation

```bash
git clone <repo-url>
cd rolobitdex
npm install
```

## Running the App

```bash
# Start the Expo dev server (interactive menu to pick platform)
npm start

# Run on specific platforms
npm run ios       # iOS Simulator (macOS only)
npm run android   # Android Emulator or connected device
npm run web       # Web browser (PWA)
```

On the Expo dev server menu, press:
- `i` — open iOS simulator
- `a` — open Android emulator
- `w` — open in web browser

## Running Tests

```bash
npm test              # Run all unit tests (Jest)
npm run test:coverage # Run tests with coverage report

# End-to-end tests
npm run test:e2e:web     # Playwright tests against Expo web build
npm run test:e2e:mobile  # Maestro flows for mobile (requires Maestro CLI)
npm run test:e2e         # Run all E2E tests
```

## Project Structure

```
app/                    # Expo Router screens
  (tabs)/               # Tab navigation (Contacts, Trades, My Address, Settings)
  contact/              # Contact detail & creation screens
  trade/                # Trade detail & creation screens
  scan.tsx              # QR code scanner
src/
  components/           # Shared UI components (Button, Input, Card, Sidebar, etc.)
  constants/theme.ts    # Colors, spacing, typography, breakpoints
  db/                   # SQLite database layer
    schema.ts           # Table definitions
    database.ts         # DB initialization
    contacts.ts         # Contacts, aliases, addresses, trust notes CRUD
    trades.ts           # Trade CRUD & status state machine
  lib/
    silentPayments.ts   # Silent payment address generation & validation
    backup.ts           # Encrypted backup export/import
e2e/                    # End-to-end tests
  web/                  # Playwright tests (Expo web build)
  mobile/               # Maestro flows (React Native mobile)
  helpers/              # Shared test data factories & cleanup utilities
openspec/               # Spec-driven development artifacts
```

## Tech Stack

- **React Native** via [Expo](https://expo.dev/) (SDK 55)
- **Expo Router** — file-based navigation
- **expo-sqlite** — local SQLite database
- **expo-camera** — QR code scanning
- **expo-secure-store** — secure key storage
- **react-native-qrcode-svg** — QR code generation

## Setup (Claude Code skills)

This project includes [gstack](https://github.com/garrytan/gstack) for Claude Code workflows. After cloning, run:

```bash
cd .claude/skills/gstack && ./setup
```
