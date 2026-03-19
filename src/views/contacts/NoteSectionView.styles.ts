import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../constants/theme";

export const styles = StyleSheet.create({
  noteSection__card: { marginBottom: spacing.sm },
  noteSection__row: { flexDirection: "row", alignItems: "center" },
  noteSection__text: { color: colors.textSecondary, ...typography.sm },
  noteSection__empty: {
    color: colors.textMuted,
    ...typography.xs,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
});
