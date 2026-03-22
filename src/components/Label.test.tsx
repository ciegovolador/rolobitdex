import { render } from "@testing-library/react-native";
import { Label } from "./Label";

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
      colors: { textSecondary: "#AAAAAA", error: "#FF4444" },
      fontSize: { sm: 12 },
      spacing: { xs: 4 },
    },
  }),
}));

describe("Label", () => {
  test("renders text content", () => {
    const { getByText } = render(<Label>Username</Label>);
    expect(getByText("Username")).toBeTruthy();
  });

  test("has header accessibilityRole", () => {
    const { getByRole } = render(<Label>Field</Label>);
    expect(getByRole("header")).toBeTruthy();
  });

  test("shows asterisk when required", () => {
    const { getByText } = render(<Label required>Email</Label>);
    expect(getByText("*")).toBeTruthy();
  });

  test("does not show asterisk when not required", () => {
    const { queryByText } = render(<Label>Email</Label>);
    expect(queryByText("*")).toBeNull();
  });

  test("sets nativeID from htmlFor prop", () => {
    const { getByRole } = render(<Label htmlFor="email-input">Email</Label>);
    expect(getByRole("header").props.nativeID).toBe("email-input");
  });
});
