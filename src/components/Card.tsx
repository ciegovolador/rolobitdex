import { View, StyleSheet, ViewStyle } from "react-native";
import { colors, spacing, borderRadius, elevation } from "../constants/theme";

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  level?: 0 | 1 | 2 | 3;
};

export function Card({ children, style, level = 1 }: CardProps) {
  return (
    <View style={[styles.card, { boxShadow: elevation[level] } as any, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
