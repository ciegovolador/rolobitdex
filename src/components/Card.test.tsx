import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import { Card } from "./Card";

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

jest.mock("../design", () => ({
  useTheme: () => ({
    tokens: {
      colors: { surface: "#1A1A2E", border: "#2A2A3E" },
      spacing: { md: 16 },
      borderRadius: { lg: 16 },
      elevation: { 0: "none", 1: "0px 1px 3px rgba(0,0,0,0.3)", 2: "0px 2px 6px rgba(0,0,0,0.4)", 3: "0px 4px 12px rgba(0,0,0,0.5)" },
    },
  }),
}));

describe("Card", () => {
  test("renders children", () => {
    const { getByText } = render(
      <Card><Text>Card content</Text></Card>
    );
    expect(getByText("Card content")).toBeTruthy();
  });

  test("passes testID", () => {
    const { getByTestId } = render(
      <Card testID="my-card"><Text>X</Text></Card>
    );
    expect(getByTestId("my-card")).toBeTruthy();
  });

  test("applies accessibilityRole", () => {
    const { getByTestId } = render(
      <Card testID="card" accessibilityRole="summary"><Text>X</Text></Card>
    );
    expect(getByTestId("card").props.accessibilityRole).toBe("summary");
  });

  test("defaults to level 1 elevation", () => {
    const { getByTestId } = render(
      <Card testID="card"><Text>X</Text></Card>
    );
    const style = getByTestId("card").props.style;
    const flatStyle = Array.isArray(style) ? Object.assign({}, ...style) : style;
    expect(flatStyle.boxShadow).toBe("0px 1px 3px rgba(0,0,0,0.3)");
  });
});
