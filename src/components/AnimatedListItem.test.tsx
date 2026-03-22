import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import { AnimatedListItem } from "./AnimatedListItem";

jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: {
      View,
      createAnimatedComponent: (c: any) => c,
    },
    FadeInDown: {
      delay: () => ({ duration: () => ({}) }),
    },
    useReducedMotion: () => false,
  };
});

describe("AnimatedListItem", () => {
  test("renders children", () => {
    const { getByText } = render(
      <AnimatedListItem index={0}>
        <Text>Item content</Text>
      </AnimatedListItem>
    );
    expect(getByText("Item content")).toBeTruthy();
  });

  test("renders children when reduced motion is preferred", () => {
    const reanimated = require("react-native-reanimated");
    reanimated.useReducedMotion = () => true;

    const { getByText } = render(
      <AnimatedListItem index={0}>
        <Text>Static content</Text>
      </AnimatedListItem>
    );
    expect(getByText("Static content")).toBeTruthy();

    reanimated.useReducedMotion = () => false;
  });
});
