import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import { AnimatedScreen } from "./AnimatedScreen";

jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: {
      View,
      createAnimatedComponent: (c: any) => c,
    },
    FadeIn: {
      duration: () => ({}),
    },
    useReducedMotion: () => false,
  };
});

describe("AnimatedScreen", () => {
  test("renders children", () => {
    const { getByText } = render(
      <AnimatedScreen>
        <Text>Screen content</Text>
      </AnimatedScreen>
    );
    expect(getByText("Screen content")).toBeTruthy();
  });

  test("renders children when reduced motion is preferred", () => {
    const reanimated = require("react-native-reanimated");
    reanimated.useReducedMotion = () => true;

    const { getByText } = render(
      <AnimatedScreen>
        <Text>Static screen</Text>
      </AnimatedScreen>
    );
    expect(getByText("Static screen")).toBeTruthy();

    reanimated.useReducedMotion = () => false;
  });
});
