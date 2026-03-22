import { render, fireEvent } from "@testing-library/react-native";
import { Sidebar } from "./Sidebar";

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

jest.mock("@expo/vector-icons", () => {
  const { Text } = require("react-native");
  return {
    Ionicons: function MockIonicons(props: any) {
      return <Text>{props.name}</Text>;
    },
  };
});

describe("Sidebar", () => {
  const onTabPress = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("renders app logo", () => {
    const { getByText } = render(
      <Sidebar activeTab="index" onTabPress={onTabPress} />
    );
    expect(getByText("Rolobitdex")).toBeTruthy();
  });

  test("renders all four tabs", () => {
    const { getByText } = render(
      <Sidebar activeTab="index" onTabPress={onTabPress} />
    );
    expect(getByText("Contacts")).toBeTruthy();
    expect(getByText("Trades")).toBeTruthy();
    expect(getByText("My Address")).toBeTruthy();
    expect(getByText("Settings")).toBeTruthy();
  });

  test("marks active tab as selected", () => {
    const { getByLabelText } = render(
      <Sidebar activeTab="trades" onTabPress={onTabPress} />
    );
    expect(getByLabelText("Trades").props.accessibilityState).toEqual({
      selected: true,
    });
    expect(getByLabelText("Contacts").props.accessibilityState).toEqual({
      selected: false,
    });
  });

  test("calls onTabPress with tab name", () => {
    const { getByLabelText } = render(
      <Sidebar activeTab="index" onTabPress={onTabPress} />
    );
    fireEvent.press(getByLabelText("Settings"));
    expect(onTabPress).toHaveBeenCalledWith("settings");
  });

  test("tabs have accessibilityRole tab", () => {
    const { getByLabelText } = render(
      <Sidebar activeTab="index" onTabPress={onTabPress} />
    );
    expect(getByLabelText("Contacts").props.accessibilityRole).toBe("tab");
  });

  test("provides testIDs for each tab", () => {
    const { getByTestId } = render(
      <Sidebar activeTab="index" onTabPress={onTabPress} />
    );
    expect(getByTestId("sidebar-index-tab")).toBeTruthy();
    expect(getByTestId("sidebar-trades-tab")).toBeTruthy();
    expect(getByTestId("sidebar-address-tab")).toBeTruthy();
    expect(getByTestId("sidebar-settings-tab")).toBeTruthy();
  });
});
