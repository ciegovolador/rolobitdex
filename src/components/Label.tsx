import { Text, TextProps } from "react-native";
import { useTheme } from "../design";

type LabelProps = TextProps & {
  required?: boolean;
  htmlFor?: string;
};

/**
 * Label component for form inputs
 * Provides proper semantic labeling and accessibility
 */
export function Label({ children, required, htmlFor, style, ...props }: LabelProps) {
  const { tokens } = useTheme();
  const { colors, fontSize, spacing } = tokens;

  return (
    <Text
      style={[
        {
          color: colors.textSecondary,
          fontSize: fontSize.sm,
          fontWeight: "500",
          marginBottom: spacing.xs,
        },
        style,
      ]}
      accessibilityRole="header"
      nativeID={htmlFor}
      {...props}
    >
      {children}
      {required && <Text style={{ color: colors.error }}>*</Text>}
    </Text>
  );
}
