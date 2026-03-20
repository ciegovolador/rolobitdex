import { View, Text, ViewStyle } from "react-native";
import { useTheme } from "../design";

type BadgeVariant = "default" | "success" | "warning" | "error";

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
  testID?: string;
};

/**
 * Badge component for status indicators
 * Displays small labeled indicators with different variants
 */
export function Badge({ label, variant = "default", style, testID }: BadgeProps) {
  const { tokens } = useTheme();
  const { colors, spacing, borderRadius, fontSize } = tokens;

  const variantColors = {
    default: colors.surfaceLight,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
  };

  const backgroundColor = variantColors[variant];

  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius: borderRadius.sm,
          paddingHorizontal: spacing.sm,
          paddingVertical: spacing.xs,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
      testID={testID}
    >
      <Text
        style={{
          fontSize: fontSize.xs,
          fontWeight: "600",
          color: variant === "default" ? colors.text : colors.onSurface,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
