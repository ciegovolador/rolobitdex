import { ReactNode } from "react";
import Animated, { FadeInDown, useReducedMotion } from "react-native-reanimated";
import { View } from "react-native";
import { animation } from "../constants/theme";

type AnimatedListItemProps = {
  children: ReactNode;
  index: number;
};

export function AnimatedListItem({ children, index }: AnimatedListItemProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <View>{children}</View>;
  }

  return (
    <Animated.View entering={FadeInDown.delay(index * 50).duration(animation.normal)}>
      {children}
    </Animated.View>
  );
}
