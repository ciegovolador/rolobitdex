## Context

Rolobitdex is a React Native (Expo) app with 5 shared components and 8 screens. None have accessibility attributes. The app uses `TouchableOpacity`, `Pressable`, `TextInput`, `FlatList`, and custom modals — all without semantic a11y props. The project already has 4 review roles (CEO, Eng, Bitcoiner, Cypherpunk, Automation Tester) following a five-dimension scored pattern.

## Goals / Non-Goals

**Goals:**
- Create an A11y Auditor review role (`/plan-a11y-auditor-review`) following the established five-dimension pattern
- Add `accessibilityLabel`, `accessibilityRole`, `accessibilityHint`, `accessibilityState` to all interactive components and screens
- Add `testID` attributes to all testable elements for automated QA
- Respect `prefers-reduced-motion` in animation components
- Achieve WCAG 2.1 AA compliance for screen reader navigation, form structure, and interactive elements

**Non-Goals:**
- Full WCAG AAA compliance (AAA is aspirational, not required)
- Adding an automated a11y testing library (axe-core, jest-axe) — future work
- RTL (right-to-left) language support
- Voice control / switch control optimizations beyond standard a11y attributes

## Decisions

### Decision 1: Review role follows existing five-dimension pattern
**Choice**: Five scored dimensions (Screen Reader Support, Semantic Structure, Interaction Accessibility, Visual Accessibility, Motion & Focus Management), each rated 0-10.

**Why**: Consistency with Bitcoiner, Cypherpunk, and Automation Tester roles. Channels a11y thought leaders: Léonie Watson, Heydon Pickering, Marcy Sutton, Steve Faulkner, Adrian Roselli.

### Decision 2: Component-level a11y props over screen-level wrappers
**Choice**: Add a11y attributes directly to shared components (Button, Input, etc.) so all screens inherit them automatically.

**Why**: Fixes the problem at the source. Button gets `accessibilityRole="button"` once, every screen benefits. Screen-level fixes are only needed for screen-specific interactive elements (FABs, filter chips, custom trade status).

**Alternative**: Screen-level only. Rejected because it creates duplication and fragility — each new screen must remember to add a11y props.

### Decision 3: testID naming convention: kebab-case with screen prefix
**Choice**: `testID="contacts-search-input"`, `testID="trade-new-buy-btn"`, `testID="settings-biometric-switch"`.

**Why**: Enables E2E test selectors while keeping IDs globally unique and self-documenting. Prefix matches the screen route.

### Decision 4: A11y Auditor review positioned after Automation Tester, before Design
**Choice**: Chain position: Eng → Automation Tester → A11y Auditor → Design.

**Why**: A11y concerns are structural (like testing) and should be evaluated before visual design polish. The a11y auditor catches missing labels and roles; the design reviewer catches visual hierarchy.

### Decision 5: Respect prefers-reduced-motion via React Native AccessibilityInfo
**Choice**: Use `AccessibilityInfo.isReduceMotionEnabled()` (or `useReducedMotion` from Reanimated) to disable animations when the user has reduced motion enabled.

**Why**: Standard React Native API for motion preferences. AnimatedScreen and AnimatedListItem components already use `Animated` — wrapping them with a motion check is minimal work.

## Risks / Trade-offs

- **[Large diff touching many files]** → Mitigated by doing component changes first (auto-propagates) then screen-specific changes. Each file change is small (adding props).
- **[testID clutter]** → Mitigated by only adding testIDs to interactive and assertable elements, not every View.
- **[Review role overload — now 6 roles]** → Mitigated by keeping a11y auditor informational and only recommending it for UI-touching changes.
- **[No automated a11y testing yet]** → The testIDs and semantic structure enable future automated testing (axe-core, Detox a11y checks). This change lays the foundation.
