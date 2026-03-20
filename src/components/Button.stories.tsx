import type { Meta, StoryObj } from "@storybook/react-native";
import { Button } from "./Button";

/**
 * Button Component
 * Displays interactive buttons with multiple variants and sizes
 *
 * - **Variants**: primary (default), secondary, danger
 * - **Sizes**: sm, md (default), lg
 * - **States**: enabled (default), disabled, loading
 */
const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    title: "Click me",
    onPress: () => alert("Button pressed!"),
  },
  argTypes: {
    title: {
      control: "text",
      description: "Button label text",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger"],
      description: "Button style variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Button size",
    },
    loading: {
      control: "boolean",
      description: "Show loading spinner",
    },
    disabled: {
      control: "boolean",
      description: "Disable the button",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Primary variant (default) - Used for main actions
 */
export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

/**
 * Secondary variant - Used for alternative actions
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

/**
 * Danger variant - Used for destructive actions
 */
export const Danger: Story = {
  args: {
    variant: "danger",
    title: "Delete",
  },
};

/**
 * Small size
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Medium size (default)
 */
export const Medium: Story = {
  args: {
    size: "md",
  },
};

/**
 * Large size
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Loading state - Shows spinner instead of text
 */
export const Loading: Story = {
  args: {
    loading: true,
  },
};

/**
 * Disabled state - Button is not interactive
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * All variants in a row
 */
export const AllVariants: Story = {
  render: (args) => (
    <>
      <Button {...args} variant="primary" title="Primary" />
      <Button {...args} variant="secondary" title="Secondary" style={{ marginTop: 12 }} />
      <Button {...args} variant="danger" title="Danger" style={{ marginTop: 12 }} />
    </>
  ),
};

/**
 * All sizes in a row
 */
export const AllSizes: Story = {
  render: (args) => (
    <>
      <Button {...args} size="sm" title="Small" />
      <Button {...args} size="md" title="Medium" style={{ marginTop: 12 }} />
      <Button {...args} size="lg" title="Large" style={{ marginTop: 12 }} />
    </>
  ),
};
