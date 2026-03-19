import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../constants/theme";

export const styles = StyleSheet.create({
  emptyState: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyState__text: { color: colors.textSecondary, ...typography.lg, marginTop: spacing.md },
  emptyState__hint: { color: colors.textMuted, ...typography.sm, marginTop: spacing.xs },
});
