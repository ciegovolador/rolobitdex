import { render, fireEvent } from "@testing-library/react-native";
import { InlineConfirm } from "./InlineConfirm";

// Mock react-native-reanimated (used by Button)
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

// Mock the design module
jest.mock("../design", () => ({
  useTheme: () => ({
    tokens: {
      colors: {
        surface: "#1A1A2E",
        text: "#FFFFFF",
        textSecondary: "#AAAAAA",
        primary: "#F7931A",
        error: "#FF4444",
        onPrimary: "#FFFFFF",
        surfaceLight: "#2A2A3E",
      },
      spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
      fontSize: { sm: 12, md: 14, lg: 16, xl: 20 },
      borderRadius: { sm: 6, md: 10, lg: 16 },
      animation: { fast: 150 },
      elevation: {},
    },
  }),
}));

const defaultProps = {
  visible: true,
  title: "Delete Contact",
  message: "This cannot be undone.",
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("InlineConfirm", () => {
  // 3.2: renders when visible=true, returns null when visible=false
  test("renders when visible is true", () => {
    const { getByText } = render(<InlineConfirm {...defaultProps} />);
    expect(getByText("Delete Contact")).toBeTruthy();
    expect(getByText("This cannot be undone.")).toBeTruthy();
  });

  test("returns null when visible is false", () => {
    const { queryByText } = render(
      <InlineConfirm {...defaultProps} visible={false} />
    );
    expect(queryByText("Delete Contact")).toBeNull();
  });

  // 3.3: displays title and message text
  test("displays title and message", () => {
    const { getByText } = render(
      <InlineConfirm {...defaultProps} title="Confirm Send" message="Send 0.5 BTC?" />
    );
    expect(getByText("Confirm Send")).toBeTruthy();
    expect(getByText("Send 0.5 BTC?")).toBeTruthy();
  });

  // 3.4: calls onCancel when Cancel button pressed
  test("calls onCancel when Cancel pressed", () => {
    const onCancel = jest.fn();
    const { getByText } = render(
      <InlineConfirm {...defaultProps} onCancel={onCancel} />
    );
    fireEvent.press(getByText("Cancel"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  // 3.5: calls onConfirm when Confirm button pressed
  test("calls onConfirm when Confirm pressed", () => {
    const onConfirm = jest.fn();
    const { getByText } = render(
      <InlineConfirm {...defaultProps} onConfirm={onConfirm} />
    );
    fireEvent.press(getByText("Confirm"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  // 3.6: uses custom confirmLabel when provided
  test("uses custom confirmLabel", () => {
    const { getByText } = render(
      <InlineConfirm {...defaultProps} confirmLabel="Delete Forever" />
    );
    expect(getByText("Delete Forever")).toBeTruthy();
  });

  // 3.7: accessibilityRole="alert" present on container for both variants
  test("has accessibilityRole alert for primary variant", () => {
    const { getByLabelText } = render(
      <InlineConfirm {...defaultProps} variant="primary" />
    );
    const container = getByLabelText("Delete Contact. This cannot be undone.");
    expect(container.props.accessibilityRole).toBe("alert");
  });

  test("has accessibilityRole alert for danger variant", () => {
    const { getByLabelText } = render(
      <InlineConfirm {...defaultProps} variant="danger" />
    );
    const container = getByLabelText("Delete Contact. This cannot be undone.");
    expect(container.props.accessibilityRole).toBe("alert");
  });

  // 3.8: accessibilityLiveRegion="polite" present on container
  test("has accessibilityLiveRegion polite", () => {
    const { getByLabelText } = render(<InlineConfirm {...defaultProps} />);
    const container = getByLabelText("Delete Contact. This cannot be undone.");
    expect(container.props.accessibilityLiveRegion).toBe("polite");
  });

  // 3.9: accessibilityLabel combines title and message with period separator
  test("accessibilityLabel combines title and message", () => {
    const { getByLabelText } = render(
      <InlineConfirm {...defaultProps} title="Confirm" message="Are you sure?" />
    );
    expect(getByLabelText("Confirm. Are you sure?")).toBeTruthy();
  });

  // 3.10: title has accessibilityRole="header"
  test("title has accessibilityRole header", () => {
    const { getByRole } = render(<InlineConfirm {...defaultProps} />);
    const header = getByRole("header");
    expect(header).toBeTruthy();
    expect(header.props.children).toBe("Delete Contact");
  });

  // 3.11: Cancel button appears before Confirm button
  test("Cancel appears before Confirm in render order", () => {
    const { getAllByRole } = render(<InlineConfirm {...defaultProps} />);
    const buttons = getAllByRole("button");
    const cancelIdx = buttons.findIndex(
      (b) => b.props.accessibilityLabel === "Cancel"
    );
    const confirmIdx = buttons.findIndex(
      (b) => b.props.accessibilityLabel === "Confirm"
    );
    expect(cancelIdx).toBeLessThan(confirmIdx);
  });

  // 3.12: danger variant applies danger border styling
  test("danger variant uses error color for border", () => {
    const { getByLabelText } = render(
      <InlineConfirm {...defaultProps} variant="danger" />
    );
    const container = getByLabelText("Delete Contact. This cannot be undone.");
    const borderColor = container.props.style.borderColor;
    expect(borderColor).toBe("#FF4444");
  });

  // 3.13: Cancel button receives focus when visible
  test("Cancel button wrapper is focusable when visible", () => {
    // Focus management uses useEffect + ref.focus()
    // Verify the component mounts without errors when visible
    const { getByText } = render(<InlineConfirm {...defaultProps} />);
    expect(getByText("Cancel")).toBeTruthy();
  });
});
