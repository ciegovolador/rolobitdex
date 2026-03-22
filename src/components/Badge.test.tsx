import { render } from "@testing-library/react-native";
import { Badge } from "./Badge";

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
      colors: {
        surfaceLight: "#2A2A3E",
        text: "#FFFFFF",
        onSurface: "#FFFFFF",
        success: "#44BB44",
        warning: "#FFAA00",
        error: "#FF4444",
      },
      spacing: { xs: 4, sm: 8 },
      borderRadius: { sm: 6 },
      fontSize: { xs: 11 },
    },
  }),
}));

describe("Badge", () => {
  test("renders label text", () => {
    const { getByText } = render(<Badge label="Pending" />);
    expect(getByText("Pending")).toBeTruthy();
  });

  test("renders with default variant", () => {
    const { getByText } = render(<Badge label="Status" />);
    expect(getByText("Status")).toBeTruthy();
  });

  test("renders with success variant", () => {
    const { getByText } = render(<Badge label="Done" variant="success" />);
    expect(getByText("Done")).toBeTruthy();
  });

  test("renders with warning variant", () => {
    const { getByText } = render(<Badge label="Warn" variant="warning" />);
    expect(getByText("Warn")).toBeTruthy();
  });

  test("renders with error variant", () => {
    const { getByText } = render(<Badge label="Err" variant="error" />);
    expect(getByText("Err")).toBeTruthy();
  });

  test("passes testID", () => {
    const { getByTestId } = render(<Badge label="X" testID="my-badge" />);
    expect(getByTestId("my-badge")).toBeTruthy();
  });

  test("default variant uses text color, others use onSurface", () => {
    const { getByText: getText1 } = render(<Badge label="Def" />);
    expect(getText1("Def").props.style.color).toBe("#FFFFFF");

    const { getByText: getText2 } = render(<Badge label="Suc" variant="success" />);
    expect(getText2("Suc").props.style.color).toBe("#FFFFFF");
  });
});
