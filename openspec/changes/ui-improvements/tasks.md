## 1. Dependencies & Theme Tokens

- [x] 1.1 Install react-native-reanimated via `expo install`
- [x] 1.2 Extend `src/constants/theme.ts` with typography scale (xs/sm/md/lg/xl with fontSize, lineHeight, fontWeight), elevation presets (0-3 using boxShadow), animation durations (fast/normal/slow), responsive breakpoints (mobile/tablet/desktop), and trade status colors

## 2. Responsive Navigation

- [x] 2.1 Create `src/components/Sidebar.tsx` — vertical navigation sidebar with icons and labels for all 4 tabs, active tab highlighting, styled to match dark theme
- [x] 2.2 Refactor `app/(tabs)/_layout.tsx` to use `useWindowDimensions` and render Sidebar on viewports ≥768px, bottom tabs on mobile
- [x] 2.3 Restructure navigation so detail screens (contact/[id], trade/[id], scan) render within the tab layout, keeping navigation always visible

## 3. Visual Design Polish

- [x] 3.1 Update `src/components/Card.tsx` with elevation shadows, refined border radius, and consistent padding using theme tokens
- [x] 3.2 Update `src/components/Button.tsx` with improved styling and press feedback animation (scale-down on press using Reanimated)
- [x] 3.3 Update `src/components/Input.tsx` with focus state animation and refined styling
- [x] 3.4 Update contacts list screen (`app/(tabs)/index.tsx`) — typography hierarchy, consistent spacing, refined list item styles
- [x] 3.5 Update trades list screen (`app/(tabs)/trades.tsx`) — status badge colors from theme, improved filter chips, refined list items
- [x] 3.6 Update My Address screen (`app/(tabs)/address.tsx`) — improved QR card layout and typography
- [x] 3.7 Update Settings screen (`app/(tabs)/settings.tsx`) — polished setting rows and section headers

## 4. Detail Screen Polish

- [x] 4.1 Update contact detail screen (`app/contact/[id].tsx`) — section cards, typography, spacing
- [x] 4.2 Update trade detail screen (`app/trade/[id].tsx`) — status progress visualization with colored dots, improved action buttons
- [x] 4.3 Update new trade form (`app/trade/new.tsx`) — improved form layout and contact selector

## 5. Animations & Transitions

- [x] 5.1 Add screen enter/exit transitions using Reanimated layout animations
- [x] 5.2 Add list item entering animations (staggered fade-in) on contacts and trades lists
- [x] 5.3 Add trade status change animation on the trade detail screen

## 6. Responsive Content Layout

- [x] 6.1 Add max-width constraint (800px centered) for content area on desktop viewports
- [x] 6.2 Add 2-column grid layout for contacts and trades lists on tablet/desktop viewports
