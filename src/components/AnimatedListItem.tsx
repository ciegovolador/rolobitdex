import { ReactNode } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { animation } from "../constants/theme";

type AnimatedListItemProps = {
  children: ReactNode;
  index: number;
};

export function AnimatedListItem({ children, index }: AnimatedListItemProps) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 50).duration(animation.normal)}>
      {children}
    </Animated.View>
  );
}
