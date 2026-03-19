## Why

The app currently has **zero accessibility support** — no `accessibilityLabel`, `accessibilityRole`, `accessibilityHint`, `accessibilityState`, or `testID` attributes anywhere in the codebase. Screen reader users (VoiceOver/TalkBack) cannot use the app at all. Forms have no label associations, interactive elements have no roles, modals have no focus management, and color-only status indicators exclude colorblind users. This is a Bitcoin tool for financial sovereignty — accessibility is not optional when people's money is at stake.

An A11y Auditor review role — parallel to the Bitcoiner, Cypherpunk, and Automation Tester roles — would ensure every change is evaluated for accessibility compliance before shipping.

## What Changes

- Introduce an **A11y Auditor review role** (`/plan-a11y-auditor-review`) that evaluates changes on five dimensions: Screen Reader Support, Semantic Structure, Interaction Accessibility, Visual Accessibility, and Motion & Focus Management
- **Refactor all shared components** (Button, Input, Card, Sidebar, ConfirmModal) to include proper a11y attributes
- **Refactor all screens** to add accessibilityLabel, accessibilityRole, accessibilityState, accessibilityHint, and testID attributes
- Add `testID` attributes throughout for automated accessibility testing
- Respect `prefers-reduced-motion` in animation components
- Update the **gstack lifecycle** to include the A11y Auditor review as an informational gate

## Capabilities

### New Capabilities
- `a11y-auditor-review`: The A11y Auditor plan review role — evaluates changes on Screen Reader Support, Semantic Structure, Interaction Accessibility, Visual Accessibility, and Motion & Focus Management
- `a11y-compliance`: Accessibility standards, attributes, and patterns for React Native components and screens (WCAG 2.1 AA baseline)

### Modified Capabilities
- `review-gates`: Add A11y Auditor review as an informational gate (recommended for changes touching UI components or screens, never blocks shipping)
- `skill-chaining`: Add a11y auditor review to skill chain patterns (after Automation Tester, before Design review)
- `gstack-lifecycle`: Add `/plan-a11y-auditor-review` to the Planning phase

## Impact

- New skill file: `.claude/skills/plan-a11y-auditor-review/SKILL.md`
- Modified components: Button, Input, Card, Sidebar, ConfirmModal, AnimatedScreen, AnimatedListItem (7 files)
- Modified screens: all 8 screen files in app/ (contacts, trades, address, settings, contact detail, contact new, trade detail, trade new)
- Updated CLAUDE.md: new skill in lifecycle table, chaining patterns, and review gates
- Updated specs: review-gates, skill-chaining, gstack-lifecycle with a11y auditor references
