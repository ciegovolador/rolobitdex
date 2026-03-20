# Storybook

Interactive component documentation and testing environment for the Rolobitdex design system.

## Getting Started

### Start Storybook

```bash
npm run storybook
```

This will launch Storybook UI where you can:
- Preview all components
- Test different variants and states
- Interact with controls
- Switch between themes (light/dark)
- View component documentation

## Creating Stories

A story file documents a component with all its variants and usage examples.

### Story File Structure

Create `src/components/MyComponent.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react-native";
import { MyComponent } from "./MyComponent";

/**
 * MyComponent
 * Description of what this component does
 *
 * - **Features**: list features
 * - **Use**: when to use this component
 */
const meta = {
  title: "Components/MyComponent",
  component: MyComponent,
  args: {
    // Default props for all stories
    label: "Default",
  },
  argTypes: {
    // Configure interactive controls
    label: {
      control: "text",
      description: "Component label",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "Component variant",
    },
  },
} satisfies Meta<typeof MyComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default usage
 */
export const Default: Story = {};

/**
 * Primary variant example with description
 */
export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

/**
 * Multiple variants shown together
 */
export const AllVariants: Story = {
  render: (args) => (
    <>
      <MyComponent {...args} variant="primary" label="Primary" />
      <MyComponent {...args} variant="secondary" label="Secondary" />
    </>
  ),
};
```

### Story Best Practices

1. **Document Purpose**: Add JSDoc comment explaining the component
2. **Show All Variants**: Create stories for each variant/size/state
3. **Interactive Examples**: Use `render` function to show combinations
4. **Clear Labels**: Use descriptive story names (e.g., "WithLabel" not "Test1")
5. **Include Controls**: Set up `argTypes` for interactive exploration
6. **Accessibility Info**: Document any accessibility features or requirements

## Controls

Controls let users interact with component props in Storybook without code changes.

### Supported Control Types

```tsx
argTypes: {
  text: { control: "text" },                    // Text input
  boolean: { control: "boolean" },              // Checkbox
  number: { control: "number" },                // Number input
  select: { control: "select", options: [...] }, // Dropdown
  radio: { control: "radio", options: [...] },  // Radio buttons
  color: { control: "color" },                  // Color picker
}
```

## Theme Switching

Storybook includes a theme switcher in the toolbar. To test your component in both themes:

1. Look for "Theme" button in Storybook toolbar
2. Select "light" or "dark"
3. All components will update to the new theme

This is handled by the ThemeProvider wrapper in `.storybook/preview.tsx`.

## Documenting Components

Good documentation helps developers use components correctly.

### Doc Blocks

Use Storybook's doc blocks for rich documentation:

```tsx
import { Meta, StoryObj, ArgTypes } from "@storybook/react-native";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: "A versatile button component for user actions.",
      },
    },
  },
  argTypes: {
    variant: {
      description: "Visual style variant",
      options: ["primary", "secondary", "danger"],
      control: "select",
    },
  },
};
```

### JSDoc Comments

Explain stories with comments:

```tsx
/**
 * Primary button - used for main actions like "Save" or "Submit"
 *
 * Best practices:
 * - Use for the primary action on a screen
 * - Keep label concise (1-2 words)
 * - Provide clear visual feedback on interaction
 */
export const Primary: Story = {
  args: { variant: "primary" },
};
```

## Testing in Storybook

### Visual Testing

Manually verify component appearance:

1. Open story in Storybook
2. Check all variants
3. Check both themes (light/dark)
4. Check different screen sizes
5. Test interaction states (hover, press, disabled)

### Interaction Testing

Use the Controls panel to:
- Change props in real-time
- Trigger interactions
- Verify state updates
- Test edge cases

### Accessibility Testing

1. Check that labels are visible
2. Test with screen reader (if available)
3. Verify keyboard navigation (Tab, Enter)
4. Check color contrast in both themes
5. Ensure touch targets are adequate

## Story Organization

Stories are organized by component type:

```
Stories/
├── Components/
│   ├── Button
│   ├── Input
│   ├── Card
│   ├── Modal
│   ├── Label
│   ├── Badge
│   └── Icon
```

## Tips & Tricks

### Template Stories

Reuse a template for multiple stories:

```tsx
const Template: Story = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = { variant: "primary" };

export const Secondary = Template.bind({});
Secondary.args = { variant: "secondary" };
```

### Debugging in Storybook

1. Open browser DevTools (F12)
2. Inspect element to see component structure
3. Check Console for errors/warnings
4. Use React DevTools extension to inspect props/state

### Exporting Stories for CI

Storybook can be built for CI/CD integration:

```bash
npm run build-storybook
```

This creates a static site that can be:
- Deployed for visual regression testing
- Shared with stakeholders
- Used for documentation

## Common Issues

### Theme not switching
- Check that preview.tsx has ThemeProvider decorator
- Verify darkTheme and lightTheme are imported correctly

### Controls not showing
- Ensure argTypes are defined for the prop
- Check control type matches prop type (e.g., number for numeric prop)

### Components not rendering
- Check imports in story file
- Verify component exports properly
- Check browser console for errors

## Resources

- [Storybook Documentation](https://storybook.js.org/docs/react-native/get-started)
- [Storybook Controls](https://storybook.js.org/docs/react-native/essentials/controls)
- [Storybook Docs](https://storybook.js.org/docs/react-native/writing-docs/docs-page)
