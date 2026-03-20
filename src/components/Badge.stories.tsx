import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { Badge } from "./Badge";

/**
 * Badge Component
 * Status indicator for displaying labels or statuses
 *
 * - **Variants**: default, success, warning, error
 * - **Use**: status display, labels, tags
 */
const meta = {
  title: "Components/Badge",
  component: Badge,
  args: {
    label: "Status",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error"],
      description: "Badge style variant",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default variant
 */
export const Default: Story = {
  args: {
    variant: "default",
  },
};

/**
 * Success variant (green)
 */
export const Success: Story = {
  args: {
    variant: "success",
    label: "Completed",
  },
};

/**
 * Warning variant (orange)
 */
export const Warning: Story = {
  args: {
    variant: "warning",
    label: "Pending",
  },
};

/**
 * Error variant (red)
 */
export const Error: Story = {
  args: {
    variant: "error",
    label: "Failed",
  },
};

/**
 * All variants together
 */
export const AllVariants: Story = {
  render: (args) => (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Badge {...args} variant="default" label="Default" />
      <Badge {...args} variant="success" label="Success" />
      <Badge {...args} variant="warning" label="Warning" />
      <Badge {...args} variant="error" label="Error" />
    </View>
  ),
};

/**
 * Common status labels
 */
export const StatusLabels: Story = {
  render: (args) => (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Badge {...args} variant="success" label="Accepted" />
        <Badge {...args} variant="success" label="Completed" />
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Badge {...args} variant="warning" label="Pending" />
        <Badge {...args} variant="warning" label="In Progress" />
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Badge {...args} variant="error" label="Cancelled" />
        <Badge {...args} variant="error" label="Failed" />
      </View>
    </View>
  ),
};
