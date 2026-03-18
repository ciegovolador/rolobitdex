## Why

The app's UI is functional but lacks visual polish, responsive layout support, and motion design. On web/desktop the layout doesn't adapt to larger screens, and the tab bar behavior differs from expectations (it should always be visible). Improving these areas will make the app feel production-quality across all platforms.

## What Changes

- **Visual design overhaul**: Improve typography, spacing, card styles, and color usage across all screens for a more polished look
- **Responsive layout**: Adapt layouts for mobile, tablet, and desktop viewports — e.g., sidebar navigation on desktop, multi-column layouts for wider screens
- **Persistent navigation**: Ensure the tab bar / navigation menu is always visible regardless of screen or scroll position
- **Animations & transitions**: Add smooth screen transitions, loading states, micro-interactions on buttons and list items, and status change animations on trades

## Capabilities

### New Capabilities
- `ui-design-system`: Enhanced design tokens, typography scale, component styling guidelines, and animation primitives
- `responsive-layout`: Responsive breakpoints and adaptive navigation (bottom tabs on mobile, sidebar on desktop)

### Modified Capabilities
- `cross-platform-shell`: Navigation must be always visible; layout must adapt to viewport size

## Impact

- `src/constants/theme.ts`: Extended design tokens (typography scale, shadows, animations)
- `app/(tabs)/_layout.tsx`: Responsive navigation — bottom tabs on mobile, sidebar on desktop
- All screen files (`app/**/*.tsx`): Updated styles, spacing, transitions
- `src/components/*.tsx`: Enhanced component styles and animation support
- New dependency likely needed: `react-native-reanimated` for smooth animations
