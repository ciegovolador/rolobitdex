# Design System

A comprehensive design system for the Rolobitdex P2P Bitcoin contact application, based on [bitcoin.design](https://bitcoin.design/) principles. This system provides a single source of truth for design tokens, components, and patterns.

## Overview

The design system consists of:
- **Design Tokens**: Colors, typography, spacing, and other design values
- **Component Library**: Reusable React Native components
- **Storybook**: Interactive documentation and testing reference
- **Documentation**: Guidelines and patterns for consistent design

## Design Tokens

Design tokens are the building blocks of our visual design. They are centralized and can be accessed throughout the application via the `useTheme()` hook.

### Accessing Tokens

```tsx
import { useTheme } from "../design";

export function MyComponent() {
  const { tokens } = useTheme();
  const { colors, spacing, typography } = tokens;

  return (
    <View style={{ backgroundColor: colors.surface, padding: spacing.md }}>
      <Text style={{ color: colors.text }}>Hello</Text>
    </View>
  );
}
```

### Color Palette

Colors follow bitcoin.design principles: accessible, professional, Bitcoin-focused.

#### Dark Theme (Default)

| Token | Value | Purpose |
|-------|-------|---------|
| `colors.background` | #0F0F1A | Main background |
| `colors.surface` | #1A1A2E | Surface/card backgrounds |
| `colors.surfaceLight` | #2A2A3E | Light surface variant |
| `colors.primary` | #F7931A | Bitcoin orange (brand color) |
| `colors.primaryDark` | #C77515 | Dark variant of primary |
| `colors.text` | #FFFFFF | Primary text color |
| `colors.textSecondary` | #AAAAAA | Secondary text |
| `colors.textMuted` | #666666 | Muted/disabled text |
| `colors.border` | #2A2A3E | Border and divider color |
| `colors.error` | #FF4444 | Error states |
| `colors.success` | #44BB44 | Success states |
| `colors.warning` | #FFAA00 | Warning states |
| `colors.onPrimary` | #000000 | Text on primary (black) |
| `colors.onSurface` | #FFFFFF | Text on surface |

#### Light Theme

The light theme provides the same structure with light backgrounds and dark text:
- `colors.background`: #FFFFFF
- `colors.surface`: #F5F5F5
- `colors.text`: #1A1A1A
- Other colors adjusted for light theme accessibility

#### Status Colors

Used for displaying transaction or status states:

| Status | Color | Use Case |
|--------|-------|----------|
| pending | #F5A623 | Waiting to be confirmed |
| accepted | #4A90D9 | Trade accepted/agreed |
| fiat_sent | #9B59B6 | Fiat currency sent |
| fiat_received | #1ABC9C | Fiat currency received |
| completed | #2ECC71 | Transaction completed |
| cancelled | #E74C3C | Cancelled/failed |

### Typography

The typography system defines font sizes, weights, and line heights.

| Scale | Size | Weight | Line Height | Use Case |
|-------|------|--------|-------------|----------|
| `xs` | 11px | 400 | 16px | Labels, captions |
| `sm` | 12px | 400 | 18px | Small text |
| `md` | 14px | 400 | 20px | Body text (default) |
| `lg` | 16px | 500 | 24px | Headings, emphasis |
| `xl` | 20px | 700 | 28px | Large headings |
| `xxl` | 24px | 700 | N/A | Titles |

#### Usage

```tsx
const { tokens } = useTheme();
const { typography, fontSize } = tokens;

// Using typography object
<Text style={typography.md}>Body text</Text>

// Using fontSize only
<Text style={{ fontSize: fontSize.lg }}>Larger text</Text>
```

### Spacing

Consistent spacing values for margins and padding:

| Scale | Value | Use Case |
|-------|-------|----------|
| `xs` | 4px | Small gaps between elements |
| `sm` | 8px | Default spacing |
| `md` | 16px | Standard padding/margin |
| `lg` | 24px | Large sections |
| `xl` | 32px | Extra large spacing |

```tsx
const { tokens } = useTheme();
const { spacing } = tokens;

<View style={{ padding: spacing.md, marginBottom: spacing.lg }}>
  {/* content */}
</View>
```

### Border Radius

Rounded corners for components:

| Scale | Value | Use Case |
|-------|-------|----------|
| `sm` | 6px | Small components |
| `md` | 10px | Standard (buttons, inputs) |
| `lg` | 16px | Cards, large components |

### Elevation/Shadows

Depth levels using shadow elevation:

| Level | Use Case |
|-------|----------|
| 0 | No shadow (flat) |
| 1 | Subtle elevation (default cards) |
| 2 | Medium elevation |
| 3 | Prominent elevation (modals) |

### Animation Timings

Consistent animation durations:

| Speed | Duration | Use Case |
|-------|----------|----------|
| `fast` | 150ms | Quick interactions |
| `normal` | 300ms | Standard animations |
| `slow` | 500ms | Important transitions |

## Component Library

### Available Components

#### Button

Interactive button with multiple variants and sizes.

**Variants**: `primary` (default), `secondary`, `danger`
**Sizes**: `sm`, `md` (default), `lg`
**States**: enabled, disabled, loading

```tsx
import { Button } from "../components";

<Button
  title="Click me"
  variant="primary"
  size="md"
  onPress={() => alert("Clicked!")}
/>

<Button title="Danger" variant="danger" onPress={() => {}} />
<Button title="Loading..." loading onPress={() => {}} />
```

#### Input

Text input field with optional label and error state.

```tsx
import { Input } from "../components";

<Input
  label="Email"
  placeholder="user@example.com"
  value={email}
  onChangeText={setEmail}
  error={emailError}
  keyboardType="email-address"
/>
```

#### Card

Container component for grouping related content.

```tsx
import { Card } from "../components";

<Card level={1}>
  <Text>Card content</Text>
</Card>
```

Elevation levels (0-3) control shadow depth.

#### Modal

Dialog/overlay component for important content.

```tsx
import { Modal } from "../components";

<Modal visible={isOpen} onClose={() => setIsOpen(false)}>
  <View style={{ padding: 20 }}>
    <Text>Modal content</Text>
  </View>
</Modal>
```

#### Label

Form label with optional required indicator.

```tsx
import { Label } from "../components";

<Label required>Name</Label>
<Input placeholder="Enter your name" />
```

#### Badge

Status indicator badge.

```tsx
import { Badge } from "../components";

<Badge label="Completed" variant="success" />
<Badge label="Pending" variant="warning" />
```

Variants: `default`, `success`, `warning`, `error`

#### Icon

Icon component using Ionicons.

```tsx
import { Icon } from "../components";

<Icon name="home" size={24} />
<Icon name="checkmark-circle" color={colors.success} />
```

### Creating New Components

When creating a new component, follow these patterns:

1. **Use Theme Context**
   ```tsx
   import { useTheme } from "../design";

   export function MyComponent() {
     const { tokens } = useTheme();
     const { colors, spacing } = tokens;
     // Use tokens for styling
   }
   ```

2. **Accessibility First**
   - Always add `accessibilityRole` and `accessibilityLabel`
   - For interactive elements, include `accessibilityState`

3. **Support Customization**
   - Accept `style` prop for style overrides
   - Accept `testID` for testing

4. **Create a Story**
   - Document all variants
   - Show interactive controls
   - Include usage examples

## Patterns

### Forms

Combine Label, Input, and error handling:

```tsx
import { Label, Input } from "../components";

<View>
  <Label required>Email Address</Label>
  <Input
    placeholder="user@example.com"
    value={email}
    onChangeText={setEmail}
    error={errors.email}
  />
</View>
```

### Dialogs

Use Modal for confirmations and dialogs:

```tsx
import { Modal, Button } from "../components";

<Modal visible={showConfirm} onClose={() => setShowConfirm(false)}>
  <View style={{ padding: 20 }}>
    <Text>Are you sure?</Text>
    <View style={{ flexDirection: "row", gap: 8, marginTop: 20 }}>
      <Button title="Cancel" variant="secondary" onPress={() => {}} style={{ flex: 1 }} />
      <Button title="Confirm" variant="danger" onPress={() => {}} style={{ flex: 1 }} />
    </View>
  </View>
</Modal>
```

## Accessibility

The design system prioritizes accessibility aligned with bitcoin.design principles:

- **Color Contrast**: All text meets WCAG AA standards (4.5:1 for normal text)
- **Touch Targets**: Interactive elements are minimum 48dp (Ionicons)
- **Screen Readers**: Components include proper labels and ARIA attributes
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Semantic HTML**: Components use semantic roles (button, heading, etc.)

## Theme Switching

The app supports light and dark themes. To switch themes:

```tsx
import { useTheme } from "../design";

export function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      onPress={toggleTheme}
    />
  );
}
```

Theme preference can be persisted to AsyncStorage for persistence across app sessions.

## Storybook

Interactive documentation available via:

```bash
npm run storybook
```

Storybook provides:
- Component preview
- All variants and states
- Interactive controls
- Code examples
- Accessibility information
- Theme switcher

## Bitcoin Design Alignment

This system implements bitcoin.design principles:

1. **Accessibility First**: All components meet accessibility standards
2. **Privacy-Focused**: Clean, trustworthy interface
3. **Bitcoin-Centered**: Bitcoin orange (#F7931A) as primary brand color
4. **Professional**: Clean, minimalist aesthetic
5. **Clear Hierarchy**: Consistent typography and spacing

## Migration Guide

To migrate existing components to the design system:

1. Import `useTheme` hook
2. Replace hardcoded colors with tokens
3. Replace hardcoded spacing with tokens
4. Update to use design system components
5. Ensure accessibility attributes are in place
6. Create/update Storybook story

Example:

```tsx
// Before
const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#1A1A2E" },
  text: { color: "#FFFFFF", fontSize: 16 },
});

// After
export function MyComponent() {
  const { tokens } = useTheme();
  return (
    <View style={{ padding: tokens.spacing.md, backgroundColor: tokens.colors.surface }}>
      <Text style={{ color: tokens.colors.text, fontSize: tokens.fontSize.lg }}>
        Text
      </Text>
    </View>
  );
}
```

## Contributing

When adding new design tokens or components:

1. Update `src/design/tokens.ts` with new tokens
2. Create component in `src/components/`
3. Create Storybook story in `src/components/*.stories.tsx`
4. Update this documentation
5. Ensure accessibility compliance
6. Add tests

## Resources

- [Bitcoin Design](https://bitcoin.design/) - Design guide for Bitcoin applications
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility guidelines
- [React Native Documentation](https://reactnative.dev/)
- [Storybook Documentation](https://storybook.js.org/)
