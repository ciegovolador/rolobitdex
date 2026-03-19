import { ReactNode } from "react";
import Animated, { FadeIn, useReducedMotion } from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import { colors, animation } from "../constants/theme";

type AnimatedScreenProps = {
  children: ReactNode;
};

export function AnimatedScreen({ children }: AnimatedScreenProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <View style={styles.container}>{children}</View>;
  }

  return (
    <Animated.View entering={FadeIn.duration(animation.normal)} style={styles.container}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
});
