## Context

Rolobitdex is a React Native (Expo SDK 55) cross-platform app with 4 tabs (Contacts, Trades, My Address, Settings). The current UI uses a basic dark theme with Bitcoin orange accents. Styles are inline per-screen with shared tokens in `src/constants/theme.ts`. Navigation uses expo-router with bottom tabs via `@react-navigation/bottom-tabs`. The app works on iOS, Android, and Web but the layout is not responsive — it uses the same single-column mobile layout on all viewport sizes.

## Goals / Non-Goals

**Goals:**
- Polish visual design: better typography hierarchy, consistent spacing, refined card/list styles
- Responsive layout: sidebar navigation on desktop (>768px), bottom tabs on mobile
- Persistent navigation: menu always visible regardless of screen depth or scroll
- Smooth animations: screen transitions, button press feedback, trade status changes
- Maintain cross-platform compatibility (iOS, Android, Web)

**Non-Goals:**
- Complete redesign or brand change — keep existing dark theme + Bitcoin orange palette
- Custom icon set — continue using Ionicons
- Dark/light theme toggle — stay dark-only for now
- Complex gesture-based navigation

## Decisions

### 1. Responsive navigation via useWindowDimensions
**Decision:** Use `useWindowDimensions` to switch between bottom tabs (mobile) and a persistent sidebar (desktop/tablet) at a 768px breakpoint.
**Rationale:** This is built into React Native, requires no extra dependencies, and works across all platforms. The sidebar will be a custom component wrapping the tab navigator.
**Alternative considered:** react-navigation drawer — rejected because drawer hides by default, and we need always-visible navigation.

### 2. react-native-reanimated for animations
**Decision:** Add `react-native-reanimated` for smooth, native-driver animations.
**Rationale:** It's the standard for performant animations in React Native, has Expo SDK 55 support, and enables layout animations, entering/exiting transitions, and gesture-driven motion. The `Animated` API from React Native core is limited for complex transitions.
**Alternative considered:** `react-native-animated` (core) — rejected due to limited layout animation support and no `LayoutAnimation` on web.

### 3. Extended theme tokens in theme.ts
**Decision:** Extend `src/constants/theme.ts` with typography scale, elevation/shadow presets, animation durations, and responsive breakpoints. No new file — keep the single source of truth.
**Rationale:** Centralizing design tokens keeps styling consistent and makes global changes easy.

### 4. Always-visible navigation via custom tab layout
**Decision:** Modify `app/(tabs)/_layout.tsx` to render a custom layout that keeps the tab bar visible even when navigating to nested screens (contact detail, trade detail, etc.) by restructuring navigation so detail screens render alongside the tab bar rather than replacing it.
**Rationale:** The user explicitly requested the menu to always be visible. Currently, pushing a Stack screen hides the bottom tabs.

## Risks / Trade-offs

- **[Reanimated plugin complexity]** → Mitigation: Expo SDK 55 includes reanimated support via `expo install`, and the babel plugin is pre-configured in expo's babel preset.
- **[Responsive layout testing]** → Mitigation: Test at 3 breakpoints (375px mobile, 768px tablet, 1280px desktop) using the browse tool.
- **[Always-visible nav changes routing structure]** → Mitigation: Keep existing route paths intact; only change layout rendering, not route definitions.
