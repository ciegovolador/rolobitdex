# Changelog

All notable changes to this project will be documented in this file.

## [0.0.3] - 2026-03-19

### Changed
- Branch naming convention updated from `opsx/<change-name>` to `SCOPE/IP-NUMBER-DESCRIPTION` (e.g., `feature/IP-001-branch-naming`)
- Scope auto-detection: Claude determines branch scope (`feature`, `bugfix`, `hotfix`, `release`) from change description
- IP numbers auto-increment by scanning existing branches, zero-padded to 3 digits
- Updated gstack-lifecycle and gstack-workflow specs with new branch naming format

## [0.0.2] - 2026-03-18

### Added
- Responsive layout system with desktop sidebar navigation
- Animated screen and list item transitions for improved UX
- Comprehensive design system with theme constants (colors, spacing, typography)
- Desktop-optimized multi-column layouts for contacts and trades
- Enhanced visual feedback with elevation levels and improved styling

### Changed
- Refactored component styling to use centralized theme constants
- Updated all screens to support responsive breakpoints (mobile, tablet, desktop)
- Improved accessibility with better touch targets and visual hierarchy
- Enhanced card component styling with multiple elevation levels
- Updated button components with better visual states

### Fixed
- Improved spacing consistency across all screens
- Better text rendering with typography system
- Enhanced color contrast for better readability

## [0.0.1] - 2026-03-18

### Initial Release
- P2P Bitcoin contact list application
- Silent Payments support
- Trade flow management
- Contact management with QR code generation
- Address management and sharing
