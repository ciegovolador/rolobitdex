import type { Meta, StoryObj } from "@storybook/react-native";
import { Text } from "react-native";
import { Card } from "./Card";
import { colors } from "../constants/theme";

const meta = {
  component: Card,
  args: {
    children: <Text style={{ color: colors.text }}>Card content</Text>,
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Elevated: Story = {
  args: { level: 2 },
};

export const Flat: Story = {
  args: { level: 0 },
};
