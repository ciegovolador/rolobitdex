import { render, fireEvent } from "@testing-library/react-native";
import { Input } from "./Input";

jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: { View, createAnimatedComponent: (c: any) => c },
    useSharedValue: (v: any) => ({ value: v }),
    useAnimatedStyle: (fn: any) => fn(),
    withTiming: (v: any) => v,
    interpolateColor: () => "#000",
  };
});

jest.mock("../design", () => ({
  useTheme: () => ({
    tokens: {
      colors: {
        surface: "#1A1A2E",
        text: "#FFFFFF",
        textSecondary: "#AAAAAA",
        textMuted: "#666666",
        border: "#2A2A3E",
        primary: "#F7931A",
        error: "#FF4444",
      },
      spacing: { xs: 4, sm: 8, md: 16 },
      fontSize: { sm: 12, md: 14 },
      borderRadius: { md: 10 },
      animation: { fast: 150 },
    },
  }),
}));

describe("Input", () => {
  test("renders with placeholder", () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter name" />
    );
    expect(getByPlaceholderText("Enter name")).toBeTruthy();
  });

  test("renders label when provided", () => {
    const { getByText } = render(<Input label="Name" />);
    expect(getByText("Name")).toBeTruthy();
  });

  test("renders error message", () => {
    const { getByText } = render(<Input error="Required" />);
    expect(getByText("Required")).toBeTruthy();
  });

  test("sets accessibilityLabel from label prop", () => {
    const { getByLabelText } = render(<Input label="Email" />);
    expect(getByLabelText("Email")).toBeTruthy();
  });

  test("sets accessibilityLabel from placeholder when no label", () => {
    const { getByLabelText } = render(<Input placeholder="Search" />);
    expect(getByLabelText("Search")).toBeTruthy();
  });

  test("calls onFocus and onBlur", () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const { getByLabelText } = render(
      <Input label="Field" onFocus={onFocus} onBlur={onBlur} />
    );
    fireEvent(getByLabelText("Field"), "focus");
    expect(onFocus).toHaveBeenCalledTimes(1);
    fireEvent(getByLabelText("Field"), "blur");
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test("passes testID", () => {
    const { getByTestId } = render(<Input testID="my-input" />);
    expect(getByTestId("my-input")).toBeTruthy();
  });

  test("forwards text change", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Input testID="inp" onChangeText={onChange} />
    );
    fireEvent.changeText(getByTestId("inp"), "hello");
    expect(onChange).toHaveBeenCalledWith("hello");
  });
});
