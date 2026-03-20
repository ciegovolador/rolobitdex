import type { Meta, StoryObj } from "@storybook/react-native";
import { Button } from "./Button";

const meta = {
  component: Button,
  args: {
    title: "Press me",
    onPress: () => console.log("Pressed"),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Danger: Story = {
  args: { variant: "danger" },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
