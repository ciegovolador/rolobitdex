import { render } from "@testing-library/react-native";
import { Icon } from "./Icon";

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
      colors: { text: "#FFFFFF" },
    },
  }),
}));

jest.mock("@expo/vector-icons/Ionicons", () => {
  const { Text } = require("react-native");
  return function MockIonicons(props: any) {
    return <Text testID="ionicon">{props.name}</Text>;
  };
});

describe("Icon", () => {
  test("renders with name", () => {
    const { getByText } = render(<Icon name="settings" />);
    expect(getByText("settings")).toBeTruthy();
  });

  test("passes testID to wrapper", () => {
    const { getByTestId } = render(<Icon name="home" testID="my-icon" />);
    expect(getByTestId("my-icon")).toBeTruthy();
  });
});
