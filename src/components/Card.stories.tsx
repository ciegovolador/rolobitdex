import type { Meta, StoryObj } from "@storybook/react-native";
import { Text, View } from "react-native";
import { Card } from "./Card";

/**
 * Card Component
 * Container for grouping related content
 *
 * - **Features**: multiple elevation levels, padding, rounded corners
 * - **Use**: section containers, card layouts, content grouping
 */
const meta = {
  title: "Components/Card",
  component: Card,
  args: {
    children: <Text>Card content goes here</Text>,
  },
  argTypes: {
    level: {
      control: "select",
      options: [0, 1, 2, 3],
      description: "Shadow elevation level",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Basic card with no shadow
 */
export const NoShadow: Story = {
  args: {
    level: 0,
  },
};

/**
 * Card with subtle shadow (level 1)
 */
export const Level1: Story = {
  args: {
    level: 1,
  },
};

/**
 * Card with medium shadow (level 2)
 */
export const Level2: Story = {
  args: {
    level: 2,
  },
};

/**
 * Card with prominent shadow (level 3)
 */
export const Level3: Story = {
  args: {
    level: 3,
  },
};

/**
 * Card with text content
 */
export const WithText: Story = {
  args: {
    children: (
      <>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>Card Title</Text>
        <Text>This is card content. Cards are used to group related information.</Text>
      </>
    ),
  },
};

/**
 * Card with multiple sections
 */
export const MultiSection: Story = {
  args: {
    children: (
      <>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: "600" }}>Bitcoin Address</Text>
          <Text style={{ fontSize: 12, marginTop: 4, color: "#aaa" }}>1A1z7agoat...</Text>
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: "600" }}>Balance</Text>
          <Text style={{ fontSize: 12, marginTop: 4, color: "#aaa" }}>0.5 BTC</Text>
        </View>
      </>
    ),
  },
};

/**
 * All elevation levels together
 */
export const AllLevels: Story = {
  render: (args) => (
    <>
      <Card {...args} level={0}>
        <Text>Level 0 (No shadow)</Text>
      </Card>
      <Card {...args} level={1} style={{ marginTop: 12 }}>
        <Text>Level 1 (Subtle)</Text>
      </Card>
      <Card {...args} level={2} style={{ marginTop: 12 }}>
        <Text>Level 2 (Medium)</Text>
      </Card>
      <Card {...args} level={3} style={{ marginTop: 12 }}>
        <Text>Level 3 (Prominent)</Text>
      </Card>
    </>
  ),
};

/**
 * Card as list item
 */
export const ListItem: Story = {
  args: {
    children: (
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View>
          <Text style={{ fontWeight: "600" }}>Alice</Text>
          <Text style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>bitcoin:1a1z7...</Text>
        </View>
        <Text style={{ fontSize: 12 }}>Completed</Text>
      </View>
    ),
  },
};
