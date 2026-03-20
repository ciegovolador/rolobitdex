import type { Meta, StoryObj } from "@storybook/react-native";
import { Input } from "./Input";

const meta = {
  component: Input,
  args: {
    placeholder: "Enter text...",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: "Email" },
};

export const WithError: Story = {
  args: { label: "Email", error: "Invalid email address" },
};
