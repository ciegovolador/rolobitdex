## 1. A11y Auditor Review Role

- [x] 1.1 Create skill file `.claude/skills/plan-a11y-auditor-review/SKILL.md` with five dimensions (Screen Reader Support, Semantic Structure, Interaction Accessibility, Visual Accessibility, Motion & Focus Management), scoring 0-10, and thought leader channels (Léonie Watson, Heydon Pickering, Marcy Sutton, Steve Faulkner, Adrian Roselli)
- [x] 1.2 Update CLAUDE.md to add `/plan-a11y-auditor-review` to the lifecycle table, review gates section, skill chaining patterns, and all available skills table

## 2. Component A11y Refactor

- [x] 2.1 Refactor `src/components/Button.tsx` — add `accessibilityRole="button"`, `accessibilityLabel` from title prop, `accessibilityState={{ disabled }}`, `testID`
- [x] 2.2 Refactor `src/components/Input.tsx` — add `accessibilityLabel` from label prop, `accessibilityHint` for placeholder-only inputs, `testID`
- [x] 2.3 Refactor `src/components/Card.tsx` — add `accessibilityRole` prop passthrough, `testID`
- [x] 2.4 Refactor `src/components/Sidebar.tsx` — add `accessibilityRole="tab"`, `accessibilityState={{ selected }}` per tab, `accessibilityLabel` per tab, `testID`
- [x] 2.5 Refactor `src/components/ConfirmModal.tsx` — add `accessibilityRole="alert"`, `accessibilityLabel` for title/message, focus management
- [x] 2.6 Refactor `src/components/AnimatedScreen.tsx` — respect `prefers-reduced-motion` via `AccessibilityInfo.isReduceMotionEnabled()` or Reanimated `useReducedMotion`
- [x] 2.7 Refactor `src/components/AnimatedListItem.tsx` — respect `prefers-reduced-motion`, skip stagger animation when enabled

## 3. Screen A11y Refactor

- [x] 3.1 Refactor `app/(tabs)/index.tsx` — add a11y labels to contact rows, FAB ("Add new contact"), search input, empty state; add testIDs
- [x] 3.2 Refactor `app/(tabs)/trades.tsx` — add a11y labels to trade rows (include type/amount/status/contact), filter chips (`accessibilityRole="tab"`, `accessibilityState`), FAB; add testIDs
- [x] 3.3 Refactor `app/(tabs)/address.tsx` — add a11y label to QR code image, address text, copy/share buttons; add testIDs
- [x] 3.4 Refactor `app/(tabs)/settings.tsx` — add `accessibilityRole="switch"` and `accessibilityState={{ checked }}` to toggles, label all settings rows; add testIDs
- [x] 3.5 Refactor `app/contact/new.tsx` — add a11y label to name input, save button; add testIDs
- [x] 3.6 Refactor `app/contact/[id].tsx` — add a11y labels to edit fields, alias/address cards, delete button with hint, trade history items; add testIDs
- [x] 3.7 Refactor `app/trade/new.tsx` — add a11y to type selector (`accessibilityState={{ selected }}`), contact chips, amount inputs, create button; add testIDs
- [x] 3.8 Refactor `app/trade/[id].tsx` — add a11y to status progress indicator (announce current step), action buttons with hints, status badge; add testIDs

## 4. Spec Updates (Delta Specs)

- [x] 4.1 Verify review-gates delta spec covers dashboard display with A11y Auditor row
- [x] 4.2 Verify skill-chaining delta spec includes a11y auditor in all chain patterns
- [x] 4.3 Verify gstack-lifecycle delta spec adds a11y auditor to Planning phase

## 5. Verification

- [x] 5.1 Run existing Jest test suite (`npm test`) to confirm no regressions
- [x] 5.2 Run Playwright E2E tests (`npm run test:e2e:web`) to confirm no regressions
- [x] 5.3 Verify the skill file loads correctly by checking it appears in the skills list
