import { Text, StyleSheet, ActivityIndicator, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Pressable } from "react-native";
import { useTheme } from "../design";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
};

export function Button({ title, onPress, variant = "primary", size = "md", loading, disabled, style, testID }: ButtonProps) {
  const { tokens } = useTheme();
  const { colors, spacing, borderRadius, animation, elevation } = tokens;
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

  const sizeConfig = {
    sm: {
      paddingVertical: spacing.xs + 2,
      paddingHorizontal: spacing.sm,
      fontSize: tokens.fontSize.sm,
    },
    md: {
      paddingVertical: spacing.sm + 4,
      paddingHorizontal: spacing.lg,
      fontSize: tokens.fontSize.lg,
    },
    lg: {
      paddingVertical: spacing.md,
      paddingHorizontal: tokens.spacing.xl,
      fontSize: tokens.fontSize.xl,
    },
  };

  const textColor = variant === "primary" ? colors.onPrimary : colors.text;

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
          {
            ...sizeConfig[size],
            borderRadius: borderRadius.md,
            backgroundColor: bgColor,
            opacity: disabled ? 0.5 : 1,
            alignItems: "center",
            justifyContent: "center",
          },
          animatedStyle,
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={textColor} />
        ) : (
          <Text style={{ color: textColor, fontSize: sizeConfig[size].fontSize, fontWeight: "600" }}>
            {title}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
}
