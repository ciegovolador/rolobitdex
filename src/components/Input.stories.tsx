import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Input } from "./Input";

/**
 * Input Component
 * Text input field with label, error state, and focus animation
 *
 * - **Features**: label, error messages, animated focus border
 * - **Accessibility**: properly labeled for screen readers
 */
const meta = {
  title: "Components/Input",
  component: Input,
  args: {
    placeholder: "Enter text...",
  },
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    label: {
      control: "text",
      description: "Label text",
    },
    error: {
      control: "text",
      description: "Error message (shows when set)",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Basic input without label
 */
export const Basic: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

/**
 * Input with label
 */
export const WithLabel: Story = {
  args: {
    label: "Email",
    placeholder: "user@example.com",
  },
};

/**
 * Input with error
 */
export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "user@example.com",
    error: "Invalid email format",
    defaultValue: "invalid",
  },
};

/**
 * Input with default value
 */
export const WithDefaultValueExample: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    defaultValue: "john_doe",
  },
};

/**
 * Input with default value
 */
export const WithDefaultValue: Story = {
  args: {
    label: "Bitcoin Address",
    defaultValue: "1A1z7agoat...",
    placeholder: "Paste address",
  },
};

/**
 * Form with multiple inputs
 */
export const Form: Story = {
  render: (args) => (
    <>
      <Input {...args} label="First Name" placeholder="John" />
      <Input {...args} label="Last Name" placeholder="Doe" />
      <Input {...args} label="Email" placeholder="john@example.com" keyboardType="email-address" />
      <Input {...args} label="Password" placeholder="••••••" secureTextEntry />
    </>
  ),
};

/**
 * Input with character count (requires state)
 */
export const WithCharacterCount: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <>
        <Input
          {...args}
          label="Bio (max 100 chars)"
          placeholder="Tell us about yourself"
          value={value}
          onChangeText={setValue}
          maxLength={100}
        />
        <span style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>
          {value.length}/100 characters
        </span>
      </>
    );
  },
};
