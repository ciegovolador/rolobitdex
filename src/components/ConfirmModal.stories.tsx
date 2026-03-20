import { useState } from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react-native";
import { ConfirmModal } from "./ConfirmModal";
import { Button } from "./Button";

const meta = {
  component: ConfirmModal,
  args: {
    title: "Confirm Action",
    message: "Are you sure you want to proceed?",
  },
  render: (args) => {
    const [visible, setVisible] = useState(false);
    return (
      <View>
        <Button title="Open Modal" onPress={() => setVisible(true)} />
        <ConfirmModal
          {...args}
          visible={visible}
          onConfirm={() => {
            args.onConfirm?.();
            setVisible(false);
          }}
          onCancel={() => {
            args.onCancel?.();
            setVisible(false);
          }}
        />
      </View>
    );
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DangerVariant: Story = {
  args: {
    variant: "danger",
    title: "Delete Contact",
    message: "This action cannot be undone.",
    confirmLabel: "Delete",
  },
};
