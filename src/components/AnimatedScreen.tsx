import { ReactNode } from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { colors, animation } from "../constants/theme";

type AnimatedScreenProps = {
  children: ReactNode;
};

export function AnimatedScreen({ children }: AnimatedScreenProps) {
  return (
    <Animated.View entering={FadeIn.duration(animation.normal)} style={styles.container}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
});
