import { render, fireEvent } from "@testing-library/react-native";
import { Text, Pressable } from "react-native";
import { ThemeProvider, useTheme } from "./ThemeProvider";

jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: { View, createAnimatedComponent: (c: any) => c },
    useSharedValue: (v: any) => ({ value: v }),
    useAnimatedStyle: (fn: any) => fn(),
    withTiming: (v: any) => v,
  };
});

function TestConsumer() {
  const { theme, tokens, toggleTheme, setTheme } = useTheme();
  return (
    <>
      <Text testID="theme">{theme}</Text>
      <Text testID="primary">{tokens.colors.primary}</Text>
      <Pressable testID="toggle" onPress={toggleTheme} />
      <Pressable testID="set-light" onPress={() => setTheme("light")} />
    </>
  );
}

describe("ThemeProvider", () => {
  test("provides dark theme by default", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    expect(getByTestId("theme").props.children).toBe("dark");
  });

  test("provides initial theme when specified", () => {
    const { getByTestId } = render(
      <ThemeProvider initialTheme="light">
        <TestConsumer />
      </ThemeProvider>
    );
    expect(getByTestId("theme").props.children).toBe("light");
  });

  test("provides bitcoin orange as primary color", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    expect(getByTestId("primary").props.children).toBe("#F7931A");
  });

  test("toggleTheme switches between dark and light", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    expect(getByTestId("theme").props.children).toBe("dark");
    fireEvent.press(getByTestId("toggle"));
    expect(getByTestId("theme").props.children).toBe("light");
    fireEvent.press(getByTestId("toggle"));
    expect(getByTestId("theme").props.children).toBe("dark");
  });

  test("setTheme sets specific theme", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    fireEvent.press(getByTestId("set-light"));
    expect(getByTestId("theme").props.children).toBe("light");
  });

  test("useTheme throws when used outside provider", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    expect(() => render(<TestConsumer />)).toThrow(
      "useTheme must be used within ThemeProvider"
    );
    consoleSpy.mockRestore();
  });
});
