import type { Meta, StoryObj } from "@storybook/react-native";
import { Sidebar } from "./Sidebar";

const meta = {
  component: Sidebar,
  args: {
    activeTab: "index",
    onTabPress: (name: string) => console.log("Tab pressed:", name),
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContactsActive: Story = {};

export const TradesActive: Story = {
  args: { activeTab: "trades" },
};

export const AddressActive: Story = {
  args: { activeTab: "address" },
};

export const SettingsActive: Story = {
  args: { activeTab: "settings" },
};
