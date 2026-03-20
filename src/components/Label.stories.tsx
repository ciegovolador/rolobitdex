import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { Label } from "./Label";
import { Input } from "./Input";

/**
 * Label Component
 * Form label with optional required indicator
 *
 * - **Features**: required flag, semantic HTML, accessibility
 * - **Use**: form labels, field labels
 */
const meta = {
  title: "Components/Label",
  component: Label,
  args: {
    children: "Label Text",
  },
  argTypes: {
    required: {
      control: "boolean",
      description: "Show required indicator (*)",
    },
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Basic label
 */
export const Basic: Story = {};

/**
 * Required label with indicator
 */
export const Required: Story = {
  args: {
    required: true,
  },
};

/**
 * Label with input
 */
export const WithInput: Story = {
  args: {
    children: "Email Address",
    required: true,
  },
  render: (args) => (
    <View>
      <Label {...args} />
      <Input placeholder="user@example.com" />
    </View>
  ),
};

/**
 * Form with multiple labeled inputs
 */
export const FormExample: Story = {
  render: (args) => (
    <>
      <View style={{ marginBottom: 16 }}>
        <Label {...args} required={true}>
          Full Name
        </Label>
        <Input placeholder="John Doe" />
      </View>
      <View style={{ marginBottom: 16 }}>
        <Label {...args} required={true}>
          Email
        </Label>
        <Input placeholder="john@example.com" />
      </View>
      <View style={{ marginBottom: 16 }}>
        <Label {...args}>
          Bio
        </Label>
        <Input placeholder="Tell us about yourself" />
      </View>
    </>
  ),
};
