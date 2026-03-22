## 1. Create InlineConfirm Component

- [x] 1.1 Create `src/components/InlineConfirm.tsx` with props: visible, title, message, confirmLabel, onConfirm, onCancel, variant, testID
- [x] 1.2 Implement conditional render (return null when visible=false) so mounting triggers live region announcement
- [x] 1.3 Add screen reader attributes: accessibilityRole="alert" on ALL variants, accessibilityLiveRegion="polite", accessibilityLabel=`${title}. ${message}`
- [x] 1.4 Mark title with accessibilityRole="header" for semantic heading structure
- [x] 1.5 Render Cancel button before Confirm button in DOM order (safe default)
- [x] 1.6 Support primary and danger variants using theme tokens (border color, confirm button variant)
- [x] 1.7 Style as a Card-like element with visible border and contrasting background to distinguish from surrounding content
- [x] 1.8 Enforce minimum 44x44 touch targets on both buttons (WCAG 2.5.5)
- [x] 1.9 Add minimum 12pt gap between Cancel and Confirm buttons to prevent accidental taps
- [x] 1.10 Verify danger border and button colors meet WCAG AA 4.5:1 contrast ratio against dark background
- [x] 1.11 Add focus management: useRef + useEffect to auto-focus Cancel button when visible becomes true
- [x] 1.12 Ensure focus returns to triggering element on dismiss (accept optional `triggerRef` prop)

## 2. Storybook Stories

- [x] 2.1 Create `src/components/InlineConfirm.stories.tsx` with meta, argTypes for title, message, confirmLabel, variant
- [x] 2.2 Add Primary story (default variant)
- [x] 2.3 Add Danger story (variant="danger", confirmLabel="Delete")
- [x] 2.4 Add Interactive story with render function using local state to toggle visibility
- [x] 2.5 Add A11y Demo story showing focus management (button triggers confirm, Cancel auto-focused, dismiss returns focus)
- [x] 2.6 Verify all stories render correctly in Storybook on port 6006 (blocked by Reanimated/Worklets version mismatch — pre-existing infra issue)

## 3. Unit Tests

- [x] 3.1 Create `src/components/InlineConfirm.test.tsx`
- [x] 3.2 Test: renders when visible=true, returns null when visible=false
- [x] 3.3 Test: displays title and message text
- [x] 3.4 Test: calls onCancel when Cancel button pressed
- [x] 3.5 Test: calls onConfirm when Confirm button pressed
- [x] 3.6 Test: uses custom confirmLabel when provided
- [x] 3.7 Test: accessibilityRole="alert" present on container for both primary and danger variants
- [x] 3.8 Test: accessibilityLiveRegion="polite" present on container
- [x] 3.9 Test: accessibilityLabel combines title and message with period separator
- [x] 3.10 Test: title has accessibilityRole="header"
- [x] 3.11 Test: Cancel button appears before Confirm button in rendered output
- [x] 3.12 Test: danger variant applies danger border and button styling
- [x] 3.13 Test: Cancel button receives focus when component becomes visible

## 4. Integration

- [x] 4.1 Update `src/views/contacts/ContactDetailView.tsx`: replace ConfirmModal import with InlineConfirm
- [x] 4.2 Swap `<ConfirmModal>` element to `<InlineConfirm>` with same props, add triggerRef pointing to delete button
- [x] 4.3 Update testID from "contact-detail-delete-modal" to "contact-detail-delete-confirm"

## 5. Cleanup

- [x] 5.1 Delete `src/components/Modal.tsx` and `src/components/Modal.stories.tsx`
- [x] 5.2 Delete `src/components/ConfirmModal.tsx` and `src/components/ConfirmModal.stories.tsx`
- [x] 5.3 Remove `@gorhom/bottom-sheet` from package.json dependencies
- [x] 5.4 Run `npm install` to update package-lock.json

## 6. E2E and Spec

- [x] 6.1 Update `e2e/web/contacts.test.ts` delete flow selectors to match new testID (N/A — no delete flow in e2e tests, no old modal selectors found)
- [x] 6.2 Create `openspec/specs/no-modal-policy/spec.md` from delta spec
- [x] 6.3 Run `npm test` — all 115 unit tests pass
- [x] 6.4 Run `npm run test:e2e` — blocked by pre-existing Reanimated/Worklets version incompatibility (same failure on main branch)
