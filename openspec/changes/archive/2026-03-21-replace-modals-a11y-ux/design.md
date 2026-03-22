## Context

The app currently has two modal components (`Modal.tsx`, `ConfirmModal.tsx`) but only one usage site: `ContactDetailView` uses `ConfirmModal` for delete confirmation. The generic `Modal` is unused in app screens (only in stories). The `@gorhom/bottom-sheet` dependency is installed but never imported. Forms throughout the app already use inline Card patterns (alias, address, note, settings export).

The existing `ConfirmModal` has partial a11y: `accessibilityRole="alert"` only on danger variant, `accessibilityLabel` combining title+message, labeled buttons — but no focus management, no keyboard handling, no live region announcements.

## Goals / Non-Goals

**Goals:**
- Replace the ConfirmModal with an `InlineConfirm` component that renders in-flow (no overlay)
- Full a11y support: `accessibilityRole="alert"`, `accessibilityLiveRegion="polite"`, labeled buttons, logical button order (Cancel before Confirm)
- Same API as ConfirmModal (visible, title, message, confirmLabel, variant, onConfirm, onCancel) for drop-in replacement
- Build in Storybook isolation first, per project convention
- Unit tests for the new component
- Add a spec prohibiting modal usage
- Remove all unused modal-related code and dependencies

**Non-Goals:**
- Animation on InlineConfirm show/hide (keep it simple — conditional render)
- App-wide font scaling / dynamic type support (separate concern)
- Refactoring existing inline forms (they already work)

## Decisions

### 1. Inline Card vs Bottom Sheet vs Alert API

**Chosen: Inline Card**. The InlineConfirm renders as a Card-like element in the content flow, visually distinguished with a border and contrasting background.

- *Bottom Sheet*: Still an overlay pattern — same a11y issues as modals (focus traps, backdrop handling). Also adds a dependency we're trying to remove.
- *Alert API*: Platform-native alerts are accessible but can't be styled, don't match the dark theme, and feel disjointed in a web-first app.
- *Inline Card*: Consistent with existing patterns (alias/address/note forms), no overlay, natural keyboard flow, fully styleable.

### 2. Component API — Mirror ConfirmModal + Focus Management

Keep the same prop interface plus an optional `triggerRef` for focus return. The controller (`useContactDetail`) needs zero changes to state logic — only the view passes the ref.

```
InlineConfirm props:
  visible: boolean
  title: string
  message: string
  confirmLabel?: string (default: "Confirm")
  onConfirm: () => void
  onCancel: () => void
  variant?: "primary" | "danger" (default: "primary")
  testID?: string
  triggerRef?: React.RefObject<any>  // focus returns here on dismiss
```

### 3. A11y Implementation (10/10 target)

**Screen Reader (10/10):**
- Container: `accessibilityRole="alert"` on ALL variants (not just danger)
- Container: `accessibilityLiveRegion="polite"` — triggers automatic announcement on mount
- Container: `accessibilityLabel={`${title}. ${message}`}`
- Conditional render (`return null` when hidden) ensures mount = announcement

**Semantic Structure (10/10):**
- Title: `accessibilityRole="header"` for heading navigation
- Buttons: Cancel before Confirm in DOM order (safe default)
- Buttons: `accessibilityRole="button"`, `accessibilityLabel` with action text

**Interaction (10/10):**
- Buttons: minimum 44x44pt touch targets (WCAG 2.5.5)
- Buttons: minimum 12pt gap between Cancel and Confirm to prevent accidental taps

**Visual (10/10):**
- Visible border + contrasting background to distinguish from surrounding content
- Danger colors verified against dark theme for WCAG AA 4.5:1 contrast
- Status conveyed via text AND color (never color-only)

**Focus Management (10/10):**
- `useRef` on Cancel button + `useEffect` on `visible` to auto-focus Cancel on appear
- On dismiss (cancel or confirm): focus returns to `triggerRef` if provided

```
FOCUS FLOW
═══════════════════════════════════════════════
[Delete button] ─── click ───▶ InlineConfirm mounts
     ▲                              │
     │                        useEffect: focus → [Cancel]
     │                              │
     │                    user presses Cancel or Confirm
     │                              │
     └──── focus returns ◀──────────┘
```

### 4. Conditional Render (not display:none)

When `visible=false`, return `null` — don't render a hidden element. This is simpler and means the component lifecycle matches visibility (mount on show, unmount on hide), which naturally triggers the live region announcement on mount.

## Risks / Trade-offs

- **[Scroll position]** When InlineConfirm appears, it may push content below the fold → Mitigated by placing it at the location of the delete button (replaces the button area, no layout shift)
- **[Reduced prominence]** Inline confirm is less attention-grabbing than a modal overlay → Acceptable trade-off for a11y. The danger variant styling (red border, danger-colored confirm button) provides sufficient visual warning
- **[E2E test update]** Changing the component may break existing e2e selectors → Update testID in the e2e test to match the new component
