import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View, Text } from "react-native";
import { Modal } from "./Modal";
import { Button } from "./Button";

/**
 * Modal Component
 * Overlay container for dialogs and confirmations
 *
 * - **Features**: backdrop overlay, theme-aware styling, animations
 * - **Use**: dialogs, confirmations, modals, popups
 */
const meta = {
  title: "Components/Modal",
  component: Modal,
  args: {
    visible: true,
    onClose: () => alert("Modal closed!"),
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Basic modal with content
 */
export const Basic: Story = {
  args: {
    children: (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>Modal Title</Text>
        <Text style={{ marginBottom: 20 }}>This is modal content.</Text>
        <Button title="Close" onPress={() => alert("Closed!")} />
      </View>
    ),
  },
};

/**
 * Modal with form
 */
export const WithForm: Story = {
  args: {
    children: (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>Create Contact</Text>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ marginBottom: 4 }}>Name</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#333",
              padding: 8,
              borderRadius: 4,
            }}
          >
            <Text>John Doe</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Button title="Cancel" variant="secondary" onPress={() => {}} style={{ flex: 1 }} />
          <Button title="Create" variant="primary" onPress={() => {}} style={{ flex: 1 }} />
        </View>
      </View>
    ),
  },
};

/**
 * Modal with interactive state
 */
export const Interactive: Story = {
  args: {
    visible: false,
    onClose: () => {},
    children: <View></View>,
  },
  render: (args) => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button title="Open Modal" onPress={() => setVisible(true)} />
        <Modal
          {...args}
          visible={visible}
          onClose={() => setVisible(false)}
        >
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>Confirmation</Text>
            <Text style={{ marginBottom: 20 }}>Are you sure you want to proceed?</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Button
                title="Cancel"
                variant="secondary"
                onPress={() => setVisible(false)}
                style={{ flex: 1 }}
              />
              <Button
                title="Confirm"
                variant="primary"
                onPress={() => {
                  setVisible(false);
                  alert("Confirmed!");
                }}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </Modal>
      </>
    );
  },
};
