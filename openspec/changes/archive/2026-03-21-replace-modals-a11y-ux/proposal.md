## Why

The app uses React Native's `Modal` component for delete confirmations, which creates accessibility barriers: no focus management, no keyboard escape handling, no live region announcements, and overlay rendering that breaks screen magnifiers. Replacing modals with inline confirmation patterns improves a11y (WCAG compliance), simplifies the component tree, and aligns with the existing inline form patterns already used throughout the app.

## What Changes

- **BREAKING**: Remove `ConfirmModal` component — replaced by `InlineConfirm`
- **BREAKING**: Remove `Modal` component — unused wrapper, no longer needed
- Create `InlineConfirm` component with full a11y support (accessibilityRole="alert", accessibilityLiveRegion="polite", labeled buttons)
- Add Storybook stories for `InlineConfirm` (Primary, Danger, Interactive variants)
- Add unit tests for `InlineConfirm` (visibility, callbacks, a11y attributes, variants)
- Update `ContactDetailView` to use `InlineConfirm` instead of `ConfirmModal`
- Remove `@gorhom/bottom-sheet` unused dependency
- Add spec prohibiting modal usage in the application
- Update e2e tests for the new inline confirmation pattern

## Capabilities

### New Capabilities
- `no-modal-policy`: Specification that the application SHALL NOT use overlay modals, establishing inline patterns as the standard for confirmations and forms

### Modified Capabilities

## Impact

- `src/components/Modal.tsx` — deleted
- `src/components/Modal.stories.tsx` — deleted
- `src/components/ConfirmModal.tsx` — deleted
- `src/components/ConfirmModal.stories.tsx` — deleted
- `src/components/InlineConfirm.tsx` — new component
- `src/components/InlineConfirm.stories.tsx` — new stories
- `src/components/InlineConfirm.test.tsx` — new tests
- `src/views/contacts/ContactDetailView.tsx` — swap ConfirmModal → InlineConfirm
- `e2e/web/contacts.test.ts` — update delete flow selectors
- `package.json` — remove `@gorhom/bottom-sheet`
