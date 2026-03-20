import { View, ViewStyle } from "react-native";
import { useTheme } from "../design";

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  level?: 0 | 1 | 2 | 3;
  accessibilityRole?: "summary" | "alert" | "none" | undefined;
  testID?: string;
};

export function Card({ children, style, level = 1, accessibilityRole, testID }: CardProps) {
  const { tokens } = useTheme();
  const { colors, spacing, borderRadius, elevation } = tokens;

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: borderRadius.lg,
          padding: spacing.md,
          borderWidth: 1,
          borderColor: colors.border,
          boxShadow: elevation[level],
        } as any,
        style,
      ]}
      accessibilityRole={accessibilityRole}
      testID={testID}
    >
      {children}
    </View>
  );
}
