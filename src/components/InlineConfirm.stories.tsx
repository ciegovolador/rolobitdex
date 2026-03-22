import { useRef, useState } from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react-native";
import { InlineConfirm } from "./InlineConfirm";
import { Button } from "./Button";

/**
 * InlineConfirm Component
 * Inline confirmation dialog that renders in content flow (no modal overlay)
 *
 * - **Variants**: primary (default), danger
 * - **A11y**: accessibilityRole="alert", live region, auto-focus Cancel, focus return
 * - **Pattern**: Replaces modal confirmations for better accessibility
 */
const meta = {
  title: "Components/InlineConfirm",
  component: InlineConfirm,
  args: {
    title: "Confirm Action",
    message: "Are you sure you want to proceed?",
    confirmLabel: "Confirm",
    visible: true,
    onConfirm: () => alert("Confirmed!"),
    onCancel: () => alert("Cancelled!"),
  },
  argTypes: {
    title: {
      control: "text",
      description: "Confirmation title",
    },
    message: {
      control: "text",
      description: "Confirmation message",
    },
    confirmLabel: {
      control: "text",
      description: "Confirm button label",
    },
    variant: {
      control: "select",
      options: ["primary", "danger"],
      description: "Visual variant",
    },
    visible: {
      control: "boolean",
      description: "Whether the confirmation is visible",
    },
  },
} satisfies Meta<typeof InlineConfirm>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Primary variant (default) - Used for non-destructive confirmations
 */
export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

/**
 * Danger variant - Used for destructive actions like delete
 */
export const Danger: Story = {
  args: {
    variant: "danger",
    title: "Delete Contact",
    message: 'Delete "Alice" and all associated data? This cannot be undone.',
    confirmLabel: "Delete",
  },
};

/**
 * Interactive - Toggle visibility with a button
 */
export const Interactive: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(false);
    return (
      <View>
        <Button title="Show Confirmation" onPress={() => setVisible(true)} />
        <InlineConfirm
          {...args}
          visible={visible}
          onConfirm={() => {
            alert("Confirmed!");
            setVisible(false);
          }}
          onCancel={() => setVisible(false)}
        />
      </View>
    );
  },
};

/**
 * A11y Demo - Shows focus management: Cancel auto-focused on appear, focus returns to trigger on dismiss
 */
export const A11yDemo: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(false);
    const triggerRef = useRef<View>(null);
    return (
      <View>
        <View ref={triggerRef}>
          <Button
            title="Delete Contact (focus returns here)"
            variant="danger"
            onPress={() => setVisible(true)}
          />
        </View>
        <InlineConfirm
          {...args}
          visible={visible}
          variant="danger"
          title="Delete Contact"
          message="This cannot be undone. Cancel is auto-focused for safety."
          confirmLabel="Delete"
          triggerRef={triggerRef}
          onConfirm={() => {
            alert("Deleted!");
            setVisible(false);
          }}
          onCancel={() => setVisible(false)}
        />
      </View>
    );
  },
};
