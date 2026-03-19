import { Text, StyleSheet, ActivityIndicator, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Pressable } from "react-native";
import { colors, spacing, fontSize, borderRadius, animation, elevation } from "../constants/theme";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
};

export function Button({ title, onPress, variant = "primary", loading, disabled, style, testID }: ButtonProps) {
  const scale = useSharedValue(1);
  const bgColor = variant === "primary" ? colors.primary : variant === "danger" ? colors.error : colors.surfaceLight;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePressIn() {
    scale.value = withTiming(0.96, { duration: animation.fast });
  }

  function handlePressOut() {
    scale.value = withTiming(1, { duration: animation.fast });
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: !!(disabled || loading) }}
      testID={testID}
    >
      <Animated.View
        style={[
          styles.button,
          { backgroundColor: bgColor, opacity: disabled ? 0.5 : 1, boxShadow: elevation[1] } as any,
          animatedStyle,
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: "600",
  },
});
