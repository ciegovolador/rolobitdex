import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { Icon } from "./Icon";

/**
 * Icon Component
 * Wrapper for consistent icon usage with Ionicons
 *
 * - **Features**: theme-aware colors, customizable size
 * - **Icons**: Uses Ionicons icon library
 * - **Use**: buttons, navigation, decorations
 */
const meta = {
  title: "Components/Icon",
  component: Icon,
  args: {
    name: "home",
    size: 24,
  },
  argTypes: {
    name: {
      control: "text",
      description: "Ionicon name",
    },
    size: {
      control: "number",
      description: "Icon size in pixels",
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Basic icon
 */
export const Basic: Story = {};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: (args) => (
    <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
      <Icon {...args} name="home" size={16} />
      <Icon {...args} name="home" size={24} />
      <Icon {...args} name="home" size={32} />
      <Icon {...args} name="home" size={48} />
    </View>
  ),
};

/**
 * Common icons
 */
export const CommonIcons: Story = {
  render: (args) => (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <Icon {...args} name="home" />
        <Icon {...args} name="search" />
        <Icon {...args} name="add" />
        <Icon {...args} name="settings" />
      </View>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <Icon {...args} name="checkmark-circle" />
        <Icon {...args} name="close-circle" />
        <Icon {...args} name="alert-circle" />
        <Icon {...args} name="information-circle" />
      </View>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <Icon {...args} name="arrow-back" />
        <Icon {...args} name="arrow-forward" />
        <Icon {...args} name="chevron-down" />
        <Icon {...args} name="menu" />
      </View>
    </View>
  ),
};

/**
 * Icons for Bitcoin/Finance
 */
export const FinanceIcons: Story = {
  render: (args) => (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <Icon {...args} name="wallet" />
        <Icon {...args} name="swap-horizontal" />
        <Icon {...args} name="send" />
        <Icon {...args} name="log-out" />
      </View>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <Icon {...args} name="camera" />
        <Icon {...args} name="copy" />
        <Icon {...args} name="share-social" />
        <Icon {...args} name="open" />
      </View>
    </View>
  ),
};
