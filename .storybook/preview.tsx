import React from "react";
import type { Preview } from "@storybook/react-native";
import { ThemeProvider } from "../src/design";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#0F0F1A",
        },
        {
          name: "light",
          value: "#FFFFFF",
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialTheme="dark">
        <Story />
      </ThemeProvider>
    ),
  ],
  globalTypes: {
    theme: {
      description: "Global theme for all stories",
      defaultValue: "dark",
      toolbar: {
        title: "Theme",
        icon: "contrast",
        items: ["dark", "light"],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
